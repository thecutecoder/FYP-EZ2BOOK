import { StyleSheet, Text, TextInput, View, text} from 'react-native'
import React, {useState} from 'react'
import { Button, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView } from 'react-native-web'

const Landing = ({navigation}) => {

  return (
    <View style={styles.MainView}>

        <View style={styles.TopView}>
          <Image style={styles.image} source={require('../assets/images/logosample.png')}  />
        </View>

      <ScrollView style={styles.BottomView}>
        <Text style={styles.Heading}>
          Venue booking {'\n'}process is now easier!
        </Text>
        
        <View style={styles.formContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}>
                
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.buttonOutline}>
                
                <Text style={styles.buttonOutlineText}>REGISTER ACCOUNT</Text>
            </TouchableOpacity>
      
            
        </View>
      </ScrollView>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    MainView:{
      flex:1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f3f4'
    },
    TopView:{
      width:'100%',
      height: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    BottomView:{
      width: '100%',
      height: '50%',
      backgroundColor: '#5f9ea0',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 240,
      borderTopWidth: 20,
      borderTopColor: '#004953'
    },
    image: {
      marginTop: 0,
      marginBottom: 30,
      width: 450, 
      height: 250,
    },
    Heading:{
      color: '#fff',
      fontSize: 18,
      marginVertical: 120,
      marginLeft: 35,
    },
    formContainer:{
      marginHorizontal: 30,
      marginBottom: 20
    },
  button:{
    backgroundColor: '#004953',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 0,
    borderColor: '#000',
    borderWidth: 0.1
  },
  buttonText:{
    color: 'white',
    fontWeight: '500',
    fontSize: 18
  },
  buttonOutline:{
    marginTop: 10,
    alignItems: 'center'
},
buttonOutlineText:{
    color: '#fff',
    fontWeight: '400',
    fontSize: 15
},

})