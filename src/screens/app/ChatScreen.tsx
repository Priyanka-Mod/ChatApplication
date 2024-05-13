import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { Header } from "../../components/Header"
import { useNavigation, useRoute } from "@react-navigation/native"
import { signOut } from "firebase/auth"
import { auth, db } from "../../services/firebaseConfig"
import { addDoc, collection, doc, onSnapshot, orderBy, query } from "firebase/firestore"
import { Bubble, GiftedChat, InputToolbar, Send, User } from "react-native-gifted-chat"
import { Colors } from "../../utils"
import firestore from '@react-native-firebase/firestore';

type NavType = {
    navigate: (value: string) => void
}
type route = {
    route: {
        params: {
            currentUser?: userDataType
            chatWith?: userDataType
        }
    }
}
type userDataType = {
    _id: string,
    name: string,
    email: string,
    avatar: string
}
const ChatScreen = ({ route }: route) => {
    // const route = useRoute<route>()
    const [messages, setMessages] = useState<{
        _id: string | number; createdAt: Date | number; text: string; user: User;
    }[]>([]);
    const [user, setUser] = useState()
    const [isTyping, setIsTyping] = useState<string>()
    const navigation = useNavigation<NavType>()
    const currentUser = route.params.currentUser
    const chatWith = route.params.chatWith
    console.log("currentUser: ", currentUser, "Chat with : ", chatWith);

    const renderBubble = (props: object) => {
        // console.log("props --------- ", props);

        return (
            <Bubble
                {...props}
                // renderMessageText={}
                wrapperStyle={{
                    right: {
                        backgroundColor: Colors.primaryPurple,
                        marginVertical: 5
                    },
                    left: {
                        marginVertical: 5
                    }
                }}
            />
        )
    }

    const customtInputToolbar = (props: object) => {
        return (
            <InputToolbar
                {...props}
                // renderActions={(res) => {
                //     console.log("Input res-----", res.user);
                //     setUser(res.user._id)
                //     if (res.user._id !== currentUser._id) {
                //         setIsTyping(true)
                //     }
                //     else {
                //         setIsTyping(false)
                //     }
                // }}
                containerStyle={{
                    borderTopColor: "transparent",
                    borderRadius: 25,
                    paddingTop: Platform.OS === 'ios' ? 4 : 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                    marginHorizontal: 10,
                    marginBottom: Platform.OS === 'android' ? 8 : 3
                }}
                primaryStyle={{
                    flex: 1,
                    alignItems: 'center',
                }}
            // accessoryStyle={{
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     paddingHorizontal: 10
            // }}
            // renderAccessory={() => (
            //     <TouchableOpacity style={{
            //         marginLeft: 5,
            //         marginBottom: Platform.OS === 'ios' ? 5 : 0
            //     }} onPress={() => console.log('Attach')}>
            //         <Image style={{ width: Platform.OS === 'ios' ? 32 : 30, height: Platform.OS === 'ios' ? 32 : 30 }} source={require('../../assets/img/add.png')} />
            //     </TouchableOpacity>
            // )}
            />
        );
    };

    useLayoutEffect(() => {
        const collectionRef = collection(db, 'message');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            console.log('querySnapshot unsusbscribe', querySnapshot.docs);
            let arr = querySnapshot.docs.map(doc =>
                // console.log("Mapped msg-----", doc.data())
                doc.data()
            )
            console.log("msg------", arr)
            const filter = arr.filter(message =>
                (message.from === chatWith!._id && message.to === currentUser!._id) ||
                (message.from === currentUser!._id && message.to === chatWith!._id)
            ).map(messages => ({
                ...messages,
                createdAt: messages.createdAt.toDate() as Date | number
            }))
            console.log("filtered==============", filter)
            setMessages(filter)
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages: {
        _id: string | number; createdAt: Date | number; text: string; user: User;
    }[] = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, 'message'), {
            _id,
            createdAt,
            text,
            user,
            to: chatWith!._id,
            from: currentUser!._id
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, backgroundColor: 'white' }}>
                <TouchableOpacity style={{ alignItems: 'center', padding: 5, }} onPress={() => navigation.navigate('Home')}>
                    <Image style={{ height: 30, width: 30, }} source={require('../../assets/img/backArrow.png')} />
                </TouchableOpacity>
                <Image style={{ height: Platform.OS === 'ios' ? 42 : 38, width: Platform.OS === 'ios' ? 42 : 38, borderRadius: 100, borderColor: 'gray', borderWidth: 1 }} source={{ uri: chatWith!.avatar }} />
                <Text style={{ textAlign: 'center', marginLeft: 10, fontSize: 18, fontWeight: '800', color: 'black' }}>{chatWith!.name}</Text>

            </View>
            <GiftedChat
                // isTyping={isTyping}
                alwaysShowSend={isTyping !== '' ? true : false}
                messages={messages}
                // showUserAvatar={true}
                onSend={messages =>
                    onSend(messages)
                }
                messagesContainerStyle={{
                    backgroundColor: 'white'
                }}
                user={{
                    _id: currentUser!._id,
                    name: currentUser!.name
                }}
                renderBubble={renderBubble}
                renderInputToolbar={props => customtInputToolbar(props)}
                onInputTextChanged={(msg) => {
                    console.log("msg----------", msg);
                    const testReg = new RegExp("^\s*$")
                    if (testReg.test(msg)) {
                        console.log("changingg", msg)

                        setIsTyping(msg)
                    }
                    setIsTyping('')

                }}
                // renderMessageImage={props => console.log("imageProps: ", props)
                // }
                renderSend={props => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{
                                marginRight: 10,
                                marginBottom: Platform.OS === 'ios' ? 5 : 0
                            }} onPress={() => console.log('Attach')}>
                                <Image style={{ width: Platform.OS === 'ios' ? 32 : 30, height: Platform.OS === 'ios' ? 32 : 30 }} source={require('../../assets/img/add.png')} />
                            </TouchableOpacity>
                            <Send {...props} containerStyle={{ justifyContent: 'center', marginRight: 10 }}>
                                <Image style={{ marginBottom: Platform.OS === 'ios' ? 5 : 0, width: Platform.OS === 'ios' ? 32 : 30, height: Platform.OS === 'ios' ? 32 : 30, }} source={{
                                    uri: "https://cdn-icons-png.freepik.com/512/15184/15184939.png"
                                }} />
                            </Send>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}
export default ChatScreen