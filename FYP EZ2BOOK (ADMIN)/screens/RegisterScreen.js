import React, {Component, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert
} from 'react-native'
import { auth, database } from "../firebase";
import 'firebase/firestore';
import * as firebase from 'firebase';



export default class RegisterScreen extends Component {
    constructor() {
      super();
      this.state = {
        displayName: '',
        email: '', 
        password: '',
        staffNo: '',
        //Kulliah: '',
        //kulliyyah: '',
        isLoading: false
      }
    }
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
    registerUser = (email,password) => {
      const firestore = firebase.firestore;
  
      if(this.state.email === '' && this.state.password === '') {
        Alert.alert('Enter details to signup!')
      } else {
        this.setState({
          isLoading: true,
        })
  
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
         res.user.updateProfile({
          isLoading: false,
          displayName: this.state.displayName,
         })
        console.log ('User registered')
       
        database.collection('AdminReg').add({
          userId:auth.currentUser.uid,
          staffNo :this.state.staffNo,
          
        }).catch(error=> alert(error.message));
          this.props.navigation.navigate('Login')
         
        }
      
       
    ).catch(error=> alert(error.message));
      }
    }
    render() {
  
      return (
        <View style={styles.MainView}>
            <View style={styles.TopView}>
            <Image style={styles.image} source={require('../assets/images/logosample.png')} />
        </View>
      
        <ScrollView style={styles.BottomView}>
            <Text style={styles.Heading}>
                Register New Account
            </Text>
        <View style={styles.formContainer}>
            <TextInput
                placeholder="Name"
                value={this.state.displayName}
                onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                style={styles.input}
            />

            <TextInput
                placeholder="Staff No"
                value={this.state.staffNo}
                onChangeText={(val) => this.updateInputVal(val, 'staffNo')}
                style={styles.input}
            />

            <TextInput
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')}
                placeholder="Enter Email"
                style={styles.input}
            />


            <TextInput
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
                placeholder="Create Password"
                style={styles.input}
            />

            <TouchableOpacity
                onPress={() => this.registerUser(this.state.email,this.state.password)}
                style={styles.button}>
                <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}
                  style={styles.buttonOutline}>
                  <Text style={styles.buttonOutlineText}>LOGIN TO ACCOUNT</Text>
              </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.TouchableOpacity}
        onPress={() => this.props.navigation.navigate('Landing')}>
            <Image style={styles.floatingButton} source={require('../assets/images/home.png')} />
      </TouchableOpacity>
    </View>
      );
    }
  }
  const styles = StyleSheet.create({
    MainView:{
      flex:1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5f9ea0'
    },
    TopView:{
      width:'100%',
      height: '55%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    BottomView:{
      width: '100%',
      height: '55%',
      backgroundColor: '#f2f3f4',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40
    },
    image: {
      width: 350, 
      height: 250,
    },
    Heading:{
      color: '#000',
      fontSize: 22,
      fontWeight: '500',
      marginTop: 40,
      marginLeft: 35
    },
    formContainer:{
      marginHorizontal: 30,
      marginVertical: 30
    },
    input :{
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 8,
      marginBottom: 15,
      borderColor: '#e0e0e0',
      borderWidth: 1
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
  },
  buttonOutline:{
    marginTop: 10,
    alignItems: 'center'
},
buttonOutlineText:{
    color: '#000',
    fontWeight: '500',
    fontSize: 15
},
TouchableOpacity: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 20,
    top: 20,
    justifyContent: 'center'
},
floatingButton:{
    resizeMode: 'contain',
    width: 40,
    height: 40
}

});
