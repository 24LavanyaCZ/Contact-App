import {
    Button,
    FlatList,
    PermissionsAndroid,
    Platform,
    Text,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Contacts from 'react-native-contacts';
  
  const ContactLoading = () => {

    const [contacts, setContacts] = useState([]);
    console.log(Contacts)
    useEffect(() => {
      loadContacts();
    }, []);
  
    const openAppSettings = () => {
      Alert.alert(
        'Permission Required',
        'Contacts access is permanently denied. Please enable it in the app settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    };
    const loadContacts = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts Permission',
              message: 'This app requires access to your contacts.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }
          );
    
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Contacts permission granted');
            fetchContacts();
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.warn('Permission set to NEVER ASK AGAIN');
            alert(
              'Contacts permission is permanently denied. You need to enable it manually from app settings.'
            );
            openAppSettings()
          } else {
            console.warn('Contacts permission denied');
          }
        } catch (error) {
          console.error('Permission request error:', error);
        }
      } else {
        fetchContacts(); 
      }
    };
    
const fetchContacts = async()=>{
  try{
    let contactList = await Contacts.getAll()
    setContacts(contactList)
    console.log("List",contactList)
    console.log(Contacts)
  }
  catch(err) {
    console.warn('Error loading contacts', err); 
  }
}

    return (
      <View>
        <Button title="Load Contacts" onPress={()=>loadContacts()} />
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.recordID}
          renderItem={({ item }) => (
            <Text>{item.givenName} {item.familyName}</Text>
          )}
        /> 
        
      </View>
    );
  };
  
  
  export default ContactLoading;

  