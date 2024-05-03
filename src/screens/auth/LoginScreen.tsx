import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Colors } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavType = {
    navigate: (value: string) => void
}

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavType>()
    const onLogIn = async () => {
        console.log(password, email)
        const emailValidation = new RegExp(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
        );
        const passwordValidation = new RegExp(
            '^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$',
        );
        if (emailValidation.test(email) &&
            passwordValidation.test(password)) {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async userCred => {
                    console.log(userCred);
                    await AsyncStorage.setItem('token', userCred.user.uid).then(token => {
                        // console.log("tokenInLogIn", token)
                    })
                    navigation.navigate('AppStack')
                    setEmail('')
                    setPassword('')
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
        <View style={styles.container}>
            <Text style={styles.loginTitle}>LOGIN</Text>
            <Input
                radius={10}
                placeholder='Enter your email'
                value={email}
                onChangeText={text => setEmail(text)}
                icon={require('../../assets/img/mail.png')} iconSize={25}
            />
            <Input
                radius={10}
                placeholder='Enter your password'
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                icon={require('../../assets/img/password.png')} iconSize={25}
            />
            <Button title='Log In' onPressButton={onLogIn} />
            <TouchableOpacity style={styles.accContainer} onPress={
                () => navigation.navigate('Register')
            }>
                <Text style={styles.acc}>Create Account? </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    loginTitle: {
        color: Colors.primaryPurple,
        fontSize: 40,
        fontWeight: '800',
        alignSelf: 'flex-start',
        marginBottom: 10
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

export default LoginScreen;