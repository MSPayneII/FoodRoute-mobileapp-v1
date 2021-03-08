import React from 'react';
import { TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert, Image, KeyboardAvoidingView } 
  from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { profileStyles, mainStyles, colors } from './Styles';
import { getDataModel } from './DataModel';


export class ProfileScreen extends React.Component {
    constructor(props) {
      super(props);
  
      this.dataModel = getDataModel();
      this.currentUser = this.props.route.params.currentUser;
  
      this.state = {
        bio: '',
        city: this.currentUser.city,
        userphoto: require('./assets/blankprofile.png')
      }
    }
  
    // this screen will be finished in the next wave    
    render() {
      return (
        <KeyboardAvoidingView 
        style={profileStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={10}>
        <View style={profileStyles.topView}>
          <Image 
            source={require('./assets/blankprofile.png')}
            style={profileStyles.logoImage}
          />
          
          <View style={mainStyles.inputRow}>
            <Ionicons 
              name='ios-camera' 
              size={44}
              color={colors.primary}
              onPress={this.onTakePicture}
            />
            
          </View>
        </View>
        <View style={profileStyles.middleView}>

        <View style={profileStyles.inputRow}>
            <Text 
              style={profileStyles.inputLabel}
            >Bio:</Text>
            <TextInput
              style={profileStyles.inputTextField}
              placeholder="Enter a brief bio of yourself here"
              autoCapitalize='none'
              autoCorrect={false}
              value={this.state.bio}
              onChangeText={(text)=>{this.setState({bio: text})}}
            />
          </View>

          <View style={profileStyles.inputRow}>
            <Text 
              style={profileStyles.inputLabel}
            >City:</Text>
            <TextInput
              style={profileStyles.inputText}
              autoCapitalize='none'
              autoCorrect={false}
              value={this.state.city}
              onChangeText={(text)=>{this.setState({city: text})}}
            />
          </View>

          
      
          
        </View>
        <View style={profileStyles.footer}>
        <MaterialIcons 
            name="person-outline" 
            size={35} 
            color={this.currentUser.helpStatus === "Helper"? colors.navButtonHelper: colors.navButtonHelpee} />
        <MaterialCommunityIcons 
            name="home-circle" 
            size={45} 
            color={this.currentUser.helpStatus === "Helper"? colors.navButtonHelper: colors.navButtonHelpee} 
            onPress={()=>{this.props.navigation.goBack()}} />
                
        <MaterialCommunityIcons 
            name="message-processing" 
            size={35} 
            color={this.currentUser.helpStatus === "Helper"? colors.navButtonHelper: colors.navButtonHelpee} />
        
        </View>

       
      </KeyboardAvoidingView>
      );
    }
  }