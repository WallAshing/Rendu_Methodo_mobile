import Style from './src/Style';
import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';
import InputButton from './src/InputButton';

const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, ',', 'C', 'CE', '=', '+']
];


class ReactCalculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null,
            int: 0
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
    );
    }
    _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++){
            let row =inputButtons[r];
            let inputRow = [];
            for (var i = 0; i < row.length; i ++){
                let input = row[i];
                inputRow.push(
                    <InputButton value={input} onPress={this._onInputButtonPressed.bind(this, input)} key={r + "-" + i}/>
                );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }

    _onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this._handleNumberInput(input)
            case 'string':
                return this._handleStringInput(input)
        }
    }

    _handleNumberInput(num) {
        
        if(!this.state.int){ //mettre "!"" à la place de "== 0"
            let inputValue = (this.state.inputValue * 10) + num;
            this.setState({
                inputValue: inputValue
            })
        }else{
            let inputValue = this.state.inputValue + (num / (10 ** this.state.int))
            this.setState({
                inputValue: inputValue,
                int: this.state.int + 1
            })
        }


    }
    _handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0,
                    int: 0,
                });
                break;

            case ',':   
                this.setState({
                    int: this.state.int + 1,
                })
                break;

            case 'C':
                let Value = this.state.inputValue
                if(int){
                    this.setState({
                        inputValue: (Math.floor((Value * (10 ** int)) / 10)) / (10 ** int)
                    });
                }else{
                    this.setState({
                        inputValue: Math.floor(Value / 10)
                    });
                    
                }
                break;

            case 'CE':
                this.setState({
                    inputValue: 0
                });
                break;
            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }

                if (symbol == '/' && inputValue == 0){
                    this.setState({
                        inputValue: "Error"
                    }); 
                    setTimeout(() => {
                        this.setState({
                            inputValue: 0,
                            previousInputValue: 0
                        }); 
                    }, 1000);
                    break;
                }

                this.setState({
                    previousInputValue: 0,
                    inputValue: eval(previousInputValue + symbol + inputValue),
                    selectedSymbol: null
                });
                break;
        }
    }     
}

 
 export default ReactCalculator