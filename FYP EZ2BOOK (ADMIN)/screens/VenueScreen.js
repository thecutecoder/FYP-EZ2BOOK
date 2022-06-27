import { StyleSheet, Text, FlatList, TextInput, View, text} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Dimensions, 
    ImageBackground, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
    Image, 
    ScrollView } from 'react-native-web'
import {auth,database} from "../firebase";
import "firebase/firestore";


const Venue = ({navigation}) => {
        const [VenueList, setVenueList] = useState([]);
  
        useEffect(() => {
          getVenueList(VenueList);
        });
      
        const getVenueList = async () => {
          await database.collection("Venue")
            .get()
            .then((querySnapshot) => {
              let myData = [];
              querySnapshot.forEach((doc) => {
                const{
                  venueName,
                  venueAddress,
                  venueCapacity,
                  venueDesc,
                  venueFacilities,
                  postImg,
                } = doc.data();
                myData.push({
                    venueName: venueName,
                    venueAddress: venueAddress,
                    venueCapacity: venueCapacity,
                    venueDesc: venueDesc,
                    venueFacilities: venueFacilities,
                    postImg:  postImg,
                });
              });
              setVenueList(myData);
            })
            .catch((error) => {
              console.log("Error getting data: ", error);
              //console.log(doc.data);
            });
        };
      
        const Item = ({ venueName, venueAddress, venueCapacity, postImg }) => (
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('UpdateVenue', {venueName})}>
                    <View style= {styles.leftView}>
                        <Image style= {styles.itemImage} source={{uri : postImg}}/>
                    </View>
                    <View style= {styles.rightView}>
                        <Text style={styles.heading1}>{venueName}</Text>
                        <Text style={styles.text2}>{venueAddress}</Text>
                        <Text style={styles.text2}>{venueCapacity} pax</Text>
                        
                    </View>
                </TouchableOpacity> 
        );
      
        const renderItem = ({ item }) => (
          <Item 
            venueName ={item.venueName}
            venueAddress ={item.venueAddress}
            venueCapacity ={item.venueCapacity}
            postImg ={item.postImg} 
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
                    data={VenueList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.venueName}
                />            
            </ScrollView>
        <TouchableOpacity 
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate('AddVenue')}>
                <Image style={styles.floatingButton} source={require('../assets/images/add.png')} />
        </TouchableOpacity>

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
        width: '30%',
    },
    itemImage:{
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    rightView:{
        width: '70%',
        padding: 15
    },
    heading1:{
        fontSize: 18,
        fontWeight: 500,
        marginBottom: 5
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