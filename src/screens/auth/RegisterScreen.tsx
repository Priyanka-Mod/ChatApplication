import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Colors } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavType = {
    navigate: (value: string) => void
}

const RegisterScreen = () => {
    const navigation = useNavigation<NavType>()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const onRegister = async () => {
        console.log(password, email, name)
        const emailValidation = new RegExp(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
        );
        const passwordValidation = new RegExp(
            '^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$',
        );
        if (emailValidation.test(email) &&
            passwordValidation.test(password) && name !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async userCred => {
                    console.log("userrrrrrrr", avatar, name);
                    const user = userCred.user;
                    console.log(userCred.user.uid)

                    updateProfile(user, {
                        displayName: name,
                        photoURL: avatar ? avatar : 'https://media.istockphoto.com/id/1389823037/vector/young-smiling-woman-mia-avatar-3d-vector-people-character-illustration-cartoon-minimal-style.jpg?s=612x612&w=0&k=20&c=ciwsDqBIy3mcTxhWN4I1S-kKSTvjoN1einMrQawNZDQ=',
                    })
                    console.log(user)

                    const Data = {
                        _id: userCred.user.uid, // unique id for the database record
                        name: name,
                        email: email,
                        avatar: avatar
                    };

                    setDoc(doc(db, 'usersData', userCred.user.uid), Data)
                    await AsyncStorage.setItem('token', userCred.user.uid).then(token => {
                        // console.log("tokenInLogIn", token)
                    })
                    navigation.navigate('AppStack')
                    setEmail('')
                    setName('')
                    setName('')

                })
                .catch(err => {
                    console.log(err.code);

                    if (err.code === 'auth/invalid-credential') {
                        console.log('User not registered!');
                    }
                });
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title='Register' onBackPress={() => navigation.navigate('Login')} iconLeft={require('../../assets/img/backArrow.png')} />
            <View style={styles.innerContainer}>
                <Text style={styles.greetTitle}>Hello User!!</Text>
                <Input
                    radius={10}
                    placeholder='Enter your name'
                    value={name}
                    onChangeText={text => setName(text)}
                    icon={require('../../assets/img/user.png')} iconSize={25}
                />
                <Input
                    radius={10}
                    placeholder='Enter your email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    icon={require('../../assets/img/mail.png')} iconSize={25}
                />
                <Input
                    radius={10}
                    placeholder='Enter your avatar URL'
                    value={avatar}
                    onChangeText={text => setAvatar(text)}

                />
                <Input
                    radius={10}
                    placeholder='Enter your password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    icon={require('../../assets/img/password.png')} iconSize={25}
                />
                <Button title='Register' onPressButton={onRegister} />
            </View>

        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    greetTitle: {
        color: Colors.primaryPurple,
        fontSize: 40,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginBottom: 20
    },
    accContainer: {
        marginVertical: 10,
        padding: 10,
        width: "100%",
        alignItems: 'center'
    },
    acc: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.primaryPurple
    }
});

export default RegisterScreen;