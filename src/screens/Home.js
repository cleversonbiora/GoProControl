import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native'
import StatusService from '../services/StatusService';
import hero7 from "../assets/hero7.json"
import CommandService from '../services/CommandService';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:null,
            connected:0
        };
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus = () => {
        let counter = setInterval(this.load, 500);
    }

    componentDidMount(){
        this.handleStatus();
    }

    load = async () => {
        try {
            let status = await StatusService.get();
            this.setState({status,connected:1});
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

    changeMode(cmd){
        CommandService.mode(cmd);
    }

    render() {
        const {status,connected} = this.state;
        return (
            <ScrollView style={styles.outContainer}>
              <View style={styles.container}>   
                <Text style={styles.text}> {status ? status.status["8"] : 'Loading...'}</Text>
                <Text style={styles.text}> {status ? status.status["43"] : 'Loading...'}</Text>
                <Text style={styles.text}> {connected}</Text>
                <Button
                    onPress={() => {
                        this.trigger();
                    }}
                    title="Trigger"
                    />
                    <Button
                        onPress={() => {
                            this.changeMode(1);
                        }}
                        title="Photo"
                        />
                    <Button
                        onPress={() => {
                            this.changeMode(0);
                        }}
                        title="Video"
                        />
                    <Button
                        onPress={() => {
                            this.changeMode(2);
                        }}
                        title="TimeWarp"
                        />
              </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    outContainer: {
      backgroundColor: '#333'
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
        color:'#FFFFFF'
    }
  });
  