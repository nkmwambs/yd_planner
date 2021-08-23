import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    BackHandler,
    Alert, TouchableOpacity, Image, View, Text
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


import Strings from '../../Constants/Strings/en'
import Endpoints from '../../Constants/Endpoints'

import RecentActivities from './RecentActivities'
import Notices from './Notices'
import Statistics from './Statistics'


const UserAvatar = () => {

    const [userName, setUserName] = useState();

    const getUserName = async () => {
        await AsyncStorage.getItem('user_name')
            .then((user_name) => {
                setUserName(user_name)
            }).catch((error) => {
                alert("Failed to get data from storage");
            })
    }

    useEffect(() => {
        getUserName();
    })

    const add_story = () => {
        alert("This is feature is upcoming");
        //navigation.navigate("Stories");
    }

    const update_photo = () => {
        alert("This is feature is upcoming");
    }

    return (
        <>
            <View style={{ alignSelf: "center", top: 10 }}>
                <View style={styles.profileImage}>
                    <Image source={require("../../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={styles.dm}>
                    <TouchableOpacity onPress={add_story}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </TouchableOpacity>
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}>
                    <TouchableOpacity onPress={update_photo}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userName}</Text>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Student</Text>
            </View>
        </>
    );
}


export default DashboardScreen = ({ navigation }) => {

    const [overdueGoals, setOverdueGoals] = useState(0);
    const [dueTasks, setDueTasks] = useState(0);
    const [overdueTasks, setOverdueTasks] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        useBackAction();

        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            getStatistics();
        });

        return () => {
            // Unsubscribe for the focus Listener
            unsubscribe;
        };
    }, [navigation]);


    const getStatistics = async () => {
        const user_id = await AsyncStorage.getItem('user_id');
        fetch(Endpoints.dashboard_statistics + new Date().toISOString().slice(0, 10) + "/" + user_id, {

            method: "get",
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setDueTasks(json.data.count_due_tasks);
                setOverdueGoals(json.data.count_overdue_goals);
                setOverdueTasks(json.data.count_overdue_tasks);
            })
            .catch((error) => console.error(error))
    }


    const useBackAction = () => {
        const backAction = () => {
            Alert.alert(Strings.confirmationAlertTitle, Strings.confirmExitAppMessage, [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <UserAvatar />
                <Statistics
                    overdueGoals={overdueGoals}
                    dueTasks={dueTasks}
                    overdueTasks={overdueTasks}
                />
                <Notices />
                <RecentActivities />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        //fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});
