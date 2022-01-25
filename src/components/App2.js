import {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from './Button'
import Display from './Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default function App() {

  const [display, setDisplay] = useState({...initialState})

  function addDigit(n) {
    const clearDisplay = display.displayValue === '0'
      || display.clearDisplay

    if (n === '.' && !clearDisplay 
        && display.displayValue.includes('.')) {
      return
    }
    const currentValue = clearDisplay ? '' : display.displayValue
    const newDisplayValue = currentValue + n
    setDisplay(prevState => ({...prevState, displayValue: newDisplayValue, clearDisplay: false}))
  

    if (n != '.') {
      const newValue = parseFloat(newDisplayValue)
      const values = [...display.values]
      values[display.current] = newValue
      setDisplay(prevState => ({...prevState, values: values}))
    }
  }

  function cleanMemory() {
    setDisplay({...initialState})
  }

  function setOperation (operation) {
    if (display.current == 0) {
      setDisplay(prevState => ({...prevState, operation: operation, current: 1, clearDisplay: true}))
    } else {
      const equals = operation === '='
      console.log(display.operation);
      const values = [...display.values]
      console.log(values);
      try {
        values[0] = eval(`${values[0]}${display.operation}${values[1]}`)
        console.log(values);
      } catch (e) {
        values[0] = display.values[0]
      }

      values[1] = 0
      setDisplay(prevState => ({
        ...prevState, 
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      }))
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.View1}>
            <Display value={display.displayValue} />
        </View>
        <View style={styles.ViewContainer}>
            <View style={styles.View2}>  
                <Button label='7' onClick={addDigit}/>
                <Button label='8' onClick={addDigit}/>
                <Button label='9' onClick={addDigit}/>
                <Button label='4' onClick={addDigit}/>
                <Button label='5' onClick={addDigit}/>
                <Button label='6' onClick={addDigit}/>
                <Button label='1' onClick={addDigit}/>
                <Button label='2' onClick={addDigit}/>
                <Button label='3' onClick={addDigit}/>
                <Button label='0' onClick={addDigit}/>
                <Button label='.' onClick={addDigit}/>
                <Button label='=' onClick={setOperation}/>
            </View>

            <View style={styles.View3}>
                <Button label='DEL' operation onClick={cleanMemory}/> 
                <Button label='/' operation onClick={setOperation} />
                <Button label='*' operation onClick={setOperation}/>
                <Button label='-' operation onClick={setOperation}/>
                <Button label='+' operation onClick={setOperation}/>
            </View>
        </View>

        
       

      
      {/* <View style={styles.buttons}>
        
        <Button label='7' onClick={addDigit}/>
        <Button label='8' onClick={addDigit}/>
        <Button label='9' onClick={addDigit}/>
        <Button label='*' operation onClick={setOperation}/>
        <Button label='4' onClick={addDigit}/>
        <Button label='5' onClick={addDigit}/>
        <Button label='6' onClick={addDigit}/>
        <Button label='-' operation onClick={setOperation}/>
        <Button label='1' onClick={addDigit}/>
        <Button label='2' onClick={addDigit}/>
        <Button label='3' onClick={addDigit}/>
        <Button label='+' operation onClick={setOperation}/>
        <Button label='0' double onClick={addDigit}/>
        <Button label='.' onClick={addDigit}/>
        <Button label='=' operation onClick={setOperation}/>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  buttonComand: {
    flex: 1
  },
  View1: {
      height: Dimensions.get('window').height / 3,
      
  },
  ViewContainer: {
      height: (Dimensions.get('window').height / 3) * 2,
      width: Dimensions.get('window').width,
      flexDirection: 'row',
  },
  View2: {
        width: (Dimensions.get('window').width / 4) * 3,
        flexDirection: 'row',
        flexWrap: 'wrap'
  },
  View3: {
      width: Dimensions.get('window').width / 4,
  }
});
