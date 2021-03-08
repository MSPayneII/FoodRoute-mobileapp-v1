import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';
import { Surface } from 'react-native';


class DataModel {
  constructor() {
    if (firebase.apps.length === 0) { // aka !firebase.apps.length
      firebase.initializeApp(firebaseConfig);
    }
    this.usersRef = firebase.firestore().collection('users');
    this.messagesRef = firebase.firestore().collection('messages');
    this.groceryListCollectionRef = firebase.firestore().collection('Grocery Lists');
    

    this.storageRef = firebase.storage().ref();
    this.users = [];
    this.chats = [];
    this.groceryList = [];
    this.secondaryGroceryList = [];
    this.asyncInit();
  }

  asyncInit = async () => {
    this.loadUsers();
    this.loadChats();
  }

  loadUsers = async () => {
    let querySnap = await this.usersRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.users.push(data);
    });
  }

  getUsers = () => {
    return this.users;
  }

  getList = () => {
    return this.groceryList;
  }

  createUser = async (email, pass, dispName,helpStatus,city,image) => {
    // assemble the data structure
    let newUser = {
      email: email,
      password: pass,
      displayName: dispName,
      helpStatus: helpStatus,
      city: city,
      image: image,
    }

    // add the data to Firebase (user collection)
    let newUserDocRef = await this.usersRef.add(newUser);

    // get the new Firebase ID and save it as the local "key"
    let key = newUserDocRef.id;
    newUser.key = key;
    this.users.push(newUser);
    return newUser;
  }

  getUserForID = (id) => {
    for (let user of this.users) {
      if (user.key === id) {
        return user;
      }
    }
    // will return undefined. No haiku this time...
  }

  loadChats = async () => {
    let querySnap = await this.messagesRef.get();
    querySnap.forEach(async qDocSnap => {
      let data = qDocSnap.data();
      let thisChat = {
        key: qDocSnap.id,
        participants: [],
        messages: []
      }
      for (let userID of data.participants) {
        let user = this.getUserForID(userID);
        thisChat.participants.push(user);
      }

      let messageRef = qDocSnap.ref.collection("messages");
      let messagesQSnap = await messageRef.get();
      messagesQSnap.forEach(qDocSnap => {
        let messageData = qDocSnap.data();
        messageData.author = this.getUserForID(messageData.author);
        messageData.key = qDocSnap.id;
        thisChat.messages.push(messageData);
      });
      this.chats.push(thisChat);
    });
  }  

  subscribeToChat = (chat, notifyOnUpdate) => {
    this.chatSnapshotUnsub = this.messagesRef.doc(chat.key)
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot((querySnap) => {
        chat.messages = [];
        querySnap.forEach((qDocSnap) => {
          let messageObj = qDocSnap.data();
          messageObj.key = qDocSnap.id;
          messageObj.author = this.getUserForID(messageObj.author);
          chat.messages.push(messageObj);
        });
        notifyOnUpdate(); // call back to the subscriber
    });
  }

  unsubscribeFromChat = (chat) => {
    // don't really need 'chat' but could need it in the future
    if (this.chatSnapshotUnsub) {
      this.chatSnapshotUnsub();
    }
  }


  getOrCreateChat = async (user1, user2) => {

    // look for this chat in the existing data model 'chats' array
    // if it's here, we know it's already in Firebase
    for (let chat of this.chats) {
      // we need to use user keys to look for a match
      // and we need to check for each user in each position
      if (( chat.participants[0].key === user1.key && 
            chat.participants[1].key === user2.key) ||
          ( chat.participants[0].key === user2.key &&
            chat.participants[1].key === user1.key)){
        return chat; // if found, return it and we're done
      }
    }

    // chat not found, gotta create it. Create an object for the FB doc
    let newChatDocData = { participants: [user1.key, user2.key] };
    // add it to firebase
    let newChatDocRef = await this.messagesRef.add(newChatDocData);
    // create a local chat object with full-fledged user objects (not just keys)
    let newChat = {
      participants: [user1, user2],
      key: newChatDocRef.id, // use the Firebase ID
      messages: []
    }
    // add it to the data model's chats, then return it
    this.chats.push(newChat);
    return newChat;
  }

  getChatForID = (id) => {
    for (let chat of this.chats) {
      if (chat.key === id) {
        return chat;
      }
    }

  }

  addChatMessage = async (chatID, message) => { // doesn't need to be async?

    let messagesRef = this.messagesRef.doc(chatID).collection('messages');

    let fbMessageObject = {
      type: 'text',
      text: message.text,
      timestamp: message.timestamp,
      author: message.author.key,
    }

    messagesRef.add(fbMessageObject); // onSnapshot will update local model
  }

  addChatImage = async (chat, author, imageObject) => {
    console.log('... and here we would add the image ...');

    let chatID = chat.key;
    let messagesRef = this.messagesRef.doc(chatID).collection('messages');

    // this creates a different object to put into Firebase
    let fbImageObject = {
      imageURL: imageObject.uri,
      author: author.key,
      timestamp: Date.now(),
     
    }
    // console.log(fbImageObject);
    await messagesRef.add(fbImageObject); 

    // Set up storage refs and download URL
    let picFileName = '' + Date.now();
    let imageRef = this.storageRef.child(picFileName);

    // fetch the image object from the local filesystem
    let response = await fetch(imageObject.uri);
    let imageBlob = await response.blob();

    // then upload it to Firebase Storage
    await imageRef.put(imageBlob);
    
    }

    getListsFromFirebase = async () => {  //gets firebase collection and sets it to this.state.theMainList
      this.groceryList = [];
      let qSnap = await this.groceryListCollectionRef.get();
      qSnap.forEach(qDocSnap => {
        let data = qDocSnap.data();
        data.key = qDocSnap.id;
        this.groceryList.push(data);
      });
    }


    getItemsFromFirebase = async (listID) => {  //gets firebase collection and sets it to this.state.theMainList
      this.secondaryGroceryList = [];
      let listRef = this.groceryListCollectionRef.doc(listID)
      let qSnap = await listRef.collection('items').get();
      qSnap.forEach(qDocSnap => {
        let data = qDocSnap.data();
        data.key = qDocSnap.id;
        this.secondaryGroceryList.push(data);
        
        // console.log ("list inventory in getitemsfromfirebase", listInventory)
        
      });
    }

    addList = async (itemText,userObject) => {
      if (itemText) { // false if undefined
        let docRef = await this.groceryListCollectionRef.add({text:itemText,author:userObject.key});
        this.groceryList.push({
          text: itemText, 
          key: docRef.id,
          author: userObject.key
        });
        // console.log("grocerylist", this.groceryList);

      }   
    }

    addListItem = async (itemText,listKey,itemQuantity) => {
 
      
      if (itemText) { // false if undefined
        let itemListRef = this.groceryListCollectionRef.doc(listKey).collection("items");
        
        let itemRef = await itemListRef.add({text:itemText,quantity:itemQuantity});
        this.secondaryGroceryList.push({
          text: itemText, 
          key: itemRef.id, 
          quantity: itemQuantity  
        });
      }  
    }
    


    updateList = async (itemKey, itemText) => {
      let docRef = this.groceryListCollectionRef.doc(itemKey);
      await docRef.update({text:itemText});
  
      let foundIndex = -1;
      for (let idx in this.groceryList) {
        if (this.groceryList[idx].key === itemKey) {
          foundIndex = idx;
          break;
        }
      }
      if (foundIndex !== -1) { // silently fail if item not found
        itemText.key = itemKey;
        this.groceryList[foundIndex].text = itemText;
      }
    }

    updateListItem = async (itemKey,listID,itemText,itemQuantity) => {
      let itemListRef = this.groceryListCollectionRef.doc(listID).collection("items");
      let docRef = itemListRef.doc(itemKey);
      await docRef.update({
        text:itemText,
        quantity: itemQuantity
      });
  
  
      let foundIndex = -1;
      for (let idx in this.secondaryGroceryList) {
        if (this.secondaryGroceryList[idx].key === itemKey) {
          foundIndex = idx;
          break;
        }
      }
      if (foundIndex !== -1) { // silently fail if item not found
        itemText.key = itemKey;
        itemQuantity.quantity = itemQuantity;
        this.secondaryGroceryList[foundIndex].text = itemText;
        this.secondaryGroceryList[foundIndex].quantity = itemQuantity
      }
      
    }

    

    deleteList = async (itemKey) => {
      let docRef = this.groceryListCollectionRef.doc(itemKey);
      await docRef.delete();
  
      let foundIndex = -1;
      for (let idx in this.groceryList) {
        if (this.groceryList[idx].key === itemKey) {
          foundIndex = idx;
          break;
        }
      }
      if (foundIndex !== -1) { // silently fail if item not found
        this.groceryList.splice(foundIndex, 1); // remove one element 
      }
    }
    deleteListItem = async (itemKey,listID) => {
      let itemListRef = this.groceryListCollectionRef.doc(listID).collection("items");
      let docRef = itemListRef.doc(itemKey);
      await docRef.delete();
  
      let foundIndex = -1;
      for (let idx in this.secondaryGroceryList) {
        if (this.secondaryGroceryList[idx].key === itemKey) {
          foundIndex = idx;
          break;
        }
      }
      if (foundIndex !== -1) { // silently fail if item not found
        this.secondaryGroceryList.splice(foundIndex, 1); // remove one element 
      }

    }
    
  

    
    
    

}





let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}