import { StyleSheet, Text, TextInput, View, text} from 'react-native'
import React, {useState, useEffect} from 'react'
import ImagePicker from "react-native-image-picker"
import { Dimensions, Modal, Button, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from 'react-native-web'
import moment from 'moment'
import {auth,database} from "../firebase";
import "firebase/firestore";


const UpdateBooking = ({navigation, route}) => {
    const { venueName } = route.params;
    //const [ venueName1, setVenueName1] = useState('');
    const [ timestamp, setTimeStamp] = useState('');
    const [ StartDate, setStartDate] = useState('');
    const [ EndDate, setEndDate] = useState('');
    const [ TimeSlot, setTimeSlot] = useState('');
    const [ Guests, setGuests] = useState('');
    const [ Status, setStatus] = useState('');

    const [values, setValues] = useState({
        Status: "",
    })

    useEffect(() => {
        displayBooking();
    }, []);
    

    const changeStatus = () =>{
        if(Status === '')
        {alert('Update Error','Enter your detail to update')}
        else { updateStatus(Status).then (() => { 
            alert("Status updated");
            navigation.navigate('BookingList');
            console.log("Booking Status updated");
        })}
    }

    const displayBooking = async () => {
        const list=[];
        await  database
          .collection('Venue').where('venueName', '==' , venueName)
          .get()
          .then((querySnapshot) => {querySnapshot.forEach((doc) =>{
    
            const {
                venueName,
                    timestamp,
                    StartDate,
                    EndDate,
                    TimeSlot,
                    Guests,
                    Status
            }=doc.data();
            list.push({
                venueName: venueName,
                    timestamp: timestamp,
                    StartDate: StartDate,
                    EndDate: EndDate,
                    TimeSlot: TimeSlot,
                    Guests: Guests,
                    Status: Status,
            })

            setStatus(Status)
          })
            console.log(venueName)
            
          });
    }


  return (
    <View style={styles.container}>
        
        <View style={styles.pagetitle}>
            <Text style={styles.heading}>Update Booking</Text>
        </View>
        <ImageBackground style={styles.bgImage} source={require('../assets/images/bg4.jpg')}>
        
        <ScrollView style={styles.mainContainer}>
            <View style={styles.formContainer}>
            <Text style={styles.heading2}>BOOKING MADE</Text>
                <TextInput                    
                    value={venueName}
                    style={styles.input}
                />
                
                <Text style={styles.heading2}>VENUE NAME</Text>
                <TextInput
                    value={venueName}
                    placeholder={venueName}
                    style={styles.input}
                />

                <Text style={styles.heading2}>FROM</Text>
                <TextInput                   
                    value={venueName}
                    style={styles.input}
                />

                <Text style={styles.heading2}>TO</Text>
                <TextInput                 
                    value={venueName}
                    style={styles.input}
                />

                <Text style={styles.heading2}>TIME SLOT</Text>
                <TextInput
                    value={TimeSlot}
                    style={styles.input}
                />

                <Text style={styles.heading2}>GUESTS</Text>
                <TextInput
                    value={Guests}
                    style={styles.input}
                />


                <Text style={styles.heading2}>STATUS</Text>
                <TextInput
                    value={Status}
                    style={styles.input}
                />
                <TouchableOpacity
                    onChange={changeStatus}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
    
                    

            </View>
        </ScrollView>
        </ImageBackground>
    </View>

  )
}

export default UpdateBooking

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    pagetitle:{
        width: '100%',
        padding: 18,
        paddingLeft: 22,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255,255,255, 0.9)',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    heading:{
        fontSize: 18,
        fontWeight: 500
    },
    bgImage:{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        paddingVertical: 20,
        alignItems: 'center'
    },
    mainContainer:{
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
        flexDirection: 'column'
    },
    formContainer:{
        padding: 20,
        paddingTop: 50,
    },
    heading2:{
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 5,
        color: '#6E6E6E',
        paddingLeft: 10
    },
    input :{
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#e0e0e0',
        borderWidth: 1
    },
    addphoto:{
        height: 60, 
        width: 40,
        marginRight: 0,
        borderRadius: 5
    },
    button:{
        backgroundColor: '#00a86b',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 15,
        borderColor: '#fff',
        borderWidth: 1
      },
      buttonText:{
        color: 'white',
        fontWeight: '500',
        fontSize: 20
      }
})