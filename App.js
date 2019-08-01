import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  Dimensions, 
  Platform,
  ScrollView } from 'react-native';
import { AppLoading } from "expo";
import ToDo from './ToDo';

const { height, width } = Dimensions.get("window");

export default class App extends React.Component{
  state = {
    newToDo: "",
    loadedToDOs: false
  }
componentDidMount = () => {
  this._loadToDos();
}

  render() {
    const { newToDo, loadedToDOs } = this.state;
    if(!loadedToDOs){
        return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="Light-cotent" />
        <Text style={styles.title}>To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"} 
            value={newToDo} 
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false} //자동수정
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"TEST"} />
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
    _loadToDos = () => {
      this.setState({
        loadedToDOs: true
      });
    };
    _addToDo = () => {
      const { newToDo } = this.state;
      if(newToDo !== ""){
        this.setState({
          newToDo: ""
        });
      }
    };
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5A9E1',
    alignItems: 'center'
  },
  title: {
    color: "#2A0A0A",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card:{
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor:"rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android: {
        elevation: 4
      }
    })
  },
  input:{
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems:"center"
  }
});
