import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import { MonoText } from '../components/StyledText';
import axios from "axios";
import appConfig from "../config/appConfig";
import Spinner from 'react-native-loading-spinner-overlay';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gyms: [],
      filteredGym: [],
      keyword: "",
      spinner: false,
    };

    this.load = this.load.bind(this);
    this.search = this.search.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  search() {
    let filteredGym = [];
    const lower_keyword = this.state.keyword.toLowerCase();
    for (let i = 0; i < this.state.gyms.length; i++) {
      if (this.state.gyms[i].firstName.toLowerCase().indexOf(lower_keyword) !== -1) {
        filteredGym.push(this.state.gyms[i]);
      }
    }

    this.setState({ filteredGym: filteredGym });
  }
  async load() {
    this.setState({ spinner: true });
    let { gymURL } = appConfig;

 

    const promise = await axios({
      method: "GET",
      url: gymURL,
    });
    this.setState({ spinner: false });
    const data = promise.data;
    this.setState({ gyms: data, filteredGym: data });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Spinner visible={this.state.spinner} textContent={"loading..."} textStyle={{ color: 'black' }} cancelable={true} />
          <NavigationEvents onDidFocus={this.load} />
          <Input
            inputContainerStyle={{ marginTop: 25, marginBottom: 25 }}
            placeholder='Search by First Name'
            onChangeText={(value) => this.setState({ keyword: value }, this.search)}
          />

          <FlatList
            data={this.state.filteredGym}
            renderItem={({ item }) => <TouchableOpacity style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'stretch',
              borderWidth: 1,
              borderColor: "black",
              margin: 5,
              padding: 5
            }}
              key={item._id}
              onPress={() => this.props.navigation.navigate("Details", { id: item._id })}>
              <View key={item}>
                <Text style={{ fontSize: 17, textAlign: "center" }}>Full Name : {item.firstName} {item.surName}</Text>
              </View>
            </TouchableOpacity>}
            keyExtractor={(item, index) => index.toString()} />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
