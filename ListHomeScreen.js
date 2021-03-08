import React from 'react';
import { TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert, Image } 
  from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { getDataModel } from './DataModel';
import { listStyles, mainStyles, colors } from './Styles';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import InputSpinner from "react-native-input-spinner";





export class ListHomeScreen extends React.Component {

constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.currentUser = this.props.route.params.currentUser;

    console.log("in ListHomeScreen, route.params = ", props.route.params);
    
    
    // this.nextKey = 0;
    this.state = {
    theMainGroceryList: []
    }
    this.dataModel.getListsFromFirebase(); 
    

}
componentDidMount() {
    
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
    console.log("Home Screen did mount"); 
    this.setState({theMainGroceryList: this.dataModel.groceryList});
  }

  componentWillUnmount() {
    this.focusUnsubscribe();
  }
  
  onFocus = async () => {
    
    if (this.props.route.params) {
      const {operation, item} = this.props.route.params;
      if (operation === 'add') {
        await this.dataModel.addList(item.text,this.currentUser);
        this.setState({theMainGroceryList:this.dataModel.groceryList})
      } 
      else if (operation === 'edit') {
        await this.dataModel.updateList(item.key, item.text);
        this.setState({theMainGroceryList:this.dataModel.groceryList})
      } 
    }
    this.props.navigation.setParams({operation: 'none'});
  }


deleteList = async (itemKey) => {
    await this.dataModel.deleteList(itemKey);
    this.setState({theMainGroceryList: this.dataModel.groceryList});
}

onDelete = (itemWhichIsAListKey) => {
    this.deleteList(itemWhichIsAListKey);
  }

onEditList = (itemWhichIsAList) => {
    this.props.navigation.navigate("ListEnter", {
    operation: 'edit',
    item: itemWhichIsAList
    });
}

emptyListComponent = () => {
    return (
      <View style={listStyles.emptyListContainer}>
        <Text style={listStyles.emptyListText}>
        You don't have any lists!</Text>
        <Text style={listStyles.emptyListText}>Tap "+" below to add one!</Text>
     </View>);
  }

