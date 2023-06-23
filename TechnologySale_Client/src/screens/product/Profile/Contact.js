import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Button, Linking, } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Entypo, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import * as MailComposer from 'expo-mail-composer';

const Contact = (props) => {

    const { navigation } = props;

    const openURI = async () => {
        const url = 'https://caodang.fpt.edu.vn'
        const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
        if (supported) {
            await Linking.openURL(url); // It will open the URL on browser.
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    const openFacebook = async () => {
        const url = 'https://www.facebook.com/caodang.fptpoly'
        const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
        if (supported) {
            await Linking.openURL(url); // It will open the URL on browser.
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    const [phoneNumber, setPhoneNumber] = useState('028 7308 8800');

    const triggerCall = () => {
        const args = {
            number: phoneNumber,
            prompt: true,
        };

        call(args).catch(console.error);
    }

    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        async function checkAvailability() {
            const isMailAvailable = await MailComposer.isAvailableAsync();
            setIsAvailable(isMailAvailable);
        }

        checkAvailability();
    }, []);

    const sendMail = () => {
        MailComposer.composeAsync({
            subject: "Hi friends!",
            body: "How are you all?",
            recipients: "caodang@fpt.edu.vn"
        });
    };


    let [fontsLoaded, error] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_500Medium
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View>
            <Pressable onPress={() => navigation.goBack()} style={styles.appBarContainer}>
                <Entypo style={styles.back} name="chevron-left" size={18} color="black" />
                <Text style={styles.appBar}>Liên hệ và góp ý</Text>
            </Pressable>
            <View style={styles.space}></View>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.list}>
                        <Pressable onPress={triggerCall} style={styles.listContainer}>
                            <Feather name="phone" size={18} color="black" />
                            <View style={styles.listTextContainer}>
                                <Text style={styles.listText}>Tổng đài</Text>
                                <Text style={[styles.listText, { paddingTop: 5 }]}>{phoneNumber}</Text>
                            </View>
                        </Pressable>
                        <View style={styles.line}></View>
                        <Pressable onPress={sendMail} style={styles.listContainer}>
                            <Feather name="mail" size={18} color="black" />
                            <View style={styles.listTextContainer}>
                                <Text style={styles.listText}>Email</Text>
                                <Text style={[styles.listText, { paddingTop: 5 }]}>caodang@fpt.edu.vn</Text>
                            </View>
                        </Pressable>
                        <View style={styles.line}></View>
                        <Pressable onPress={openURI} style={styles.listContainer}>
                            <FontAwesome5 name="globe-asia" size={18} color="black" />
                            <View style={styles.listTextContainer}>
                                <Text style={styles.listText}>Website</Text>
                                <Text style={[styles.listText, { paddingTop: 5 }]}>caodang.fpt.edu.vn</Text>
                            </View>
                        </Pressable>
                        <View style={styles.line}></View>
                        <Pressable onPress={openFacebook} style={styles.listContainer}>
                            <Entypo name="facebook" size={18} color="black" />
                            <View style={styles.listTextContainer}>
                                <Text style={styles.listText}>Facebook</Text>
                                <Text style={[styles.listText, { paddingTop: 5 }]}>facebook.com/caodang.fptpoly</Text>
                            </View>
                        </Pressable>
                        <View style={styles.line}></View>
                        <Pressable onPress={() => navigation.navigate('Feedback')} style={styles.listContainer}>
                            <MaterialCommunityIcons name="comment-alert-outline" size={18} color="black" />
                            <View style={styles.listTextContainer}>
                                <Text style={styles.listText}>Gửi góp ý về ứng dụng</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Contact

const styles = StyleSheet.create({
    line: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 0.7,
        marginHorizontal: 15
    },
    listText: {
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium'
    },
    listTextContainer: {
        paddingLeft: 15
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    list: {
        backgroundColor: 'white',
        paddingBottom: 5
    },
    container: {
        width: '100%',
        height: '100%',
        marginBottom: 90
    },
    space: {
        height: 15
    },
    appBar: {
        position: 'absolute',
        bottom: 15,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
    },
    back: {
        position: 'absolute',
        bottom: 15,
        left: 15
    },
    appBarContainer: {
        position: 'relative',
        backgroundColor: 'white',
        width: '100%',
        height: 75,
        alignItems: 'center'
    },
})