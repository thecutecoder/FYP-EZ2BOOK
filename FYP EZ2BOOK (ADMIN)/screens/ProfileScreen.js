import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity, 
  ScrollView,
  Text,
  TextInput,
  SafeAreaView
} from 'react-native';
import {auth,database} from "../firebase";
import "firebase/firestore";
import * as firebase from 'firebase';

export default function ProfileScreen({navigation}) {
    const [ staffNo, setstaffNo] = useState('');
    const [ DisplayName, setDisplayName] = useState('');
    const [ email, setEmail] = useState('');
    

    const userId = auth.currentUser.id;
    useEffect(() => {
        displayUser();
    }, []);
  
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
          Email,
          staffNo,
        }=doc.data();
        list.push({
          DisplayName:DisplayName,
          Email:Email,
          staffNo:staffNo,
        })
        setDisplayName(DisplayName)
        setstaffNo(staffNo)
        setEmail(Email)
        console.log(Email)
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
              <Text style={styles.description}>{auth.currentUser.email}</Text>
              <Text style={styles.textHeader}>PASSWORD</Text>
              <Text style={styles.description}>******</Text>
              
            
            <TouchableOpacity style={styles.buttonUpdate} onPress={() => navigation.navigate('UpdateProfile')}>
                <Text style={styles.buttonText}>UPDATE PROFILE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDelete} onPress={() => navigation.navigate('Venue')}>
                <Text style={styles.buttonText}>DELETE PROFILE</Text>
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
    width: '60%',
    height: '10%',
    backgroundColor: "#64E647",
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 15
  },
  buttonDelete: {
    width: '60%',
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
    fontSize:18,
    color: "#000",
    textAlign: 'center',
    fontWeight: '600',
  }
});






/*export default class ProfileScreen extends Component {
  
  render() {
    return (
      <View style={{alignItems: 'center', marginTop: 80, marginBottom: 30 }}>
          <ScrollView>
            <Text style={styles.textHeader}>Contact Us</Text>
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}></View>
            <Text style={styles.textHeader}>ADDRESS</Text>
            <Text>Kulliyyah of Islamic Revealed  {"\n"} 
                    Knowledge Center and  {"\n"}
                    Human Sciences (IRKHS),  {"\n"}
                    International Islamic University Malaysia (IIUM), {"\n"} 
                    53100 Gombak,
                    Selangor
            </Text>
            <Text style={styles.textHeader}>PHONE NUMBER</Text>
            <Text>03-61965053</Text>
            <Text style={styles.textHeader}>FEEDBACK FORM</Text>
              <TextInput 
                style={styles.input}
                placeholder="Email"
              />   
              <TextInput
                 style={styles.bio}
                 placeholder="Feedback"
                 multiline={true}
                 numberOfLines={4}
              /> 
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#FFE333",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonUpdate: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#64E647",
  },

   buttonDelete: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#F95757",
  },
  textHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 2,
    marginTop: 10,

  },
  input: {
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#fff',
    width:'90%',
    padding:20,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    marginBottom:20,
  },
  bio: {
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#fff',
    width:'90%',
    padding:20,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    marginBottom:20
    },
});*/
