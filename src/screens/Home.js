import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Button, TouchableOpacity, PermissionsAndroid, 
    Alert, Dimensions } from 'react-native'
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import StatusService from '../services/StatusService';
import hero7 from "../assets/hero7.json"
import CommandService from '../services/CommandService';
import { colors } from '../assets/colors';
import ShutterButton from '../components/ShutterButton';
import ModeButton from '../components/ModeButton';
import wifi from 'react-native-android-wifi';
import { timer } from '../helpers/StringFormatter';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:null,
            connected:0,
            icon: SolidIcons.spinner,
            network:'',
            ip:'',
            tempCount:0
        };
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus = () => {
        let counter = setInterval(this.load, 500);
    }

    componentDidMount(){
        this.handleStatus();
        this.checkPermission();
        // wifi.findAndConnect('GoPro Hero7', 'q64-TVv-XNk', (found) => {
        //     if (found) {
        //       console.log("wifi is in range");
        //     } else {
        //       console.log("wifi is not in range");
        //     }
        //   });

    }

    async checkPermission(){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                'title': 'Wifi networks',
                'message': 'We need your permission in order to find wifi networks'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Thank you for your permission! :)");
            } else {
                console.log("You will not able to retrieve wifi available networks list");
            }
        } catch (err) {
            console.warn(err)
        }
    }

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
            this.setState({connected:2, icon: SolidIcons.info});
        }
        wifi.getSSID((ssid) => {
            this.setState({network:ssid});
        });
        wifi.getIP((ip) => {
            this.setState({ip});
        });
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
        if(status.status["8"] == 0){
            this.setState({tempCount:status.status["38"]});
            CommandService.shutter(1);
        }else
            CommandService.shutter(0);
    }

    powerOff(){
        Alert.alert(
            'Power off?',
            '',
            [
              {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => CommandService.shutdown()},
            ]
          );
            
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
        const {status,connected,icon,network,ip, tempCount} = this.state;
        let bateryStatus;
        if(connected == 1){
            if(status.status["1"] == 0)
                bateryStatus = SolidIcons.times
            else
                switch (status.status["2"]) {
                    case 4:
                        bateryStatus = SolidIcons.bolt
                        break;
                    case 3:
                        bateryStatus = SolidIcons.batteryFull
                        break;
                    case 2:
                        bateryStatus = SolidIcons.batteryHalf
                        break;
                    case 1:
                        bateryStatus = SolidIcons.batteryQuarter
                        break;
                    default:
                        bateryStatus = SolidIcons.batteryEmpty
                        break;
                }
        }
        return (
            <ScrollView style={styles.outContainer}>
              <View style={styles.container}>   
                <View style={styles.header}>
                    <View style={styles.lcd}>
                        <FontAwesome style={styles.awesome} icon={icon} />
                        {connected == 0 &&
                            <Text style={styles.text}> {'Connecting...'}</Text>
                        }
                        {connected == 1 &&
                            <>
                                {status.status["43"] == 1 &&
                                    <Text style={{...styles.text, fontSize:30}}>{status.status["38"]}</Text>
                                }
                                {status.status["43"] == 0 &&
                                    <>
                                    {status.status["8"] == 1 &&
                                        <Text style={{...styles.text, fontSize:30}}>{timer(status.status["13"])}</Text>
                                    }
                                    {status.status["8"] == 0 &&
                                        <Text style={{...styles.text, fontSize:30}}>{status.status["39"]}</Text>
                                    }
                                </>
                                }
                                {status.status["43"] == 2 &&
                                <>
                                    {status.status["8"] == 1 &&
                                        <Text style={{...styles.text, fontSize:30}}>{status.status["38"] - tempCount}</Text>
                                    }
                                    {status.status["8"] == 0 &&
                                        <Text style={{...styles.text, fontSize:30}}>{status.status["38"]}</Text>
                                    }
                                </>
                                }
                                <FontAwesome style={styles.awesome} icon={bateryStatus} />
                            </>
                        }
                        {connected == 2 &&
                            <Text style={styles.text}> {'Connection Failed'}</Text>
                        }
                        <Text style={styles.text}> {network}</Text>
                    </View>
                    <View style={styles.commands}>
                        <TouchableOpacity 
                                onPress={() => {
                                    this.trigger();
                                }}>
                            <ShutterButton/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                                style={{marginTop:10}}
                                onLongPress={() => {
                                    this.powerOff();
                                }}
                                onPress={() => {
                                    this.changeMode();
                                }}>
                            <ModeButton/>
                        </TouchableOpacity>
                    </View>

                </View>
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
    header: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      justifyContent: 'flex-start',
      paddingTop: 10,
    },
    commands: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
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
        padding:10,
        width: Dimensions.get('screen').width - 120,
        margin:5
    },
    awesome:{
        color:colors.dark,
        fontSize:30,
        padding:5
    }
  });
  