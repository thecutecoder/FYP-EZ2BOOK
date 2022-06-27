import { StyleSheet, Text, TextInput, View, text} from 'react-native'
import React, {useState} from 'react'
import { Button, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from 'react-native-web'
import { SafeAreaView } from 'react-native-safe-area-context'
import {auth,database} from "../firebase";
import "firebase/firestore";


const Home = ({navigation}) => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const SignOutUser = () => {
    signOut (authentication)
    .then((re) => {
      setIsSignedIn(false)
      navigation.navigate('Login')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
      <SafeAreaView style={styles.MainView}> 
          <View style={styles.TopView}>
            <Text style={styles.Heading}>Hi {auth.currentUser.displayName}! {'\n'}Welcome to EZ2BOOK</Text>

              <TouchableOpacity
                style={styles.signout}
                onPress={() => navigation.navigate('Login')}>
                <Image style={styles.signoutButton} source={require('../assets/images/signout.png')} />
              </TouchableOpacity>

          </View>

          <View style={styles.BottomView}>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Venue')}>
              <View style= {styles.leftView}>
                <Image style= {styles.itemImage} source={require('../assets/images/venue.png')}/>
              </View>
              
              <View style= {styles.rightView}>
                <Text style={styles.itemText}>LIST OF VENUES</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AddVenue')}>
              <View style= {styles.leftView}>
                <Image style= {styles.itemImage} source={require('../assets/images/addvenue.png')}/>
              </View>
              
              <View style= {styles.rightView}>
                <Text style={styles.itemText}>ADD NEW VENUE</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('BookingList')}>
              <View style= {styles.leftView}>
                <Image style= {styles.itemImage} source={require('../assets/images/booking.png')}/>
              </View>
              
              <View style= {styles.rightView}>
                <Text style={styles.itemText}>LIST OF BOOKING</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Profile')}>
              <View style= {styles.leftView}>
                <Image style= {styles.itemImage} source={require('../assets/images/profile.png')}/>
              </View>
              
              <View style= {styles.rightView}>
                <Text style={styles.itemText}>PROFILE</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemLogOut} onPress={() => navigation.navigate('Login')}>
              <View style= {styles.leftView}>
                <Image style= {styles.itemImage} source={require('../assets/images/signout2.png')}/>
              </View>
              
              <View style= {styles.rightView}>
                <Text style={styles.itemText}>LOG OUT</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        
      </SafeAreaView>
      
  )
}

export default Home

const styles = StyleSheet.create({
    MainView:{
      flex:1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cfe1e2'
    },
    TopView:{
      width:'100%',
      height: '20%',
      backgroundColor: '#5f9ea0',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      padding: 30,
      justifyContent: 'center'
    },
    Heading:{
      color: '#fff',
      fontSize: 20,
      fontWeight: '600'
    },
    signout:{
      position: 'absolute',
      width: 55,
      height: 55,
      right: 20,
      justifyContent: 'center'
    },
    signoutButton:{
      resizeMode: 'contain',
      width: 55,
      height: 55
    },

    BottomView:{
      width: '100%',
      height: '80%',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 30
    },
    item: {
      width: '90%',
      height: '13%',
      marginTop: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderColor: '#E6E6E6',
      borderWidth: 1,
      borderRadius: 5,
      shadowColor: '#6E6E6E',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      flexDirection: 'row'
    },
    itemLogOut: {
      width: '90%',
      height: '13%',
      marginTop: 15,
      backgroundColor: 'rgba(255, 0, 0, 0.6)',
      borderWidth: 1,
      borderRadius: 5,
      shadowColor: '#6E6E6E',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      flexDirection: 'row'
    },
      leftView:{
      width: '20%',
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center'
    },
      rightView:{
      width: '80%',
      justifyContent: 'center',
      paddingLeft: 10
    },
      itemImage:{
      width: 35,
      height: 35,
    },
    itemText:{
      color: '#000',
      fontSize: 18,
      fontWeight: '600'
    }

    


})