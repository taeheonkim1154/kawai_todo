import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { render } from 'react-dom';
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const {height, width} = Dimensions.get("window");

export default class App extends React.Component{
  state={
    newToDo : "",
    loadedToDos : false,
    toDos: {}
  };
  componentDidMount=()=>{
    this._loadToDos();
  }
  render(){
    const {newToDo, loadedToDos, toDos} = this.state;
    console.log(toDos);
    if (!loadedToDos){
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}>To Do for You!!</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"Add to do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor="#999"
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(arg => <ToDo key={arg.id} {...arg}/>)}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos=()=>{
    this.setState({
      loadedToDos:true
    })
  };
  _addToDo=()=>{
    const {newToDo } = this.state;
    if (newToDo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        // 새로 만드는 todo마다 ID object에 아래의 정보들을 저장함
        const newToDoObject = {
          [ID]:{
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos : {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return {...newState};
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title:{
    color:"white",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 30,
    fontWeight: "600"
  },
  card:{
    backgroundColor:"white",
    flex:1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // 쉐도우 넣는 방법은 운영체제마다 다르므로 platform 이용!
    ...Platform.select({
      ios:{
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
          height:-1,
          width: 0
        }
      },
      android:{
        elevation: 3
      }
    })
  },
  input:{
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos:{
    alignItems: "center"
  }
});
