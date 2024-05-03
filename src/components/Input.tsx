import React, { useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    Platform,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

type InputProps = {
    icon?: ImageSourcePropType;
    onIconPress?: () => void
    height?: number
    radius?: number
    iconSize?: number
} & TextInputProps;
export const Input = (props: InputProps) => {
    const [focus, setFocus] = useState(false)
    return (
        <View style={{ flexDirection: 'row', borderWidth: 2, paddingHorizontal: 20, marginBottom: 20, borderColor: 'gray', alignItems: 'center', justifyContent: 'space-between', borderRadius: props.radius ? props.radius : 100 }}>
            <TextInput style={{ textAlign: 'left', paddingVertical: Platform.OS === 'ios' ? 16 : 14, height: props.height, borderRadius: props.radius ? props.radius : 100, verticalAlign: props.height ? 'top' : 'middle', paddingTop: Platform.OS === 'ios' ? 16 : 14, flex: 1 }}
                placeholder={props.placeholder}
                placeholderTextColor={focus ? 'black' : '#BDBDBD'}
                keyboardType={props.keyboardType || 'default'}
                onChange={props.onChange}
                multiline={Platform.OS === 'ios' && props.height ? true : false}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={props.value}
                {...props}
            />
            <TouchableOpacity onPress={props.onIconPress} >
                <Image style={{ width: props.iconSize, height: props.iconSize, }} source={props.icon} />
            </TouchableOpacity>
        </View>
    );
};

