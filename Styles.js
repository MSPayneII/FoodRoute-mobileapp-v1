import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#82AC45', 
  primaryDark: '#303F9F', 
  primaryLight: '#E8EAF6', 
  outline: '#BDBDBD',
  navButtonHelper: '#e96044',
  navButtonHelpee: '#e9af3f'
}

export const loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20
    },
      topView: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
      },
        logoImage: {
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
          height: '70%',
          resizeMode: 'contain',
        },
      middleView: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
        inputRow: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 15
        },
          inputLabel: {
            flex: 0.3,
            justifyContent: 'flex-end',
            paddingRight: 5,
            textAlign: 'right',
            fontSize: 15
          },
          inputText: {
            flex: 0.5,
            borderColor: colors.outline,
            paddingLeft: 5,
            borderBottomWidth: 1,
            fontSize: 18,
          },
        bottomView: {
          flex: 0.3,
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
          buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.outline,
            borderRadius: 6,
            backgroundColor: colors.primary,
            width: 180,
            height: 60,
          },
            buttonText: {
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
            }
  });

  export const profileStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20
    },
      topView: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
      },
        logoImage: {
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
          height: '70%',
          resizeMode: 'contain',
        },
      middleView: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
        inputRow: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 15,
          
          
        },
          inputLabel: {
            flex: 0.3,
            justifyContent: 'flex-end',
            paddingRight: 5,
            textAlign: 'right',
            fontSize: 15
          },
          inputText: {
            flex: 0.5,
            borderColor: colors.outline,
            paddingLeft: 5,
            borderBottomWidth: 1,
            fontSize: 18,
          },
          inputTextField: {
            height: 40,
            width: '70%',
            borderColor: colors.outline,
            paddingLeft: 5,
            borderBottomWidth: 1,
            fontSize: 18,
          },
        
          buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.outline,
            borderRadius: 6,
            backgroundColor: colors.primary,
            width: 150,
            height: 50,
          },
            buttonText: {
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
            },
            footer: {
              flex: 0.1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingBottom: 15,
              width: '100%',
              
            }
  });

  export const mainStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 5
    },
      topView: {
        flex: .9,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        
      },
      logoImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        height: '20%',
        resizeMode: 'contain',
      },
      promptText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 25
      },
        
          inputText: {
            flex: 0.5,
            borderColor: colors.outline,
            paddingLeft: 5,
            borderBottomWidth: 1,
            fontSize: 18,
          },
        
          buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.outline,
            borderRadius: 20,
            backgroundColor: colors.primary,
            width: 200,
            height: 50,
          },
            buttonText: {
              textAlign: 'center',
              color: 'white',
              fontSize: 20,
            },

          footer: {
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: 15,
            width: '100%',
            
          }
  });

  export const listStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    separator: {
        width: '100%', 
        height: 1, 
        backgroundColor: colors.primaryLight
    },
    
    promptText: {
      color: 'black',
      fontSize: 20,
      fontWeight: '500',
      paddingTop: 20,
      paddingBottom: 25,
      textAlign: 'center'
    },
    body: {
      flex: 0.4,
      alignItems: 'stretch',
      justifyContent: 'center',
      width: '100%',
      padding: '5%',
    },
      emptyListContainer: {  // added this to style the empty list message
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
      },
        emptyListText: {
          fontSize: 18,
        },

        buttonContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.outline,
          borderRadius: 20,
          backgroundColor: colors.primary,
          width: 245,
          height: 50,
        },
          buttonText: {
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
          },
      listHeaderText: {
        fontSize: 16,
        padding: 15
      },  
      listContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch', // this turns out to be important!
        padding: 15,
      },
        // List Home Screen body
        listItemContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        },
        listItemIcon: {
          paddingRight: 8,
        },
        listItemTextContainer: {
          flex: 0.8,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
          listItemText: {
            fontSize: 18,
          },
        listItemButtonContainer: {
          flex: 0.2,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },

        // Lists Screen body
        textInputContainer: {
          flex: .2,
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'row',
          paddingBottom: 15,
          paddingTop: 25,
        },
          textInputLabel: {
            fontSize: 18,
            paddingBottom: 10
          },
          textInputBox: {
            borderBottomColor: colors.outline,
            borderBottomWidth: 1,
            width: '60%', 
            height: 25, 
            fontSize: 18,
          },
           quantContainer: {
            flex: .2,
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row',
            paddingBottom: 15,
            paddingTop: 25,
            paddingRight: 50
            
          },
           quantInputLabel:{
            fontSize: 18,
            paddingBottom: 10,
            
           },

           quantSpinner: {
            flexDirection: 'row'

           },

    footer: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      
    },

      // list Screen footer
      footerButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
        footerAddButton: {
          paddingBottom: 40,
        },
        footerButton: {
          flex: 0.2,
          borderRadius: 12,
          borderColor: colors.outline,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          marginHorizontal: '5%',
          backgroundColor: colors.primary
        },
        footerButtonDisabled: {  //added to style the save button when disabled
          flex: 0.2,
          borderRadius: 12,
          borderColor: colors.outline,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          marginHorizontal: '5%',
          backgroundColor: colors.outline
        },
        navBar: {
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 15,
          width: '100%',
          
        },
        

      //List Items Screen

      footerListItems: {
        flex: .6,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      
        
});


