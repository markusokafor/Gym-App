import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Text, Button, Input } from "react-native-elements";
import appConfig from "../config/appConfig";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      surName: "",
      dob: "",
      address: "",
      gender: "",
      spinner: false,
    };
    this.createGym = this.createGym.bind(this);
  }

  static navigationOptions = {
    title: 'Add New',
  };

  async createGym() {

    if (!this.state.firstName) {
      alert("At least, give the first name please");
      return;
    }
    this.setState({ spinner: true });
    let { gymURL } = appConfig;

    const response = await axios({
      method: "POST",
      url: gymURL,
      data: this.state
    });

    this.setState({ firstName: "", surName: "", dob: "", address: "", gender: "", spinner: false });

    Alert.alert(
      'Successful',
      'New entry created',
      [
        { text: 'OK', },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Spinner visible={this.state.spinner} textContent={"loading..."} textStyle={{ color: 'black' }} cancelable={true} />
        <Input
          value={this.state.firstName}
          inputContainerStyle={{ marginTop: 25 }}
          placeholder='First Name'
          onChangeText={(value) => this.setState({ firstName: value })}
        />

        <Input
          value={this.state.surName}
          inputContainerStyle={{ marginTop: 25 }}
          placeholder='Surname'
          onChangeText={(value) => this.setState({ surName: value })}
        />
        <Input
          value={this.state.dob}
          inputContainerStyle={{ marginTop: 25 }}
          placeholder='Date of birth'
          onChangeText={(value) => this.setState({ dob: value })}
        />
        <Input
          value={this.state.address}
          inputContainerStyle={{ marginTop: 25 }}
          placeholder='Address'
          multiline={true}
          onChangeText={(value) => this.setState({ address: value })}
        />
        <Input
          value={this.state.gender}
          inputContainerStyle={{ marginTop: 25 }}
          placeholder='Gender'
          onChangeText={(value) => this.setState({ gender: value })}
        />



        <Button style={{ flex: 1 }}
          buttonStyle={{ width: 250, marginTop: 35, alignSelf: "center" }}
          title="Create"
          onPress={this.createGym}
        />

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
