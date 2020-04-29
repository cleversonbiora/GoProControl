import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { colors } from '../assets/colors';
import LinearGradient from 'react-native-linear-gradient';

export default class ShutterButton extends Component {
    render() {
        return (
            <LinearGradient
              colors={["#333", "#1E1E1E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 5 }}
            >
            <View style={styles.outter}>
                <View  style={styles.inner}>
                    <FontAwesome style={styles.circle} icon={RegularIcons.circle} />
                </View>
            </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        color:colors.dark,
        fontFamily: "Gameplay"
    },
    inner: {
        backgroundColor: colors.background,
        padding:5,
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
        color:colors.red,
        fontSize:35,
        padding:5
    }
  });