import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback} from 'react-native'
import _ from 'lodash'; 
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Icon,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Spinner, Row, Col
} from 'native-base';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import * as Animatable from 'react-native-animatable';

import { Layout, Colors, Screens, ActionTypes } from '../../constants';
import { Logo, Statusbar, Loader } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import { showToast } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import styles from './styles';
import SignInForm from './form';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visibleModal: false,
    };
  }

  componentDidMount() {
    if(this.props.user!=null && this.props.token!=null){
      this.props.navigation.navigate(Screens.SignInStack.route);
    }
  }

  onSignupButtonPressHandler(){
    this.props.navigation.navigate(Screens.SignUp.route)
  }

  onForgotPasswordPressHandler(){
    this.props.navigation.navigate(Screens.ForgotPassword.route)
  }

  signin(values, dispatch, props){
    serverFail = true;
    setTimeout(() => {
      if (serverFail) {
        showToast("Server Error","danger");
        setTimeout(() => {
          dispatch({ type: ActionTypes.LOADING, isLoading: false });
        }, 3000);
      }
    }, 5000);
    dispatch(userActions.signin(values))
      .then(res => {
        serverFail = false;
        if(res?.token?.length > 0){
          dispatch(NavigationActions.navigate({ routeName: Screens.Home.route }));
        } else {
          showToast("Email/Password incorrect","danger");
          setTimeout(() => {
            dispatch({ type: ActionTypes.LOADING, isLoading: false });
          }, 3000);
        }
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message){
         showToast(message,"danger");
         dispatch({ type: ActionTypes.LOADING, isLoading: false });
       }
       console.log(`
          Error messages returned from server:`, messages )
      });
  }

  render(){

    if(this.props.user==null || this.props.token==null){
      // Login 
      return (
        <Container style={appStyles.container}>
          <ImageBackground 
              source={imgs.bg} 
              style={ { width: Layout.window.width, height: Layout.window.height }}>
            <Content enableOnAndroid>
              <View style={{flexDirection: 'column', flex:1}}>
                <View style={{flex: 0.8,height: Layout.window.height-80,}}>
                  <View style={appStyles.rowXcenter}>
                    <TouchableWithoutFeedback onPress={() => this.props.resetState()}>
                      <Logo style={appStyles.loginLogo} />
                    </TouchableWithoutFeedback >
                    <TouchableWithoutFeedback onPress={() => this.props.showModal()}>
                      <Text style={appStyles.loginMidText}>Signin to Get Started!</Text>
                    </TouchableWithoutFeedback >
                  </View> 

                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}
                    style={styles.loginBox}>
                    <SignInForm onSubmit={this.signin} />
                    <Row>
                      <Col>
                        <Button transparent full  
                          onPress={() => this.onSignupButtonPressHandler()}
                          style={[styles.linkTextBtn,{justifyContent:'flex-start'}]}
                        >
                          <Text style={[styles.linkText,appStyles.textLeft]} > Create Account </Text>
                        </Button> 
                      </Col>
                      <Col>
                        <Button transparent full  
                          onPress={() => this.onForgotPasswordPressHandler()}
                          style={[styles.linkTextBtn,{justifyContent:'flex-end'}]}
                        >
                          <Text style={[styles.linkText,appStyles.textRight]} > Forgot Password </Text>
                        </Button>
                      </Col>
                    </Row>
                  </Animatable.View>
                </View>  
                <Animatable.View 
                    animation="fadeIn"
                    delay={1000} 
                    style={{flex: 0.2,height: 80,}}> 
                  { this.props.isLoading ? 
                     <Spinner color={Colors.secondary} /> : 
                      <Button
                        full
                        primary
                        style={appStyles.btnSecontary}
                        onPress={() => this.props.pressSignin()}
                      >
                        <Text> Sign in </Text>
                      </Button>
                  }
                </Animatable.View>  
              </View>  
            </Content>
           </ImageBackground>
        </Container>
       
      );
    }else{
      // Authenticating
      return (<Loader />);
    }
  }
}
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    isLoading: state.common.isLoading,
    userId: state.auth.id,
    user: state.auth.user,
    token: state.auth.token,
    language: state.auth.language,
    languageSet: state.auth.languageSet || 0,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      pressSignin: () => dispatch(submit('signinForm')),
      showModal: () => dispatch({ type: ActionTypes.SHOWMODAL, showModal: true }),
      resetState: () => dispatch({ type: ActionTypes.RESETSTATE })
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
