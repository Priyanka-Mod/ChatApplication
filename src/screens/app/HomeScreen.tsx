import { doc, getDoc, setDoc } from "firebase/firestore"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { auth, db } from "../../services/firebaseConfig"
import firestore, { firebase } from '@react-native-firebase/firestore';
import { Header } from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
type userDataType = {
    _id: string,
    name: string,
    email: string,
    avatar: string
}
type NavType = {
    navigate: (value: string, params?: object) => void

}
const HomeScreen = () => {
    const navigation = useNavigation<NavType>()
    const [user, setUser] = useState<userDataType[]>()
    const [currentUser, setCurrentUser] = useState<userDataType>()
    const init = useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const user = (await firestore().collection('usersData').get()).docs.map(res => res.data() as userDataType)
        const filteredUsers = user.filter(res => res._id !== token)
        const currentUserDetails = user.find(res => res._id === token)
        // console.log(currentUserDetails);
        setCurrentUser(currentUserDetails)
        setUser(filteredUsers)
    }, [])
    useEffect(() => {
        init()
    }, [init])
    const onLogout = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
        navigation.navigate('AuthStack')
    }
    const chatWith = (item: userDataType) => {
        navigation.navigate('Chat', { currentUser: currentUser, chatWith: item })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, paddingVertical: 20 }}>
                <Text style={{ color: "black", fontSize: 30, fontWeight: '800' }}>Message</Text>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('UserProfile', { currentUser: currentUser })}>
                    <Image style={{ height: 50, width: 50, borderRadius: 100, borderColor: 'gray', borderWidth: 1 }} source={{
                        uri: currentUser?.avatar
                    }} />
                </TouchableOpacity>
            </View>
            {user ?
                <FlatList
                    data={user}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => chatWith(item)}
                                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, }}
                            >
                                <Image style={{ height: 60, width: 60, borderRadius: 100, borderColor: '#b4b4b4', borderWidth: 1, marginRight: 20 }} source={{
                                    uri: item.avatar
                                }} />
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }} />
                : <ActivityIndicator />}
        </SafeAreaView>
    )
}
export default HomeScreen