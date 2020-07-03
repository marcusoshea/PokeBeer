import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text } from 'native-base';
import { required, email } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from './styles';

class SignInForm extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
        <Field 
          name="username" 
          component={InputBox} 
          placeholder="Email"
          keyboardType={'email-address'}
          icon='user'
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: 'Email Required'}), email({msg: 'Email not valid'})]}
        />
        <Field 
          name="password" 
          component={InputBox} 
          placeholder="Password"
          secureTextEntry={true}
          icon='lock'
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: 'Password Required'})]}
        />
      </Form>
    )
  }
}


const signinform = reduxForm({
  form: 'signinForm',
})(SignInForm);

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signinform);