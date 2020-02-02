import React from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import {
  SafeAreaView,
  TextInput
} from 'react-native';

import RNSpeedometer from 'react-native-speedometer'

import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null,
    dangerDescription: "",
    risk: 0,
    dangers: [],
    timeo: 0,
    windspeed:0,
    value:0,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    )
    //this.fetchData();
  //this.fetchData();
    // this.fetchData();
  }



  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log("first json:")
        console.log(json)
        let time = new Date().getHours();
        let weatherVar = json.weather[0].main;
        let speed = json.wind.speed;        

        if ((weatherVar == 'Clear' && time >= 20) || (weatherVar == "Clear" && time <= 6)) weatherVar = 'Night';

        fetch(`http://nateabrown.pythonanywhere.com/data/${weatherVar}/${time}/${speed}`)
        .then(res => res.json())
        .then(json => {
            let Risk = json[0].Risk;
            Risk = Risk.toFixed(3);
            console.log(`risk is ${Risk}`)
            console.log(json);
            let Descriptors = json[0].Descriptors;
            let baseDescription = `Your danger coefficient is ${Risk}. Fortunately, there appears to be little danger. Drive safely!`;
            if (Risk >= .1) {
              let len = Descriptors.length;
              if (len == 1) {
                baseDescription = `Your danger coefficient is ${Risk}. Looks like you need to watch out for ${Descriptors[0]}.`;
              }
              if (len==2) {
                baseDescription = `Your danger coefficient is ${Risk}. Please watch out for ${Descriptors[0]} and ${Descriptors[1]}.`;
              }
              if (len==3) {
                baseDescription = `Your danger coefficient is ${Risk}. Looks like you need to watch out for ${Descriptors[0]}, ${Descriptors[1]}, and ${Descriptors[2]}.`;
              }
            }
            console.log(`Base description is ${baseDescription}`);
            
            this.setState({
              risk:Risk,
              dangerDescription:baseDescription,

            });

            //set a timeout to show the statefarm loading screen
            setTimeout(function(){ 1+1 }, 2500);
        });

        this.setState({
          temperature: json.main.temp,
          weatherCondition: weatherVar,
          timeo:time,
          windspeed: speed,
          isLoading: false,
        });
      });
  }

// fetchData() {
//   console.log("What is the weather condition?");
//   console.log(this.weatherCondition);
// }

  // fetchData() {
  //   fetch(
  //     `http://nateabrown.pythonanywhere.com/data/${this.weatherCondition}/${this.timeo}/${this.windspeed}`
  //   )
  //     .then(res => res.json())
  //     .then(json => {
  //       console.log(json);
  //       console.log(this.weatherCondition);
  //       let dangers = json[0].Descriptors;
  //       console.log(dangers);
  //       let dangerNumber = json[0].Risk;
  //       console.log("Trying dangerNumber");
  //       console.log(dangerNumber);
  //       console.log(json.keys());
  //       let tempDescript = "Looks like it's pretty safe out there today!";
  //       if (dangerNumber >= .1) {
  //           console.log("success");
  //           tempDescript = "There's a higher than usual likelihood of crashes. Look out for "  
  //           if (dangers.length == 1) {
  //             tempDescript += dangers[0] += ".";
  //           }
  //           if (dangers.length == 2) {
  //             tempDescript += (dangers[0] + " and " + dangers[1]);
  //           }
  //           if (dangers.length == 3) {
  //             tempDescript += (dangers[0] + ", " + dangers[1] + ", and " + dangers[2]);
  //           }
  //       }
  //           console.log("Trying to print tempdescript");
  //           console.log(tempDescript);
  //           this.setState({
  //             dangerNumber: json.Risk,
  //             dangers: json.Descriptors,
  //             dangerDescription: tempDescript,
  //             isLoading: false, 
  //       });
  //     });
  // }


  render() {
    const { isLoading, weatherCondition, temperature, dangerDescription, risk } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.backgroundImage}>
            <Image source={require('./assets/splash.png')}
    style={styles.backgroundImage}>
    
    { this.props.children}
    
    </Image>
          </View>
        ) : (
          //<View>
          <Weather weather={weatherCondition} temperature={temperature} description={dangerDescription} riskVal={risk}/>
        //   <SafeAreaView style={styles.ticker}>
        //   <RNSpeedometer value={this.risk} size={200}/>
        //  </SafeAreaView>
          //</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  // ticker: {
  //   flex:1,
  // },
  // loadingContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#FFFDE4'
  // },
  
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
// },
});