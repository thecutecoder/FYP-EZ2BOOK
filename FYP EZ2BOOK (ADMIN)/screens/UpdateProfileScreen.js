import React, { useState, useEffect } from "react";
import { 
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  SafeAreaView
} from "react-native";
import {auth, database} from "../firebase"

export default function UpdateProfileScreen ({navigation}){
    const [ staffNo, setstaffNo] = useState('');
    const [ email, setEmail] = useState('');
    const [ DisplayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');

    const [values, setValues] = useState({
        email: "",
        password: "",
    })

    const userId = auth.currentUser.id;
    useEffect(() => {
        displayUser();
    }, []);
    

    const changeEmail = () =>{
        if(email === '')
        {Alert.alert('Update Error','Enter your email to update')}
        else { auth.currentUser.updateEmail(email).then (() => { 
            alert("Email updated");
            navigation.navigate('Home');
            console.log("Email updated");
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


    const displayUser = async () => {
        const list=[];
        await  database
          .collection('AdminReg').where('userId', '==' , auth.currentUser.uid)
          .get()
          .then((querySnapshot) => {querySnapshot.forEach((doc) =>{
            if(auth.currentUser.id == userId){
    
            const {
              userId,
              DisplayName,
              email,
              staffNo,
            }=doc.data();
            list.push({
              DisplayName:DisplayName,
              email:email,
              staffNo:staffNo,
            })
            setDisplayName(DisplayName)
            setstaffNo(staffNo)
            setEmail(email)
            console.log(email)
          }
          })
            
            
          });
    }


    return (
        <SafeAreaView style={styles.MainView}>
        <ScrollView style={{width: '100%', paddingBottom: 30}}>
            <View style={styles.TopView}>
              <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
              <Text style={styles.text1}>{auth.currentUser.email}</Text>
            </View>
  
            <View style={styles.BottomView}>
                <Text style={styles.textHeader}>NAME</Text>
                <Text style={styles.description}>{auth.currentUser.displayName}</Text>
                <Text style={styles.textHeader}>STAFF ID</Text>
                <Text style={styles.description}>{staffNo}</Text>
                <Text style={styles.textHeader}>EMAIL</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={auth.currentUser.email}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TouchableOpacity style={styles.buttonUpdate}
                   onPressIn={()=> changeEmail()}>
                <Text style={styles.buttonText}>Update</Text>  
                </TouchableOpacity>

                <Text style={styles.textHeader}>PASSWORD</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="New Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.buttonUpdate}
                    onPressIn={()=> changePassword()}>
                    <Text style={styles.buttonText}>Update</Text>  
                </TouchableOpacity> 
                
  
  
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    MainView:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cfe1e2',
        paddingBottom: 30
      },
      TopView:{
        width:'100%',
        height: '30%',
        backgroundColor: '#5f9ea0',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 3,
        borderColor: "white",
        marginBottom:15,
        marginTop:20
      },
      text1:{
        color: '#fff',
        fontSize: 18,
        fontWeight: '400'
      },
    
      BottomView:{
        width: '100%',
        height: '70%',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30,
      },
      buttonUpdate: {
        width: '70%',
        backgroundColor: "#64E647",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 25
      },
      buttonDelete: {
        width: '80%',
        height: '10%',
        backgroundColor: 'rgba(255, 0, 0, 0.69)',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 30
      },
      itemText:{
        color: '#000',
        fontSize: 18,
        fontWeight: '600'
      },
      textHeader: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 3
      },
      description:{
        fontSize:19,
        color: "#696969",
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 25
      },
      buttonText:{
        fontSize:16,
        color: "#000",
        textAlign: 'center',
        fontWeight: '600',
      },
inputStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: 10,
    width: '70%',
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f3f4'
},
});