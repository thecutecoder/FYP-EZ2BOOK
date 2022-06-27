import { StyleSheet, Text, FlatList, TextInput, View, text} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Dimensions, 
    ImageBackground, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
    Image, 
    ScrollView } from 'react-native-web'
import moment from 'moment';
import {auth,database} from "../firebase";
import "firebase/firestore";


const Venue = ({navigation}) => {
        const [BookingList, setBookingList] = useState([]);
  
        useEffect(() => {
          getBookingList(BookingList);
        });
      
        const getBookingList = async () => {
          await database.collection("Book")
            .get()
            .then((querySnapshot) => {
              let myData = [];
              querySnapshot.forEach((doc) => {
                const{
                    venueName,
                    timestamp,
                    StartDate,
                    EndDate,
                    TimeSlot,
                    Guests,
                    Status
                } = doc.data();
                myData.push({
                    venueName: venueName,
                    timestamp: timestamp,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    TimeSlot: TimeSlot,
                    Guests: Guests,
                    Status: Status,
                });
              });
              setBookingList(myData);
            })
            .catch((error) => {
              console.log("Error getting data: ", error);
              //console.log(doc.data);
            });
        };
      
        const Item = ({ venueName, timestamp, StartDate, EndDate, TimeSlot, Guests, Status }) => (
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('UpdateBooking', {venueName})}>
                    <View style= {styles.leftView}>
                    <Text style={styles.heading2}>
                        {moment(timestamp.toDate()).format('LLL')} 
                    </Text>
                    </View>

                    <View style= {styles.rightView}>
                        <Text style={styles.heading1}>Venue: {venueName}</Text>
                        <Text style={styles.text2}>Time slot: {TimeSlot}</Text>
                        <Text style={styles.text2}>Status: {Status}</Text>
                        
                    </View>
                </TouchableOpacity> 
        );
      
        const renderItem = ({ item }) => (
          <Item 
            venueName ={item.venueName} 
            timestamp ={item.timestamp} 
            StartDate ={item.StartDate} 
            EndDate ={item.EndDate}
            TimeSlot ={item.TimeSlot}
            Guests ={item.Guests}
            Status ={item.Status}
          />
        );

        


  return (
    <View style={styles.container1}>
        
        
        <ImageBackground style={styles.bgImage} source={require('../assets/images/bg4.jpg')}>
        
        <View style={styles.pagetitle}>
            <Text style={styles.heading}>Venue</Text>
        </View>

            <ScrollView>
                <FlatList
                    data={BookingList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.venueName}
                />            
            </ScrollView>

        </ImageBackground>
    </View>

  )
}

export default Venue

const styles = StyleSheet.create({
    container1:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    pagetitle:{
        width: '100%',
        padding: 18,
        paddingLeft: 22,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    heading:{
        fontSize: 18,
        fontWeight: 500
    },
    bgImage:{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        paddingBottom: 20
    },
    item: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#E6E6E6',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: '#6E6E6E',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        flexDirection: 'row'
    },
    leftView:{
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    itemImage:{
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    rightView:{
        width: '65%',
        padding: 15
    },
    heading1:{
        fontSize: 18,
        fontWeight: 500,
        marginBottom: 5
    },
    heading2:{
        fontSize: 16,
        fontWeight: 500,
    },
    text1:{
        fontSize: 16,
        fontWeight: 500
    },
    text2: {
        fontSize: 14,
        color: '#2E2E2E'
    },
    edit:{
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 10
    },
    editButton:{
        width: 25,
        height: 25,
    },



    TouchableOpacity: {
        position: 'absolute',
        width: 70,
        height: 70,
        right: 20,
        bottom: 30,
        justifyContent: 'center'
    },
    floatingButton:{
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
        borderRadius: 100
    }

})