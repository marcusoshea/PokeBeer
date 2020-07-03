import {Colors,Layout} from '../../constants/';
export default {
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle:{
    // marginTop: 5
    marginLeft:0
  },
  loginBox: {
    marginTop: -Layout.indent,
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
  },
  midText:{
    fontSize: 18,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
  },
  linkTextBtn:{
    marginTop:Layout.indent
  },
  linkText:{
    textTransform:'capitalize',
    color: Colors.white,
    fontSize:16,

  },
  button: {
    backgroundColor: Colors.secondary,
  },
  formMsg: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'center',
    backgroundColor: "rgba(0,0,0,0)"
  },
  linky: {
    color: 'blue',
    paddingTop: 10
  },





    screen: {
      flex: 10,
      paddingBottom: 100
    },
    body: {
      padding: 25,
      paddingTop: 50,
      paddingBottom: 35
    },
    header: {
      width: "100%",
      height: 100,
      paddingTop: 36,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: Colors.primary,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    headerTitleText: {
      color: "black",
      fontSize: 18,
      fontWeight: "bold"
    },
    headerTitleContainer: {
      flex: 1,
      alignItems: 'flex-start'
    },
    headerIconContainer: {
      alignItems: 'flex-end'
    }

  





};