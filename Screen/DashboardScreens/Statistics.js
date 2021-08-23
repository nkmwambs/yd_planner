import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Strings from '../../Constants/Strings/en'

const Statistics = (props) => {

    return (
        <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statsBox} onPress={() => alert('This feature is upcoming')}>
                <View>
                    <Text style={[styles.text, { fontSize: 24 }]}>{props.overdueGoals}</Text>
                    <Text style={[styles.text, styles.subText]}>{Strings.overdueGoals}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]} onPress={() => alert('This feature is upcoming')}>
                <View>
                    <Text style={[styles.text, { fontSize: 24 }]}>{props.dueTasks}</Text>
                    <Text style={[styles.text, styles.subText]}>{Strings.dueTasks}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statsBox} onPress={() => alert('This feature is upcoming')}>
                <View>
                    <Text style={[styles.text, { fontSize: 24 }]}>{props.overdueTasks}</Text>
                    <Text style={[styles.text, styles.subText]}>{Strings.overdueTasks}</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}

export default Statistics;

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