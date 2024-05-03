import React from "react";
import { Dimensions, Image, Platform, SafeAreaView, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { CommonActions, NavigationAction, useNavigation } from "@react-navigation/native";
type NavType = {
    navigate: (value: string) => void
    dispatch: (action: NavigationAction) => void;
}
type userDataType = {
    _id: string,
    name: string,
    email: string,
    avatar: string
}

const UserProfile = ({ route }: { route: { params: { currentUser: userDataType } } }) => {
    const navigation = useNavigation<NavType>()
    const currentUser = route.params.currentUser
    console.log("cuurentUser", currentUser);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Profile" iconLeft='https://cdn.iconscout.com/icon/free/png-256/free-back-arrow-1767507-1502574.png' onBackPress={() => navigation.navigate("Home")} rightIcon={require('../../assets/img/logout.png')} onPressRightIcon={() =>
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'AuthStack' }],
                    }),
                )} />
            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 20, rowGap: 10 }}>
                <Image style={{ width: 100, height: 100, borderRadius: 100, borderColor: 'gray', borderWidth: 1 }} source={{
                    uri: currentUser?.avatar
                }} />
                <Text style={{ color: 'black', fontSize: 24, fontWeight: '700', }}>{currentUser.name}</Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>{currentUser.email}</Text>
            </View>
        </SafeAreaView>
    )
}
export default UserProfile;