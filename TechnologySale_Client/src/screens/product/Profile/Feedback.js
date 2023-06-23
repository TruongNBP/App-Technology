import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';


const Feedback = (props) => {

    const { navigation } = props;

    let [fontsLoaded, error] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_500Medium
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.background}>
            <View style={styles.appBarContainer}>
                <Entypo onPress={() => navigation.goBack()} style={styles.back} name="chevron-left" size={18} color="black" />
                <Text style={styles.appBar}>Gửi góp ý về ứng dụng</Text>
            </View>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.tittleContainer}>
                        <Text style={styles.tittle}>Đối với Lava, mọi góp ý của bạn đều quý giá</Text>
                    </View>
                    <TextInput
                        multiline
                        style={styles.textInput}
                        placeholder='Chia sẻ cảm nghĩ của bạn về ứng dụng cho Lava tại đây'
                        placeholderTextColor={'grey'} />
                </View>
            </ScrollView>
            <Pressable style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Gửi phản hồi</Text>
            </Pressable>
        </View>
    )
}

export default Feedback

const styles = StyleSheet.create({
    buttonText:{
        marginVertical:15,
        color:'white',
        fontFamily:'Montserrat_500Medium',
        fontSize:14
    },
    buttonContainer:{
        backgroundColor:'#c4c4c4',
        margin:15,
        alignItems:'center',
        borderRadius:10
    },
    textInput: {
        borderColor: '#c4c4c4',
        borderWidth: 1,
        padding: 15,
        margin: 15,
        borderRadius: 5,
        height:180,
        fontFamily:'Montserrat_500Medium',
        fontSize:14
    },
    tittle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
    },
    tittleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15
    },
    container: {
        width: '100%',
        height: '100%',
        marginBottom: 75
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
        alignItems: 'center',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1
    },
    background: {
        backgroundColor: 'white',
        height: '100%'
    }
})