export const messageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
    messageListContainer: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'stretch',
      width: '100%',
      alignSelf: 'center',
      paddingTop: '20%',
    },
      chatTextSelfContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5, 
        marginRight: 20,
        marginLeft: 40,
        backgroundColor: colors.primary,
        borderRadius: 6
      },
        chatTextSelf: {
          fontSize: 18,
          textAlign: 'right',
        },
      chatTextOtherContainer: {
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5, 
        marginLeft: 20,
        marginRight: 40,
        backgroundColor: colors.primaryLight,
        borderRadius: 6
      },
        chatTextOther: {
          fontSize: 18,
          textAlign: 'left',
        },
    inputContainer: {
      flex: 0.1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },  
      inputBox: {
        flex: 0.8,
        borderWidth: 1,
        borderColor: colors.primaryDark,
        borderRadius: 6,
        alignSelf: 'center',
        fontSize: 18,
        height: 40,
        padding: 5,
        margin: 5
      }
});

export const peopleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
    peopleListContainer: {
      flex: .9,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      width: '90%',
      paddingTop: 30,
    },  
      separator: {
        backgroundColor: colors.primaryLight,
        height: 1,
        width: '90%',
        alignSelf: 'center'
      },
      personRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10
      },
        personText: {
          fontSize: 16,
        },
      
      promptText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 25,
        textAlign: 'center'
      },
        footer: {
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 15,
          width: '100%',
          
        }
});

export const availablehelperstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar:{
    width: 40,
    height: 40,
  
  },
  separator: {
    backgroundColor: colors.primaryLight,
    height: 1,
    width: '90%',
    alignSelf: 'center'
  },
  header: {
    flex: .2,
    flexDirection: 'row',
    backgroundColor:'#00316e',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerSection: {
    flex: .1,
    justifyContent: 'center',  
    alignItems: 'flex-start',
  },
  promptText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 25,
  },
  
  todaysDate: {
    color: colors.navButtonHelper,
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'700'
  },
  
  body: {
    flex: .7,
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
  },
  listItem: {
    flex:.5,
    flexDirection: 'row',
    paddingBottom: 8,
  },
  rankSection: {
    flex: .08,
  },
  helperinfo: {
    flex: .9,
  },
  messageSection: {
    flex: .2,
  },
  listNumber: {
    color: '#842bd7',
    fontSize:20, 
    alignSelf: 'flex-start'
  },
  listUniv: {
    color: '#1520a6',
    fontSize:14,
  },
  listSchool: {
    color: '#000000',
    fontSize:10,
  }
});