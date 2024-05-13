import React, { Fragment } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView, StatusBar } from "react-native";
import HomeScreen from "../screens/app/HomeScreen";
import ChatScreen from "../screens/app/ChatScreen";
import UserProfile from "../screens/app/UserProfileScreen";
type userDataType = {
    _id: string,
    name: string,
    email: string,
    avatar: string
}
type AppStack = {
    Home: undefined,
    Chat: {
        currentUser?: userDataType
        chatWith?: userDataType
    },
    UserProfile: { currentUser: userDataType }
}

const Stack = createNativeStackNavigator<AppStack>()
const AppNavigation = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor='white'
                    barStyle='light-content' />
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name='Home' component={HomeScreen} />
                    <Stack.Screen name='Chat' component={ChatScreen} />
                    <Stack.Screen name='UserProfile' component={UserProfile} />

                </Stack.Navigator>
            </SafeAreaView>
        </Fragment>
    )
}


export default AppNavigation