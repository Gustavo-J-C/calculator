import {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from './src/components/Button'
import Display from './src/components/Display'

import App2 from './src/components/App2'

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
       const values = [...display.values]
       try {
         values[0] = eval(`${values[0]}${display.operation}${values[1]}`)
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
      <View style={styles.display}>
        <Display value={display.displayValue} />
      </View>
      <View style={styles.ViewContainer}>
        <View style={styles.buttons}>  
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
        <View style={styles.comands}>
          <Button label='DEL' operation onClick={cleanMemory}/> 
          <Button label='/' operation onClick={setOperation} />
          <Button label='*' operation onClick={setOperation}/>
          <Button label='-' operation onClick={setOperation}/>
          <Button label='+' operation onClick={setOperation}/>
        </View>
      </View>
     </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    height: Dimensions.get('window').height / 3,
  },
  ViewContainer: {
    flexDirection: 'row',
  },
  buttons: {
    width: (Dimensions.get('window').width / 4) * 3,
    flexDirection: 'row',
    backgroundColor:'#f0f0f0',
    flexWrap: 'wrap'
  },
  comands: {
    width: Dimensions.get('window').width / 4,
    backgroundColor: '#fa8231'
  }
});
