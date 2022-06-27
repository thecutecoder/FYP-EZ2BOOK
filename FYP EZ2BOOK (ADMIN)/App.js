import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen'
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import VenueScreen from './screens/VenueScreen';
import AddVenueScreen from './screens/AddVenueScreen';
import UpdateVenueScreen from './screens/UpdateVenueScreen';
import BookingListScreen from './screens/BookingListScreen';
import UpdateBookingScreen from './screens/UpdateBookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Landing" component={LandingScreen} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: true}} name="Venue" component={VenueScreen} />
        <Stack.Screen options={{headerShown: true}} name="AddVenue" component={AddVenueScreen} />
        <Stack.Screen options={{headerShown: true}} name="UpdateVenue" component={UpdateVenueScreen} />
        <Stack.Screen options={{headerShown: true}} name="BookingList" component={BookingListScreen} />
        <Stack.Screen options={{headerShown: true}} name="UpdateBooking" component={UpdateBookingScreen} />
        <Stack.Screen options={{headerShown: true}} name="Profile" component={ProfileScreen} />
        <Stack.Screen options={{headerShown: true}} name="UpdateProfile" component={UpdateProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
