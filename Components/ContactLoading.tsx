import {
  Alert,
  Button,
  FlatList,
  Linking,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';

const ContactLoading = () => {
  const [contacts, setContacts] = useState([]);
  console.log(Contacts);
  useEffect(() => {
    loadContacts();
  }, []);

  
  const loadContacts = async () => {
    if (Platform.OS === 'android') {
      try {
       
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          
        );
        console.log(result)
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
          fetchContacts();

        } else {
          console.log('Permission denied');
        }
        
      } catch (error) {
        console.error('Permission request error:', error);
      }
    } else {
      fetchContacts();
    }
  };



const fetchContacts = async () => {
    try {
        const contactList = await Contacts.getAll();
        console.log('List:', contactList);
        setContacts(contactList);
    } catch (err) {
        console.warn('Error loading contacts:', err);
    }
};


  return (
    <View>
      <Button title="Load Contacts" onPress={() => loadContacts()} />
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={({item}) => (
          <Text>
            {item.givenName} {item.familyName}
          </Text>
        )}
      />
    </View>
  );
};

export default ContactLoading;
