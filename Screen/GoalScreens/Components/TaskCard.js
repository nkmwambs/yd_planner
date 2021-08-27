import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Modal, Pressable, Dimensions } from 'react-native'
import Colors from '../../../Constants/Colors'
import Endpoints from '../../../Constants/Endpoints'
import Strings from '../../../Constants/Strings/en'
import { useNavigation } from '@react-navigation/native'

import PlannerModal from '../../Components/PlannerModal'

import { Card, Button, Icon } from 'react-native-elements'

const TaskCard = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.heading}>
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    presentationStyle="fullScreen"
                    statusBarTranslucent={false}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{props.taskDescription}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>

            <Card containerStyle={{ width: Dimensions.get('window').width }}>
                <Card.Title>
                    <Button
                        title="Add Note"
                        containerStyle={{ paddingRight: 5 }}
                        onPress={() => navigation.navigate("AddtaskNote")}
                        buttonStyle={{ backgroundColor: "green" }}
                    />

                    {/* <Button
                        onPress={() => null}
                        title="Edit Task"
                        containerStyle={{ paddingRight: 5 }}
                    /> */}

                    <Button
                        onPress={() => alert("Feature not implemented")}
                        title="Mark Complete"
                        containerStyle={{ paddingRight: 5 }}
                        buttonStyle={{ backgroundColor: "red" }}
                    />


                </Card.Title>
                <Card.Divider />
                <Card.Image source={require('../../../Image/logo.png')}>
                    <Text style={{ marginBottom: 10 }}>
                        {props.taskTitle}
                    </Text>

                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontStyle: "italic" }}>
                            <Text style={{ fontWeight: 'bold' }}>{Strings.startDate}: </Text> {props.taskStartDate}
                            <Text style={{ fontWeight: 'bold' }}> {Strings.endDate}: </Text> {props.taskEndDate}</Text>
                    </View>
                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10 }}
                        title='Read Task Description'
                        onPress={() => setModalVisible(true)}
                    />
                </Card.Image>
            </Card>
        </View>
    )
}

export default TaskCard;

const styles = StyleSheet.create({
    heading: {
        alignItems: 'center',
        marginBottom: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //margin: 22
    },
    modalView: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').height - 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        position: "absolute",
        bottom: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})