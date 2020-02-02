import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { weatherConditions } from '../utils/WeatherConditions';
import { Component } from 'react';
import {
  SafeAreaView,
  TextInput
} from 'react-native';

import RNSpeedometer from 'react-native-speedometer'

const Weather = ({ weather, temperature, description, riskVal }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        // { backgroundColor: weatherConditions[weather].color }
      ]}
    >

     <LinearGradient
          colors={weatherConditions[weather].color}
          style={{ flex: 1, alignItems:"center"}}>
    

      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={100}
          name={weatherConditions[weather].icon}
          color={'#9dd1e1'}
        />
        <Text style={styles.tempText}>{"  " + (temperature*(9/5) + 32).toFixed(1)}˚</Text>
      </View>
      <SafeAreaView style={styles.speedy}>
          <RNSpeedometer value={100-Math.ceil(riskVal*100)} size={200} 
          labels = {[
    {
      name: 'Stop yo car. Take cover.',
      labelColor: "#ffffff",
      activeBarColor: '#061014',
    },
    {
      name: 'Use utmost caution.',
      labelColor: "#ffffff",
      activeBarColor: '#1e5162',
    },
    {
      name: 'Be very observant.',
      labelColor: "#ffffff",
      activeBarColor: '#3692b0',
    },
    {
      name: 'Be extra watchful.',
      labelColor: "#ffffff",
      activeBarColor: '#4fabc9',
    },
    {
      name: 'Take slightly more care.',
      labelColor: "#ffffff",
      activeBarColor: '#9dd1e1',
    },
    {
      name: "The outlook is good!",
      labelColor: "#ffffff",
      activeBarColor: '#ebf6f9',
    },
 ]}
          />
          
        </SafeAreaView>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>
          {description}
        </Text>
        <Text style={styles.smalltitle}>
          Made with our Customers in Mind™
        </Text>
      </View>
      </LinearGradient>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //paddingLeft: 27,
    //paddingRight: 27,
    marginHorizontal:27,
    marginBottom: 22
  },
  title: {
    fontSize: 40,
    color: '#fff',
    textAlign: "center",
    lineHeight:41,
    fontWeight:"bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 24,
    color: '#fff',
    textAlign: "center"
    //justifyContent: 'flex-end',
  },
  smalltitle: {
    fontSize: 14,
    color:"#ccc",
    textAlign:"center",
    marginTop:20
  },
  speedy: {
    flex:1,
    
  }
});

export default Weather;