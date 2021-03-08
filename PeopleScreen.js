import React from 'react';
import { TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { peopleStyles, mainStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class PeopleScreen extends React.Component {
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
    
    console.log("People", otherUsers)

    this.state = {
      people: otherUsers
    }
  }

  

  render() {
    return (
      <View style={peopleStyles.container}>
        <View style={peopleStyles.peopleListContainer}>
          <Text style={peopleStyles.promptText}>Messages</Text>
          <FlatList
            ItemSeparatorComponent={()=>{
              return (
                <View style={peopleStyles.separator}/>
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
                  <Text style={peopleStyles.personText}>{item.displayName}</Text>
                  <MaterialCommunityIcons 
                    name="dots-vertical" 
                    size={35} 
                    color={this.currentUser.helpStatus === "Helper"? colors.navButtonHelper: colors.navButtonHelpee} 
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
        <View style={peopleStyles.footer}>
        <MaterialIcons 
            name="person-outline" 
            size={35} 
            color={this.currentUser.helpStatus === "Helper"?colors.navButtonHelper: colors.navButtonHelpee}
            onPress={()=>{this.props.navigation.navigate("Profile", {
              currentUser: this.currentUser
            })
            }} />
        <MaterialCommunityIcons 
            name="home-circle" 
            size={45} 
            color={this.currentUser.helpStatus === "Helper"?colors.navButtonHelper: colors.navButtonHelpee} 
            onPress={()=>{this.props.navigation.navigate("Main")}} />
                
        <MaterialCommunityIcons 
            name="message-processing" 
            size={35} 
            color={this.currentUser.helpStatus === "Helper"?colors.navButtonHelper: colors.navButtonHelpee} 
            onPress={()=> {
              this.props.navigation.navigate('People', {
                currentUser: this.currentUser,
              });
            }}
         />
        
        </View>
      </View>
    )
  }
}