import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
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

import { Layout, Colors, Screens } from '../../constants';
import { Logo, Statusbar, LoginBackIcon } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import ForgotForm from './form';
import { showToast } from '../../utils/common';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  reset(values, dispatch, props){
    dispatch(userActions.forgotpassword(values))
      .then(res => {
        if(res.status == 200){
          showToast(res.data.message,"success");
          dispatch(NavigationActions.navigate({ routeName: Screens.SignIn.route }));
        }else{
          showToast(res.data.message,"danger");
        }
      });
  }

  render(){

    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Content enableOnAndroid>
            <View style={{flexDirection: 'column', flex:1}}>
              <View style={{flex: 0.8,height: Layout.window.height-80,}}>
                <View style={appStyles.row}>
                  <LoginBackIcon props={this.props} /> 
                  <Animatable.Text 
                    animation="fadeInDown"
                    style={appStyles.loginTitle}>Forgot Password</Animatable.Text>
                </View> 

                <Animatable.View 
                  animation="fadeInUp"
                  delay={500}
                  style={styles.loginBox}>
                  <ForgotForm onSubmit={this.reset} />
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
                      onPress={() => this.props.pressReset()}
                    >
                      <Text> Reset Password </Text>
                    </Button>
                }
              </Animatable.View>  
            </View>          
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    isLoading: state.common.isLoading,
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      pressReset: () => dispatch(submit('forgotForm')),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
