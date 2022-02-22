import React, { useRef } from "react";
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    Animated,
    useWindowDimensions,
    Dimensions
} from "react-native";

// const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

const NoteSlider = ({ notes }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const { width: windowWidth } = useWindowDimensions();

    return (
        // <SafeAreaView style={styles.container}>
        <View style={[styles.container, { width: Dimensions.get('window').width }]}>
            <ScrollView
                horizontal={true}
                // style={styles.scrollViewStyle}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: scrollX
                            }
                        }
                    }
                ], { useNativeDriver: false })}
                scrollEventThrottle={1}
            >
                {notes.map((note, notesIndex) => {
                    return (

                        <View
                            key={notesIndex}
                            style={{
                                width: Dimensions.get('window').width,
                                height: 250,
                                backgroundColor: "#D3D3D3",
                                padding: 10,
                                borderColor: "#FFFF",
                                borderWidth: 2,
                            }}

                        >
                            <ScrollView>
                                <Text>{note.task_note}</Text>
                            </ScrollView>

                        </View>

                    );
                })}
            </ScrollView>
            <View style={[styles.indicatorContainer, { position: 'absolute', bottom: 20, left: 0, right: 0 }]}>
                {notes.map((note, noteIndex) => {
                    const width = scrollX.interpolate({
                        inputRange: [
                            windowWidth * (noteIndex - 1),
                            windowWidth * noteIndex,
                            windowWidth * (noteIndex + 1)
                        ],
                        outputRange: [8, 16, 8],
                        extrapolate: "clamp"
                    });
                    return (
                        <Animated.View
                            key={noteIndex}
                            style={[styles.normalDot, { width }]}
                        />
                    );
                })}
            </View>
        </View>
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: 300,
    },

    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 20,
        borderRadius: 5,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        backgroundColor: "rgba(0,0,0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5
    },
    infoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    indicatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default NoteSlider;