import { View, Text, SafeAreaView, FlatList, Pressable, Alert, Switch,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Data } from './DATA'

const {height}=Dimensions.get('screen')

const Calculator = () => {

    const [data, setData] = useState('')
    const [result, setResult] = useState('')
    const [theme, setTheme] = useState(false)

    const toggleSwitch = () => {
        setTheme(prevState => !prevState)
    }


    const onButtonPress = (button, label) => {
        let operators = ['+', '-', '*', '/']
        if (label === 'number') (
            setData(data + button)
        )
        if (label === 'operator') (

            setData(operators.includes(data.split('').pop()) ? data.replace((data.split('').pop()), button) : data + button)
        )

        console.log('split', data.split('').pop())
        switch (button) {
            case '=':
                if (operators.includes(data.split('').pop())) {
                    Alert.alert('invalid format')
                } else {
                    setResult(eval(data))
                }
                break

            case 'AC':
                setData('')
                setResult('')
                break

            case 'DEL':
                setData(data.substring(0, data.length - 1))
                break

        }
    }


    const render = ({ item }) => (
        <Pressable
            style={{ height: 60, width: 60, backgroundColor: theme?'#1d1f1e' :'#b8b8b8', margin: 10, borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => onButtonPress(item.button, item.label)}
        >
            <Text style={{ color:theme?'white': item.color, fontSize: 20 }}>{item.button}</Text>
        </Pressable>
    )
    //console.log('height',height*0.06);
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor: theme ? '#0f0f0f' : 'white' }}>
            <View style={{height:height*0.948, backgroundColor: theme ? '#0f0f0f' : 'white'}}>
                <Switch
                    thumbColor={theme?'white':'black'}
                    trackColor={theme?'#8b8f8c':'#babfbc'}
                    ios_backgroundColor={theme?'#8b8f8c':'#babfbc'}
                    onValueChange={toggleSwitch}
                    value={theme}
                    style={{ marginLeft: 180 }}
                />
                <View style={{ height: height*0.356, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 50, paddingRight: 40 }}>
                    <Text style={{ fontSize: 30,color:theme?'white':'black'}}>{data}</Text>
                    <Text style={{ fontSize: 40,color:theme?'white':'black'}}>{result}</Text>
                </View>

                <View style={{ backgroundColor: theme ? '#0f0f0f' : '#ebedeb', height: height*0.593, borderRadius: 40 }}>
                    <FlatList
                        data={Data}
                        renderItem={render}
                        numColumns={4}
                        keyExtractor={item => item.id}
                        style={{ marginTop: 50, marginHorizontal: 30 }}
                    />
                </View>
            </View>


        </SafeAreaView>
    )
}

export default Calculator