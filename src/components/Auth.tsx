import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
// import SplashScreen from 'react-native-splash-screen';

const Auth = () => {
    const navigation = useNavigation()
    const init = useCallback(async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                }),
            );
            //   SplashScreen.hide()
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'AppStack' }],
                }),
            );
            //   SplashScreen.hide()
        }
    }, []);

    useEffect(() => {
        init();
    }, [init]);
    return (
        <View>
            {/* <ActivityIndicator /> */}
        </View>
    );
};

export default Auth;
