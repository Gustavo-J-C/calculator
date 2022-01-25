import React from 'react'
import {
    Button,
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
    } from 'react-native'

const style = StyleSheet.create({
    button: {
        fontSize: 30,
        height: Dimensions.get('window').height / 6,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        justifyContent: 'center',
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#fa8231',
        height: (Dimensions.get('window').height / 7.8),
        borderWidth: 0
    }
})

export default props => {
    const stylesButton = [style.button]
    if (props.operation) stylesButton.push(style.operationButton) 
    return (
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}