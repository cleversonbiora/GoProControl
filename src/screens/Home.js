import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Button, TouchableOpacity, PermissionsAndroid } from 'react-native'
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import StatusService from '../services/StatusService';
import hero7 from "../assets/hero7.json"
import CommandService from '../services/CommandService';
import { colors } from '../assets/colors';
import ShutterButton from '../components/ShutterButton';
import ModeButton from '../components/ModeButton';
//import wifi from 'react-native-android-wifi';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:null,
            connected:0,
            icon: SolidIcons.cog
        };
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus = () => {
        let counter = setInterval(this.load, 500);
    }

    componentDidMount(){
        this.handleStatus();
        // this.checkPermission();
        // wifi.getSSID((ssid) => {
        //     this.setState({network:ssid});
        //   });

    }

    // async checkPermission(){
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //             'title': 'Wifi networks',
    //             'message': 'We need your permission in order to find wifi networks'
    //             }
    //         )
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("Thank you for your permission! :)");
    //         } else {
    //             console.log("You will not able to retrieve wifi available networks list");
    //         }
    //     } catch (err) {
    //         console.warn(err)
    //     }
    // }

    load = async () => {
        try {
            let status = await StatusService.get();
            let icon;
            switch (status.status["43"]) {
                case 0:
                    icon = SolidIcons.video
                    break;
                case 1:
                    icon = SolidIcons.camera
                    break;
                case 2:
                    icon = SolidIcons.clock
                    break;
                default:
                    icon = SolidIcons.cog
                    break;
            }
            console.log(status);
            this.setState({status,connected:1,icon});
        } catch (error) {
            this.setState({connected:2});
        }
    }

    trigger(){
        const {status} = this.state;
        if(status.status["8"] == 0)
            CommandService.shutter(1);
        else
            CommandService.shutter(0);
    }

    trigger(){
        const {status} = this.state;
        if(status.status["8"] == 0)
            CommandService.shutter(1);
        else
            CommandService.shutter(0);
    }

    changeMode(){
        const {status} = this.state;
        switch (status.status["43"]) {
            case 1:
                CommandService.mode(2);
                break;
            case 2:
                CommandService.mode(0);
                break;
            default:
                CommandService.mode(1);
                break;
        }
    }

    render() {
        const {status,connected,icon} = this.state;
        return (
            <ScrollView style={styles.outContainer}>
              <View style={styles.container}>   
                <View style={styles.lcd}>
                    <FontAwesome style={styles.awesome} icon={icon} />
                    <Text style={styles.text}> {status ? status.status["8"] : 'Loading...'}</Text>
                    <Text style={styles.text}> {status ? status.status["43"] : 'Loading...'}</Text>
                    <Text style={styles.text}> {connected}</Text>
                </View>
                <TouchableOpacity 
                        onPress={() => {
                            this.trigger();
                        }}>
                    <ShutterButton/>
                </TouchableOpacity>
                
                <TouchableOpacity 
                        onPress={() => {
                            this.changeMode();
                        }}>
                    <ModeButton/>
                </TouchableOpacity>
                <Text style={{color:'#FFF'}}> {JSON.stringify(status)}</Text>
              </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    outContainer: {
      backgroundColor: colors.background
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 10
    },
    buttonContainer: {
      margin:30,
      width:"80%"
    },
    text:{
        color:colors.dark,
        fontFamily: "Gameplay"
    },
    lcd: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:colors.lcd,
        padding:10
    },
    awesome:{
        color:colors.dark,
    }
  });
  