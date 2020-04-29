import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { colors } from '../assets/colors';

export default class ModeButton extends Component {
    render() {
        return (
            <View style={styles.outter}>
                <View  style={styles.inner}>
                    <FontAwesome style={styles.circle} icon={SolidIcons.powerOff} />
                    <Text>mode</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        color:colors.dark
    },
    inner: {
        backgroundColor: colors.background,
        paddingVertical:5,
        paddingHorizontal:15,
        borderColor:'#0E0E0E',
        borderRadius:5,
        borderWidth:2
    },
    outter: {
        backgroundColor: colors.background,
        padding:5,
        margin: 2,
    },
    circle:{
        backgroundColor: colors.background,
        color:colors.dark,
        fontSize:25,
        padding:5
    }
  });