render() {
    return (
    <View style={listStyles.container}>
        <View>
        <Text style={listStyles.promptText}>
            Grocery List
        </Text>
        </View>
        <View style={listStyles.body}>
        <View style={listStyles.listContainer}>
            
            <FlatList
            data={this.state.theMainGroceryList}
            ItemSeparatorComponent={()=>(
                <View style={listStyles.separator}
                />
            )}
            ListEmptyComponent={this.emptyListComponent}
            
            renderItem={({item})=>{
                return(
                <View style={listStyles.listItemContainer}>
                <View style={listStyles.listItemIcon}>
                    <Feather name="list" 
                    size={24} 
                    color={colors.primary}/>
                </View>
                
                    <View style={listStyles.listItemTextContainer}> 
                    <Text style={listStyles.listItemText}>
                        {item.text}
                    </Text> 
                    </View>
                    <View style={listStyles.listItemButtonContainer}>
                    <Ionicons name="md-create" 
                        size={24} 
                        color={colors.navButtonHelpee}
                        onPress={()=>{this.onEditList(item)}} />
                    <Ionicons name="md-trash" 
                        size={24} 
                        color={colors.navButtonHelper}
                        /*Confirmation dialog is displayed when the user tries to 
                        delete an item, and the delete only occurs if the user
                        confirms the operation*/
                        onPress={()=>{
                        Alert.alert(   
                            'Delete Item?',
                            `Are you sure you want to delete "${item.text}"?` ,
                            [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            },
                            { text: 'Delete', 
                                onPress: () => {
                                this.onDelete(item.key)
                                console.log('Delete Pressed') }}
                            ],
                            { cancelable: false }
                        );
                        }} />
                    </View>
                </View>
                );
            }}
            />
        </View>
        </View>
        <View style={listStyles.footer}>
        <TouchableOpacity
            style={listStyles.footerAddButton}
            onPress={()=>
            {this.props.navigation.navigate('ListEnter', {
              operation: "add",
              currentUser: this.currentUser
              })
              }} >
            <Ionicons 
            name="md-add-circle" 
            size={80} 
            color={colors.primary} />
        </TouchableOpacity>


        <TouchableOpacity 
            style={listStyles.footerButton}
            onPress={()=>{this.props.navigation.navigate("Available Helpers", {
            currentUser: this.currentUser
            })
            }} >
            <Text style={listStyles.buttonText}>View Available Helpers</Text>
        </TouchableOpacity>
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
export class ListEnterScreen extends React.Component {

    constructor(props) {
      super(props);
      this.dataModel = getDataModel();
      this.currentUser = this.props.route.params.currentUser;




      console.log("in ListEnterScreen, route.params = ", props.route.params);

      this.operation = this.props.route.params.operation;
      this.item = this.props.route.params.item;

      let listName = '';

      if (this.operation === 'edit') {
        listName = this.props.route.params.item.text;
        this.listID = this.props.route.params.item.key;
      }
      // console.log("listID", this.listID)
      this.state = {
        inputText: listName,
        theSecondaryList: []
        }
        this.dataModel.getItemsFromFirebase(this.listID);

    }

    componentDidMount() {
      this.setState({theSecondaryList:this.dataModel.secondaryGroceryList})

      this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
      console.log("List Enter Screen did mount");
      
  
    }
  
    componentWillUnmount() {
      this.focusUnsubscribe();
      
    }
    onFocus = async () => {
      if (this.props.route.params.item) {
        const {operation, item} = this.props.route.params;
        // console.log("the item is", item)
        if (operation === 'add') {
          await this.dataModel.addListItem(item.text,this.listID,item.quantity);
          this.setState({theSecondaryList:this.dataModel.secondaryGroceryList})
        } 
        else if (operation === 'edit') {
          await this.dataModel.updateListItem(item.key,this.listID, item.text,item.quantity);
          this.setState({theSecondaryList: this.dataModel.secondaryGroceryList})

        } 
      }
      this.props.navigation.setParams({operation: 'none'});
    }

    onEdit = (itemWhichIsAList) => {
      this.props.navigation.navigate("ListItems", {
        operation: 'edit',
        item: itemWhichIsAList
      });
    }

  //   deleteListItem = (itemKey) => {
  //     this.dataModel.deleteListItem(itemKey,this.listID);
  //     this.setState({theSecondaryList: this.dataModel.secondaryGroceryList});
  // }

    onDelete = async (itemWhichIsAListKey,listID) => {
      await this.dataModel.deleteListItem(itemWhichIsAListKey,listID);
      this.setState({theSecondaryList: this.dataModel.secondaryGroceryList});
    }

  //   deleteListItem = (itemKey) => {
  //     this.dataModel.deleteList(itemKey,this.listID);
  //     this.setState({theSecondaryList: this.dataModel.secondaryGroceryList});
  // }

  emptyListItemsComponent = () => {
    return (
      <View style={listStyles.emptyListContainer}>
        <Text style={listStyles.emptyListText}>
        Nothing in your list.</Text>
        <Text style={listStyles.emptyListText}>Tap "Add Item" below to add something!</Text>
     </View>);
  }


  
    render() {
      return (
        <View style={listStyles.container}>
          <View style={listStyles.header}>
            <Text style={listStyles.promptText}>
              Name your list
            </Text>
          </View>
          <View style={listStyles.body}>
            <View style={listStyles.textInputContainer}>
              <Text style={listStyles.textInputLabel}>
               List name: </Text>
              <TextInput
                placeholder='Enter a list name'
                style={listStyles.textInputBox}
                onChangeText={(text) => this.setState({inputText: text})}
                value={this.state.inputText}
              />
            </View>
  
            
            <View style={listStyles.listContainer}>
              
              <FlatList
                data={this.state.theSecondaryList}
                ItemSeparatorComponent={()=>(
                  <View style={listStyles.separator}
                  />
                )}
                ListEmptyComponent={this.emptyListItemsComponent}
                renderItem={({item})=>{
                  return(
                    <View style={listStyles.listItemContainer}>
                    {/* <View style={listStyles.listItemIcon}>
                      <Feather name="list" 
                        size={24} 
                        color={colors.primary}/>
                    </View> */}
                    
                      <View style={listStyles.listItemTextContainer}> 
                        <Text style={listStyles.listItemText}>
                          {item.text}     x {item.quantity}
                        </Text> 
                        
                       
                      </View>
                      <View style={listStyles.listItemButtonContainer}>
                        <Ionicons name="md-create" 
                          size={24} 
                          color={colors.navButtonHelpee}
                          onPress={()=>{this.onEdit(item)}} />
                        <Ionicons name="md-trash" 
                          size={24} 
                          color={colors.navButtonHelper}
  
                          /*Confirmation dialog is displayed when the user tries to 
                            delete an item, and the delete only occurs if the user
                            confirms the operation*/
  
                          onPress={()=>{
                            Alert.alert(   
                              'Delete Item?',
                              `Are you sure you want to delete "${item.text}"?` ,
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel'
                                },
                                { text: 'Delete', 
                                  onPress: () => {
                                    this.onDelete(item.key,this.listID)
                                    console.log('Delete Pressed') 
                                  }}
                              ],
                              { cancelable: false }
                            );
                            }} />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
  
          </View>
          <View style={listStyles.footer}>
  
              <TouchableOpacity
                style={listStyles.footerAddButton}
              
                onPress={()=>
                  {this.props.navigation.navigate('ListItems', {
                    operation: "add",
                    currentUser: this.currentUser
                    })
                    }}>
                <Ionicons name="md-add-circle" 
                  size={80} 
                  color={colors.primary} />
              </TouchableOpacity>
            <View style={listStyles.footerButtonContainer}>
            
              <TouchableOpacity 
                style={listStyles.footerButton}
                onPress={()=>{this.props.navigation.navigate("ListHome")}}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
              /* save button is visually greyed out and disabled when there is no
                 text in the List screen text box. */
                style={this.state.inputText ? listStyles.footerButton : listStyles.footerButtonDisabled}
                disabled={this.state.inputText ? false : true}
                onPress={()=>{
                  let theItem = {};
                  if (this.operation === 'add') {
                    theItem = {
                      text: this.state.inputText,
                      key: -1 // placeholder for "no ID"
                    }
                  } else { // operation === 'edit'
                    theItem = this.props.route.params.item;
                    theItem.text = this.state.inputText;
                    theItem.quantity = this.state.value;
                  }
                  this.props.navigation.navigate("ListHome", {
                    operation: this.operation,
                    item: theItem
                  });
                }}>
                <Text style={listStyles.footerButtonText}>Save</Text>
              </TouchableOpacity>
  
            </View>
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
  export class ListItemsScreen extends React.Component{
    constructor(props){
      super(props);
  
      console.log("in ListItemsScreen, route.params = ", props.route.params);

      this.operation = this.props.route.params.operation;
      this.currentUser = this.props.route.params.currentUser;

  
      let itemName = '';
      let itemCount;

      if (this.operation === 'edit') {
        itemName = this.props.route.params.item.text;
        itemCount = this.props.route.params.item.quantity;
        // this.itemID = this.props.route.params.item.key;   
      }

    
      this.state = {
        inputText: itemName,
        quantity: itemCount,
  
      }
    }
  
  
    render() {
      return (
        <View style={listStyles.container}>
          <View style={listStyles.header}>
            <Text style={listStyles.promptText}>
              What is your List Item and Quantity?
            </Text>
          </View>
          <View style={listStyles.body}>
            <View style={listStyles.textInputContainer}>
              <Text style={listStyles.textInputLabel}>
               Item: </Text>
              <TextInput
                placeholder='Enter an item'
                style={listStyles.textInputBox}
                onChangeText={(text) => this.setState({inputText: text})}
                value={this.state.inputText}
              />
              
            </View>
            <View style={listStyles.quantContainer}>
                <Text style={listStyles.quantInputLabel}>
                  Quantity: </Text>
                <InputSpinner style={listStyles.quantSpinner}
                
                value={this.state.quantity}
                min={0}
                max={48}
                step={1}
                rounded={false}
                showBorder={true}
                color={colors.primary}
                editable={false}
                onChange={(value) => {
                  this.setState({quantity: value});
                }}
              />
            </View>
          </View>
          <View style={listStyles.footerListItems}>
  
            <View style={listStyles.footerButtonContainer}>
            
              <TouchableOpacity 
                style={listStyles.footerButton}
                onPress={()=>{this.props.navigation.navigate("ListEnter")}}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
              /* save button is visually greyed out and disabled when there is no
                 text in the List screen text box. */
                style={this.state.inputText ? listStyles.footerButton : listStyles.footerButtonDisabled}
                disabled={this.state.inputText ? false : true}
                onPress={()=>{
                  let theItem = {};
                  if (this.operation === 'add') {
                    theItem = {
                      text: this.state.inputText,
                      key: -1, // placeholder for "no ID",
                      quantity: this.state.quantity
                    }
                  } else { // operation === 'edit'
                    theItem = this.props.route.params.item;
                    theItem.text = this.state.inputText;
                    theItem.quantity = this.state.quantity;

                  }
                  this.props.navigation.navigate("ListEnter", {
                    operation: this.operation,
                    item: theItem
                  });
                }}>
                <Text style={listStyles.footerButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <View style={listStyles.navBar}>
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
            onPress={()=>{this.props.navigation.navigate("MainHelpee")}} />
                
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





