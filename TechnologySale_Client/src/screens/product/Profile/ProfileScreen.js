import { StyleSheet, Text, View, ScrollView, Pressable,TouchableOpacity } from 'react-native';
import React,{useContext} from 'react';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Entypo, Octicons, Ionicons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../user/UserContext';
const ProfileScreen = (props) => {
    const { navigation } = props;
    const { onPostLogout } = useContext(UserContext);
    let [fontsLoaded, error] = useFonts({
        Montserrat_600SemiBold,
        Montserrat_500Medium
    });

    if (!fontsLoaded) {
        return null;
    }

    const postLogout = async () => {
        const res = onPostLogout();
    
      };

    return (
        <View>
            <View style={styles.appBarContainer}>
                <Text style={styles.appBar}>Tài Khoản</Text>
            </View>
            <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.listContainer}>
                        <View style={styles.listTittleContainer}>
                            <Text style={styles.listTittle}>Hỗ trợ</Text>
                        </View>
                        <View style={styles.listBodyContainer}>
                            <Pressable style={styles.listBody} onPress={() => navigation.navigate('BuyingHistory')}>
                                <View style={styles.listBodyTextContainer}>
                                    <Octicons name="checklist" size={18} color="black" />
                                    <Text style={styles.listBodyText}>Lịch sử đơn hàng</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={24} color="black" />
                            </Pressable>
                            <View style={styles.line}></View>
                            <Pressable style={styles.listBody} onPress={() => navigation.navigate('Contact')}>
                                <View style={styles.listBodyTextContainer}>
                                    <Ionicons name="chatbox-outline" size={18} color="black" />
                                    <Text style={styles.listBodyText}>Liên hệ và góp ý</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={24} color="black" />
                            </Pressable>
                            <Pressable style={styles.listBody} onPress={() => navigation.navigate('FavouriteProduct')}>
                                <View style={styles.listBodyTextContainer}>
                                    <AntDesign name="hearto" size={18} color="black" />
                                    <Text style={styles.listBodyText}>Đã thích</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.listContainer}>
                        <View style={styles.listTittleContainer}>
                            <Text style={styles.listTittle}>Tài khoản</Text>
                        </View>
                        <View style={styles.listBodyContainer}>
                            <Pressable style={styles.listBody} onPress={() => navigation.navigate('UserInformation')}>
                                <View style={styles.listBodyTextContainer}>
                                    <Ionicons name="ios-person-outline" size={18} color="black" />
                                    <Text style={styles.listBodyText}>Thông tin cá nhân</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={24} color="black" />
                            </Pressable>
                            <View style={styles.line}></View>
                            {/* <Pressable onPress={() => navigation.navigate('UserConfirm')} style={styles.listBody}>
                                <View style={styles.listBodyTextContainer}>
                                <Ionicons name="ios-key-outline" size={18} color="black" />
                                    <Text style={styles.listBodyText}>Thay đổi mật khẩu</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={24} color="black" />
                            </Pressable> */}
                            <View style={styles.line}></View>
                            <TouchableOpacity onPress={postLogout}>
                                <View style={styles.listBody}>
                                    <View style={styles.listBodyTextContainer}>
                                        <SimpleLineIcons name="logout" size={18} color="black" />
                                        <Text style={styles.listBodyText}>Đăng xuất</Text>
                                    </View>
                                    <Entypo name="chevron-small-right" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    listBodyTextContainer: {
        flexDirection: 'row'
    },
    line: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 0.7,
        marginHorizontal: 15
    },
    listBodyText: {
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium'
    },
    listBody: {
        alignItems: 'center',
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listBodyContainer: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    listTittle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18
    },
    listTittleContainer: {
        marginBottom: 15
    },
    listContainer: {
        padding: 15
    },
    appBar: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
    },
    appBarContainer: {
        position: 'relative',
        backgroundColor: 'white',
        width: '100%',
        height: 75
    },
    container: {
        width: '100%',
        height: '100%',
        paddingBottom: 75
    }
})