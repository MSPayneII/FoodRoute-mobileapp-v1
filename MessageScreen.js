import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { messageStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class MessageScreen extends React.Component {
  constructor(props) {
    super(props);

    this.self = this.props.route.params.currentUser;
    this.other = this.props.route.params.otherUser;
    this.dataModel = getDataModel();
    this.imageWidth = 225,
    this.imageHeight = 300;

    this.state = {
      messages: [],
      inputText: ''
    }
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({title: this.other.displayName});
    this.subscribeToChat();
  }

  componentWillUnmount = () => {
    this.dataModel.unsubscribeFromChat(this.chat);
  }

  subscribeToChat = async() => {
    this.chat = await this.dataModel.getOrCreateChat(this.self, this.other);
    this.dataModel.subscribeToChat(this.chat, this.onChatUpdate);
  }

  onChatUpdate = () => {
    this.setState({messages: this.chat.messages});
  }

  onMessageSend = async () => {
    let messageData = {
      text: this.state.inputText,
      timestamp: Date.now(),
      author: this.self,
    }
    await this.dataModel.addChatMessage(this.chat.key, messageData);
    
    this.setState({
      messages: this.chat.messages,
      inputText: ''
    });
  }

  onTakePicture = () => {
    this.props.navigation.navigate("Camera", {
      chat: this.chat,
      currentUser: this.self
    })
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={messageStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={100}>
        <View style={messageStyles.messageListContainer}>
          <FlatList
            data={this.state.messages}
            ref={(ref) => {this.flatListRef = ref}}
            onContentSizeChange={() => {
              if (this.flatListRef) {
                this.flatListRef.scrollToEnd();
              }
            }}
            renderItem={({item})=>{
              return (
                <View style={item.author === this.self ? 
                  messageStyles.chatTextSelfContainer :
                  messageStyles.chatTextOtherContainer
                }>
                  {item.type === 'text' ?
                    <Text style={item.author === this.self ? 
                      messageStyles.chatTextSelf :
                      messageStyles.chatTextOther
                    }>
                      {item.text}
                    </Text>
                  :
                  <Image
                    style={{width: this.imageWidth, height: this.imageHeight}}
                    source={{uri: item.imageURL}}
                  />
                }
                </View>
              );
            }}
          />
        </View>
        <View style={messageStyles.inputContainer}>
          <View style={messageStyles.inputRow}>
            <Ionicons 
              name='ios-camera' 
              size={44}
              color={this.self.helpStatus === "Helper"? colors.navButtonHelper: colors.navButtonHelpee}
              onPress={this.onTakePicture}
            />
            <TextInput 
              style={messageStyles.inputBox}
              value={this.state.inputText}
              returnKeyType={'send'}
              onChangeText={(text) => {
                this.setState({inputText: text})
              }}
              onSubmitEditing={this.onMessageSend}/>
            <Ionicons 
              name='md-send' 
              size={36}
              color={this.self.helpStatus === "Helper"? colors.navButtonHelper: colors.navButtonHelpee}
              onPress={this.onMessageSend}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}