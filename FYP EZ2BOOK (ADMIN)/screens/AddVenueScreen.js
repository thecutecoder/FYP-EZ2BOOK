import { StyleSheet, Text, TextInput, View, Alert, text} from 'react-native'
import React, {useState, useEffect} from 'react'
import ImagePicker from "react-native-image-picker"
import { Dimensions, Modal, Button, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from 'react-native-web'
import * as firebase from 'firebase';
import {storage, database} from '../firebase';


const AddVenue = ({navigation}) => {;
    //const [image, setImage] = useState(null);
    //const [uploading, setUploading] = useState(false);
    //const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

    const [values, setValues] = useState({
        venueName: "",
        venueID: "",
        venueAddress: "",
        venueCapacity: "",
        venueDesc: "",
        venueFacilities: "",
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
      }

      const submitPost = async () => {
        const { venueName,
          venueID,
          venueAddress,
          venueCapacity,
          venueDesc,
          venueFacilities,
         } = values
    
        console.log('Post: ', post);

        await database
    .collection('Venue')
    .add({
      //userId: user.uid,
      venueName,
      venueID,
      venueAddress,
      venueCapacity,
      venueDesc,
      venueFacilities,
    })
    .then(() => {
      console.log('New venue added');
      alert(
        'New venue successfully added!'
      );
      navigation.navigate('Venue');
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }


  return (
    <View style={styles.container}>
        
        <View style={styles.pagetitle}>
            <Text style={styles.heading}>Add New Venue</Text>
        </View>
        <ImageBackground style={styles.bgImage} source={require('../assets/images/bg4.jpg')}>
        
        <ScrollView style={styles.mainContainer}>
            <View style={styles.formContainer}>
            <Text style={styles.heading2}>VENUE ID</Text>
                <TextInput
                    onChangeText={text => handleChange(text, "venueID")}
                    placeholder="Enter venue ID"
                    style={styles.input}
                />
                
                <Text style={styles.heading2}>VENUE NAME</Text>
                <TextInput
                    onChangeText={text => handleChange(text, "venueName")}
                    placeholder="Enter venue name"
                    style={styles.input}
                />

                <Text style={styles.heading2}>VENUE ADDRESS</Text>
                <TextInput                    
                    onChangeText={text => handleChange(text, "venueAddress")}
                    placeholder="Enter venue address"
                    style={styles.input}
                />

                <Text style={styles.heading2}>CAPACITY</Text>
                <TextInput                   
                    onChangeText={text => handleChange(text, "venueCapacity")}
                    keyboardType='numeric'
                    placeholder="Venue capacity"
                    style={styles.input}
                />

                <Text style={styles.heading2}>FACILITIES</Text>
                <TextInput                 
                    onChangeText={text => handleChange(text, "venueFacilities")}
                    placeholder="Venue facilities"
                    style={styles.input}
                />

                <Text style={styles.heading2}>VENUE DESCRIPTION</Text>
                <TextInput
                    multiline
                    onChangeText={text => handleChange(text, "venueDesc")}
                    placeholder="Description about venue"
                    style={styles.input}
                />

                <TouchableOpacity
                    onPress={submitPost}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>  


                {/*<Text style={styles.heading2}>VENUE PHOTOS</Text>
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={{}}>
                        <Image style={styles.addphoto}  source={require('../assets/images/attachphoto.png')}></Image>
                    </TouchableOpacity> 
                </View> */}

            </View>
        </ScrollView>
        </ImageBackground>
    </View>

  )
}

export default AddVenue

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
        marginBottom: 20,
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
        marginTop: 30,
        borderColor: '#fff',
        borderWidth: 1
      },
      buttonText:{
        color: 'white',
        fontWeight: '500',
        fontSize: 20
      }
})