import React from 'react';
import { TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert, Image, KeyboardAvoidingView } 
  from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from 'react-native-user-avatar';

import { profileStyles, mainStyles, peopleStyles, availablehelperstyles, colors } from './Styles';
import { getDataModel } from './DataModel';
import InputSpinner from "react-native-input-spinner";


export class AvailableHelpersScreen extends React.Component {
    constructor(props) {
      super(props);

    this.dataModel = getDataModel();
    this.currentUser = this.props.route.params.currentUser;
    
    let allUsers = this.dataModel.getUsers();
    let otherUsers = [];
    for (let user of allUsers) {
      if (user.email !== this.currentUser.email && user.helpStatus !== this.currentUser.helpStatus) {
        otherUsers.push(user);
      }
    }
    
    console.log("avail helper", this.currentUser)

    this.state = {
      people: otherUsers
    }
  }
  
    render() {
  
      return (
        <View style={availablehelperstyles.container}>
          
            <View style={availablehelperstyles.headerSection}>
              <Text style={availablehelperstyles.promptText}>
                Available Helpers for: </Text>
              <Text style={availablehelperstyles.todaysDate}>Today: {new Date().toLocaleDateString()}</Text>
            </View>
            
          <View style={availablehelperstyles.body}>
            <FlatList
              ItemSeparatorComponent={()=>{
                return (
                  <View style={availablehelperstyles.separator}/>
                );
              }}
              data={this.state.people}
              renderItem={({item})=> {
                return (
                  <TouchableOpacity 
                    style={peopleStyles.personRow}
                    onPress={()=> {
                      this.props.navigation.navigate('Message', {
                        currentUser: this.currentUser,
                        otherUser: item
                      });
                    }}
                  >
              <View style={availablehelperstyles.avatar}> 
                <UserAvatar 
                component={<Image source={require('./assets/blankprofile.png')} 
                style={availablehelperstyles.avatar} />}
                bgColor="white"
                />
            </View>
              <View style={availablehelperstyles.helperinfo}>
              <Text style={{fontSize:18,fontWeight:'500'}}>{item.displayName}</Text>
              <Text style={{fontSize:14,fontStyle:'italic'}}>{item.city}, MI</Text>

              </View>
      
              <MaterialCommunityIcons 
                name="message-processing" 
                size={35} 
                color={this.currentUser.helpStatus === "Helper"? colors.navButtonHelper: colors.navButtonHelper} 
                onPress={()=> {
                  this.props.navigation.navigate('Message', {
                    currentUser: this.currentUser,
                    otherUser: item
                  });
                }}
              />  
                          
            </TouchableOpacity>
          );
        }}
      />
          </View>

          <View style={mainStyles.footer}>
        <MaterialIcons 
            name="person-outline" 
            size={35} 
            color={colors.navButtonHelpee} 
            onPress={()=>{this.props.navigation.navigate("Profile", {
              currentUser: this.currentUser
            })
            }}/>
        <MaterialCommunityIcons 
            name="home-circle" 
            size={45} 
            color={colors.navButtonHelpee} 
            onPress={()=>{this.props.navigation.navigate("Main")}} />
                
        <MaterialCommunityIcons 
            name="message-processing" 
            size={35} 
            color={colors.navButtonHelpee}
            onPress={()=> {
              this.props.navigation.navigate('People', {
                currentUser: this.currentUser,
              });
            }} 
            />
        
        </View>
        </View>
        
      );
     }
    }


    