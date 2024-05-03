
import React, { Fragment } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView, StatusBar } from "react-native";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createNativeStackNavigator()
const AuthNavigation = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor='white'
                    barStyle='light-content' />
                <Stack.Navigator initialRouteName="Login" screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name='Login' component={LoginScreen} />
                    <Stack.Screen name='Register' component={RegisterScreen} />
                </Stack.Navigator>
            </SafeAreaView>
        </Fragment>
    )
}


export default AuthNavigation