import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ContactLoading from './Components/ContactLoading'

const App = () => {

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ContactLoading/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f4f8f8",
  },
})

