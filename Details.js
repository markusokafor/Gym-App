import React, { Component } from "react";
import { View, ScrollView,Alert } from "react-native";

import { NavigationEvents } from "react-navigation";
import { Text, Button } from "react-native-elements";
import appConfig from "../config/appConfig";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            spinner: false,
        };

        this.loadDetails = this.loadDetails.bind(this);
        this.deleteGym = this.deleteGym.bind(this);
    }

    static navigationOptions = {
        header: null,
      };

    async loadDetails() {
        this.setState({ spinner: true });
        let { gymURL } = appConfig;
        //get id from the previous screen
        gymURL = gymURL + "/" + this.props.navigation.getParam("id");
        
        const promise = await axios({
            method: "GET",
            url: gymURL,
        });
        this.setState({ spinner: false });
        const data = promise.data;
        this.setState({ details: data });
    }

    async deleteGym() {
        this.setState({ spinner: true });
        let { gymURL } = appConfig;
        gymURL = gymURL + "/" + this.props.navigation.getParam("id");
        
        
        const response = await axios({
            method: "delete",
            url: gymURL,
        });
        this.setState({ spinner: false });
        //after successful deletion go to the home screen
        this.props.navigation.navigate("Home");
    }

    render() {
        return (<ScrollView>
            <NavigationEvents onDidFocus={this.loadDetails} />
            <Spinner visible={this.state.spinner} textContent={"loading..."} textStyle={{ color: 'black' }} cancelable={true} />
            <Text style={{textAlign:"center",marginTop:25,marginBottom:20,fontWeight:"bold",fontSize:25}}>Details</Text>

            <View style={{ padding: 10, margin: 10 }}>
                <Text>First Name : {this.state.details.firstName}</Text>
                <Text>Surname : {this.state.details.surName}</Text>
                <Text>DOB : {this.state.details.dob}</Text>
                <Text>Address : {this.state.details.address}</Text>
                <Text>Gender : {this.state.details.gender}</Text>

            </View>

            <View style={{ flexDirection: "row", flex: 1, margin: 10 }}>

                <Button style={{ flex: 1 }}
                    buttonStyle={{ width: 150, marginTop: 25, marginLeft: 10, marginRight: 10 }}
                    title="Update"
                    onPress={() => this.props.navigation.navigate("Update", { data: this.state.details })}
                />

                <Button style={{ flex: 1 }}
                    buttonStyle={{ width: 150, marginTop: 25, backgroundColor: "red", marginLeft: 10 }}
                    title="Delete"
                    onPress={this.deleteGym}
                />

            </View>


        </ScrollView>)
    }
}