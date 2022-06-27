import { StyleSheet, Text, TextInput, View, text} from 'react-native'
import React, {useState, useEffect} from 'react'
import ImagePicker from "react-native-image-picker"
import { Dimensions, Modal, Button, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from 'react-native-web'
import {auth,database} from "../firebase";
import "firebase/firestore";


const UpdateVenue = ({navigation, route}) => {
    const { venueName } = route.params;
    //const [ venueName1, setVenueName1] = useState('');
    const [ venueAddress, setVenueAddress] = useState('');
    const [ venueCapacity, setVenueCapacity] = useState('');
    const [ venueDesc, setVenueDesc] = useState('');
    const [ venueFacilities, setVenueFacilities] = useState('');
    const [ postImg, setPostImg] = useState('');

    const [values, setValues] = useState({
        venueName: "",
        venueAddress: "",
        venueCapacity: "",
        venueDesc: "",
        venueFacilities: "",
        postImg: "",
    })

    useEffect(() => {
        displayVenue();
    }, []);
    

    const changeVenueName = () =>{
        if(venueName === '')
        {alert('Update Error','Enter your detail to update')}
        else { updateVenueName(venueName).then (() => { 
            alert("Venue name updated");
            navigation.navigate('Home');
            console.log("Venue name updated");
        })}
    }

    const changeVenueAddress = () =>{
        if(venueAddress === '')
        {alert('Update Error','Enter your detail to update')}
        else { (venueAddress).updateVenueAddress(venueAddress).then (() => { 
            alert("Venue address updated");
            navigation.navigate('Home');
            console.log("Venue address updated");
        })}
    }

    const changeVenueCapacity = () =>{
        if(venueCapacity === '')
        {alert('Update Error','Enter your detail to update')}
        else { updateVenueCapacity(venueCapacity).then (() => { 
            alert("Venue capacity updated");
            navigation.navigate('Home');
            console.log("Venue capacity updated");
        })}
    }

    const changeVenueDesc = () =>{
        if(venueDesc === '')
        {alert('Update Error','Enter your detail to update')}
        else { updateVenueDesc(venueDesc).then (() => { 
            alert("Venue capacity updated");
            navigation.navigate('Home');
            console.log("Venue capacity updated");
        })}
    }

    const changeVenueFacilities = () =>{
        if(venueFacilities === '')
        {alert('Update Error','Enter your detail to update')}
        else { updateVenueFacilities(venueFacilities).then (() => { 
            alert("Venue facilities updated");
            navigation.navigate('Home');
            console.log("Venue facilities updated");
        })}
    }

    const changePassword = () =>{
    if(password === '')
    {Alert.alert('Update Error', 'Enter your password to update')}
    else { auth.currentUser.updatePassword(password).then (() => { 
        alert("Password updated");
        console.log("Password updated");
        navigation.navigate('Home');
    })}
    }


    const displayVenue = async () => {
        const list=[];
        await  database
          .collection('Venue').where('venueName', '==' , venueName)
          .get()
          .then((querySnapshot) => {querySnapshot.forEach((doc) =>{
    
            const {
                venueName,
                venueAddress,
                venueCapacity,
                venueDesc,
                venueFacilities,
                postImg,
            }=doc.data();
            list.push({
                venueName: venueName,
                venueAddress: venueAddress,
                venueCapacity: venueCapacity,
                venueDesc: venueDesc,
                venueFacilities: venueFacilities,
                postImg:  postImg,
            })

            //setVenueName(venueName)
            setVenueAddress(venueAddress)
            setVenueCapacity(venueCapacity)
            setVenueDesc(venueDesc)
            setVenueFacilities(venueFacilities)
          })
            console.log(venueName)
            
          });
    }


  return (
    <View style={styles.container}>
        
        <View style={styles.pagetitle}>
            <Text style={styles.heading}>Update Venue</Text>
        </View>
        <ImageBackground style={styles.bgImage} source={require('../assets/images/bg4.jpg')}>
        
        <ScrollView style={styles.mainContainer}>
            <View style={styles.formContainer}>
                <Text style={styles.heading2}>VENUE NAME</Text>
                <TextInput
                    value={venueName}
                    placeholder={venueName}
                    style={styles.input}
                />
                

                <Text style={styles.heading2}>VENUE ADDRESS</Text>
                <TextInput                    
                    value={venueAddress}
                    onChangeText={text => setVenueAddress(text)}
                    placeholder="Enter new address"
                    style={styles.input}
                />
                <TouchableOpacity
                    onChange={changeVenueAddress}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>

                <Text style={styles.heading2}>CAPACITY</Text>
                <TextInput                   
                    value={venueCapacity}
                    onChangeText={text => setVenueCapacity(text)}
                    keyboardType='numeric'
                    placeholder="Venue capacity"
                    style={styles.input}
                />
                <TouchableOpacity
                    onChange={changeVenueCapacity}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>


                <Text style={styles.heading2}>FACILITIES</Text>
                <TextInput                 
                    value={venueFacilities}
                    onChangeText={text => setVenueFacilities(text)}v
                    placeholder="Venue facilities"
                    style={styles.input}
                />
                <TouchableOpacity
                    onChange={changeVenueFacilities}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>


                <Text style={styles.heading2}>VENUE DESCRIPTION</Text>
                <TextInput
                    multiline
                    value={venueDesc}
                    onChangeText={text => setVenueDesc(text)}
                    placeholder="Description about venue"
                    style={styles.input}
                />
                <TouchableOpacity
                    onChange={changeVenueDesc}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>


                <Text style={styles.heading2}>VENUE PHOTOS</Text>
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={{}}>
                        <Image style={styles.addphoto}  source={{uri : postImg}}></Image>
                    </TouchableOpacity>
                </View> 

                <TouchableOpacity
                    onChange={{}}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>   
                    

            </View>
        </ScrollView>
        </ImageBackground>
    </View>

  )
}

export default UpdateVenue

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