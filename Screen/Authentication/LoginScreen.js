// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect, useContext } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings/en'
import Endpoints from '../../Constants/Endpoints';
import {is_valid_object} from "../../Functions/helpers"
import NetInfo from "@react-native-community/netinfo";
import { GlobalContext } from '../../Context/GlobalContext';
import { PlanContext } from "../../Context/PlanContext";

const LoginScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [connected, setConnected] = useState(false);

    const {registerUserId, updateLanguagePhrases} = useContext(GlobalContext)
    const {updateCurrentPlanId, updateCurrentGoalId, updateCurrentTaskId} = useContext(PlanContext)

    const passwordInputRef = createRef();

    useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            setConnected(state.isConnected);
        });

        // Unsubscribe
        unsubscribe();
    })

    // const get_language_phrases = async () => {
    //     const user_id = await AsyncStorage.getItem("user_id");
    //     const user_language = await AsyncStorage.getItem("user_language");
    
    //     let language_endpoint = Endpoints.language + user_id + '/' + user_language
    
    //     await getItems(language_endpoint).then((data) => {
    //       //console.log(data);
    //       setLoading(false);
    //       updateLanguagePhrases(is_valid_object(data) ? data : {});
    //     });
    //   };

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);
        let dataToSend = { email: userEmail, password: userPassword };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch(Endpoints.login, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                //Header Defination
                'Content-Type':'multipart/form-data',
                'x-api-key':'SZcCIny4AsVakkp0m8kw1nKIHLqPP8mbQSsiqx40',
                'Accept': '*/*'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                //console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    AsyncStorage.setItem('user_id', responseJson.data.user_id);
                    AsyncStorage.setItem('user_name', responseJson.data.user_name);
                    AsyncStorage.setItem('user_language', responseJson.data.language_name);
                    AsyncStorage.setItem('user_language_code', responseJson.data.language_code);

                    updateLanguagePhrases(responseJson.data.language_phrases);
                    registerUserId(responseJson.data.user_id)
                    updateCurrentPlanId(0)
                    updateCurrentGoalId(0)
                    updateCurrentTaskId(0)

                    //console.log(responseJson.data.language_phrases);
                    navigation.replace('MainDrawerNavigator');
                } else {
                    console.log(responseJson);
                    setErrortext(Strings.emailPasswordNotFound)
                    //console.log('Please check your email id or password');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../Image/logo.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder={Strings.enterEmail} //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                placeholder={Strings.enterPassword} //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}

                        {
                            <Text style={styles.errorTextStyle}>
                                {!connected ? "Connection is lost" : null}
                            </Text>
                        }
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>{Strings.login.toUpperCase()}</Text>
                        </TouchableOpacity>
                        {/* <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            New Here ? Register
                        </Text> */}
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.mainBackgroundColor,
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});