import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { NavigationEvents } from "react-navigation";
import { Text, Button, Input } from "react-native-elements";
import appConfig from "../config/appConfig";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

export default class Update extends Component {

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

    this.update = this.update.bind(this);
    this.populateFields = this.populateFields.bind(this);
  }

  static navigationOptions = {
    title: 'Update',
  };

  populateFields() {
    const data = this.props.navigation.getParam("data");
    this.setState({ firstName: data.firstName, surName: data.surName, dob: data.dob, address: data.address, gender: data.gender });
  }

  async update() {
    if (!this.state.firstName) {
      alert("At least, give the first name please");
      return;
    }

    this.setState({ spinner: true });
    let { gymURL } = appConfig;
    const data = this.props.navigation.getParam("data");
    gymURL = gymURL + "/" + data._id;
    const response = await axios({
      method: "put",
      url: gymURL,
      data: this.state
    });

    this.setState({ spinner: false });
    //after update navigate to home page
    this.props.navigation.navigate("Home");
  }

  render() {
    return (<ScrollView style={styles.container}>
      <Spinner visible={this.state.spinner} textContent={"loading..."} textStyle={{ color: 'black' }} cancelable={true} />
      <NavigationEvents onDidFocus={this.populateFields} />

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
        buttonStyle={{ width: 200, marginTop: 35, alignSelf: "center" }}
        title="Update data"
        onPress={this.update}
      />

    </ScrollView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
