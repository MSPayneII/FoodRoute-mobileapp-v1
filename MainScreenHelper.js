import React from 'react';
import { TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert, Image } 
  from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { mainStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class MainScreenHelper extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.currentUser = this.props.route.params.currentUser;

    Alert.alert("You have a new Grocery List and Message");
  }

  render() {
    return (
      <View style = {mainStyles.container}>
        <View style={mainStyles.topView}>
         <Text style={mainStyles.promptText}>What can you support with?</Text>
         
         <Image 
            source={require('./assets/groceryruns.png')}
            style={mainStyles.logoImage}
          />
         <TouchableOpacity 
              style={mainStyles.buttonContainer}
              onPress={()=>{this.props.navigation.navigate("ListHome", {
                currentUser: this.currentUser
              })
              }} >
              <Text style={mainStyles.buttonText}>Grocery Runs</Text>
        </TouchableOpacity>


        <Image 
            source={require('./assets/carrides.png')}
            style={mainStyles.logoImage}
          />
         <TouchableOpacity 
              style={mainStyles.buttonContainer}
              onPress={()=>{
                  Alert.alert("This feature isn't available");
                  }}>
              <Text style={mainStyles.buttonText}>Car Rides</Text>
        </TouchableOpacity>
        
        <Image 
            source={require('./assets/food.png')}
            style={mainStyles.logoImage}
          />
         <TouchableOpacity 
              style={mainStyles.buttonContainer}
              onPress={()=>{
                  Alert.alert("This feature isn't available");
                  }}>
              <Text style={mainStyles.buttonText}>Food Donation</Text>
        </TouchableOpacity>
        
        </View>

        <View style={mainStyles.footer}>
        <MaterialIcons 
            name="person-outline" 
            size={35} 
            color={colors.navButtonHelper} 
            onPress={()=>{this.props.navigation.navigate("Profile", {
              currentUser: this.currentUser
            })
            }}/>
        <MaterialCommunityIcons 
            name="home-circle" 
            size={45} 
            color={colors.navButtonHelper} 
            onPress={()=>{this.props.navigation.navigate("Main")}} />
                
        <MaterialCommunityIcons 
            name="message-processing" 
            size={35} 
            color={colors.navButtonHelper}
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