import React from 'react';
import { TextInput, Text, View, 
  Image, TouchableOpacity, KeyboardAvoidingView, Alert} 
  from 'react-native';

import { loginStyles, listStyles } from './Styles';
import { getDataModel } from './DataModel';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();

    this.state = {
      mode: 'login',
      emailInput: '',
      displayNameInput: '',
      passwordInput: '',
      passwordCheckInput: '',
      helpStatus: '',
      city: '',
      image: '',
    }
  }

  onCreateAccount = async () => {

    // check that this is a valid email (skipping this)
    // check password rules (skipping this)
    // check that passwords match (skipping this)
    // check that displayName isn't empty (skipping this)

    // check that user doesn't already exist
    let users = this.dataModel.getUsers();
    for (let user of users) {
      if (user.email === this.state.emailInput) {
        console.log("found matching user");
        Alert.alert(
          'Duplicate User',
          'User ' + this.state.emailInput + ' already exists.',
          [{ text: 'OK',style: 'OK'}]
        );
        return;
      } 
    } // made it through loop, no user exists!
    console.log("no matching user found, creating");
    let newUser = await this.dataModel.createUser(
      this.state.emailInput,
      this.state.passwordInput,
      this.state.displayNameInput,
      this.state.helpStatus,
      this.state.city,
      this.state.image,
    );

    if (newUser.helpStatus === 'Helpee') {
          this.props.navigation.navigate("Main", {
            currentUser: newUser
          });
        } else {
            this.props.navigation.navigate("Main*", {
              currentUser: newUser
            });
        }
  }

  onLogin = () => {
    let users = this.dataModel.getUsers();
    let email = this.state.emailInput;
    let pass = this.state.passwordInput;
    for (let user of users) {
      if (user.email === email) {
        if (user.password === pass) {
          // success!
          if (user.helpStatus === 'Helpee') {
          this.props.navigation.navigate("Main", {
            currentUser: user
          });
        } else {
            this.props.navigation.navigate("Main*", {
              currentUser: user
            })
        }
          return;
        }
      }
    }
    // we got through all the users with no match, so failure
    Alert.alert(
      'Login Failed',
      'No match found for this email and password.',
      [{ text: 'OK',style: 'OK'}]
    );
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={loginStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={10}>
        <View style={loginStyles.topView}>
          <Image 
            source={require('./assets/logo.png')}
            style={loginStyles.logoImage}
          />
          <Text style={listStyles.promptText}>Food Route</Text>
        </View>
        <View style={loginStyles.middleView}>
          <View style={loginStyles.inputRow}>
            <Text 
              style={loginStyles.inputLabel}
            >Email:</Text>
            <TextInput
              style={loginStyles.inputText}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              autoCompleteType='email'
              textContentType='emailAddress'
              value={this.state.emailInput}
              onChangeText={(text)=>{this.setState({emailInput: text})}}
            />
          </View>
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>Display Name:</Text>
              <TextInput
                style={loginStyles.inputText}
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.displayNameInput}
                onChangeText={(text)=>{this.setState({displayNameInput: text})}}
              />
            </View>
          ):(
            <View/>
          )}
          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>Password:</Text>
            <TextInput
              style={loginStyles.inputText}
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              value={this.state.passwordInput}
              onChangeText={(text)=>{this.setState({passwordInput: text})}}
          />
          </View>
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>Re-enter Password:</Text>
              <TextInput
                style={loginStyles.inputText}
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'  
                value={this.state.passwordCheckInput}
                onChangeText={(text)=>{this.setState({passwordCheckInput: text})}}
              />
            </View>

          ):(
            <View/>
          )}
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>City:</Text>
            <TextInput
              style={loginStyles.inputText}
              autoCapitalize='words'
              autoCorrect={false}
              value={this.state.city}
              onChangeText={(text)=>{this.setState({city: text})}}
            />
          </View>
          ):(
            <View/>
          )}
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>Helper or Helpee:</Text>
            <TextInput
              style={loginStyles.inputText}
              autoCapitalize='words'
              autoCorrect={false}
              value={this.state.helpStatus}
              onChangeText={(text)=>{this.setState({helpStatus: text})}}
            />
          </View>
          ):(
            <View/>
          )}
        </View>
        {this.state.mode === 'login' ? (

          <View style={loginStyles.bottomView}>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{
                this.setState({mode: 'create'})
              }}
              >
              <Text style={loginStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={this.onLogin}
            >
              <Text style={loginStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

        ):(

          <View style={loginStyles.bottomView}>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{
                this.setState({mode: 'login'})
              }}
              >
              <Text style={loginStyles.buttonText}> Already have an account?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={this.onCreateAccount}
              >
              <Text style={loginStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    )
  }
}