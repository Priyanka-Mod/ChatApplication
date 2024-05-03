import React from 'react';
import { TouchableOpacity, View, Text, Image, ImageSourcePropType } from 'react-native';

type HeaderProps = {
    backgrndTransparent?: boolean
    iconLeft?: string;
    onBackPress?: () => void
    onPressRightIcon?: () => void
    title?: string;
    rightIcon?: ImageSourcePropType,

};

export const Header = (props: HeaderProps) => {

    return (
        <>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', height: 45, backgroundColor: 'white', }}>
                <TouchableOpacity disabled={!Boolean(props.iconLeft)} onPress={props.onBackPress}
                    style={{ alignItems: 'center', width: 45, height: 45, justifyContent: 'center' }}>
                    <Image style={{ width: 40, height: 40, borderRadius: 100, }} source={{
                        uri: props.iconLeft
                    }} />

                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', color: "#18191A", fontSize: 20, fontWeight: '800' }}>{props.title}</Text>
                <TouchableOpacity disabled={!Boolean(props.rightIcon)} onPress={props.onPressRightIcon}
                    style={{ alignItems: 'center', width: 45, height: 45, justifyContent: 'center' }}>
                    <Image style={{ width: 30, height: 30, }} source={props.rightIcon} />
                </TouchableOpacity>
            </View>
        </>
    )
};