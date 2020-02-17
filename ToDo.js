import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import PropTypes from "prop-types";

const {height, width} = Dimensions.get("window");

class ToDo extends React.Component{
    constructor(props){
        super(props);
        this.State = {
            isEditing:false,
            toDoValue: props.text
        };
    }
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    }
    render(){
        const {isCompleted, isEditing, toDoValue} = this.state;
        const {text} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    {/* TochableOpacity는 클릭할 수 있는 부분. 터치할때마다 toggleComplete함수에 의해 isCompleted state가 바뀐다! */}
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle ]}/>
                    </TouchableOpacity>
                    {isEditing? (
                        <TextInput style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]}
                            value={toDoValue}
                            multiline={true}
                            onchangeText={this._controlInput}
                            returnKeyType={"done"}
                            onBlur={this._endEditing}
                            autoCorrect={false}
                        />
                    ) : (
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText ]}>{text}</Text>
                    )}
                </View>
                {isEditing ? (
                    // 수정하러 들어갔을 때 나오는 부분
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._endEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
    _toggleComplete=()=>{
        this.setState(prevState => {
            return {
                isCompleted : !prevState.isCompleted
            };
        });
    };
    _startEditing=()=>{
        this.setState({
            isEditing:true
        });
    };
    _endEditing=()=>{
        this.setState({
            isEditing:false
        });
    };
    _controlInput=(text)=>{
        this.setState({ toDoValue : text });
    };
}

const styles = StyleSheet.create({
    container:{
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        marginRight: 15
    },
    completedCircle:{
        borderColor: "#00ff00"
    },
    uncompletedCircle:{
        borderColor: "red"
    },
    text:{
        fontWeight:"600",
        fontSize: 20,
        marginVertical: 20,
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText:{
        color: "black"
    },
    column:{
        flexDirection: "row",
        alignItems: "center",
        width : width / 2,
    },
    actions:{
        flexDirection: "row",
    },
    actionContainer:{
        marginVertical: 10,
        marginHorizontal: 10
    },
    input:{
        marginVertical: 15,
        width: width / 2,
        paddingBottom: 5
    }
})

export default ToDo;