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
  ActivityIndicator
} from "react-native"
import { auth, database } from "../firebase";



export default class LoginScreen extends Component {

    constructor() {
      super();
      this.state = { 
        email: '', 
        password: '',
        isLoading: false
      }
    }
  
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
  
    userLogin = () => {
      if(this.state.email === '' && this.state.password === '') {
        Alert.alert('Enter details to signin!')
      } else {
        this.setState({
          isLoading: true,
        })
        
        auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({
            isLoading: false,
            email: '', 
            password: ''
          })
          this.props.navigation.navigate('Home')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      }
    }
  
    render() {
      if(this.state.isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
      }    
      return (
        <View style={styles.MainView}>
        <View style={styles.TopView}>
          <Image style={styles.image} source={require('../assets/images/logosample.png')} />
        </View>
        <View style={styles.BottomView}>
          <Text style={styles.Heading}>
            Login Account
          </Text>
          <View style={styles.formContainer}>
              <TextInput
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')} 
                    placeholder="Enter email"       
                    style={styles.input}
              />

              <TextInput
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                    placeholder="Password"
                    style={styles.input}
              />
        
              <TouchableOpacity
                  onPress={() => this.userLogin()}
                  style={styles.button}>
                  <Text style={styles.buttonText}>LOG IN</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}
                  style={styles.buttonOutline}>
                  
                  <Text style={styles.buttonOutlineText}>REGISTER ACCOUNT</Text>
              </TouchableOpacity>
          </View>
        </View>
  
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
      height: '45%',
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
      marginTop: 30
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












/*
const Login = ({navigation}) => {
    
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }

  return (
    <View style={styles.MainView}>
      <View style={styles.TopView}>
        <Image style={styles.image} source={require('../assets/images/logosample.png')} />
      </View>
      <View style={styles.BottomView}>
        <Text style={styles.Heading}>
          Login Account
        </Text>
        <View style={styles.formContainer}>
            <TextInput
                placeholder="Enter email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />

            <TouchableOpacity
                onPress={{}}
                style={styles.button}>
                
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.buttonOutline}>
                
                <Text style={styles.buttonOutlineText}>REGISTER ACCOUNT</Text>
            </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.TouchableOpacity}
        onPress={() => navigation.navigate('Landing')}>
            <Image style={styles.floatingButton} source={require('../assets/images/home.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default Login

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
      height: '45%',
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
      marginTop: 30
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

})*/