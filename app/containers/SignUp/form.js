import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text } from 'native-base';
import { required, email, length, confirmation } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from './styles';

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
        <Field 
          name="name" 
          component={InputBox} 
          placeholder="Name"
          keyboardType={'default'}
          icon='user'
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: 'Name Required'})]}
        />
        <Field 
          name="email" 
          component={InputBox} 
          placeholder="Email"
          keyboardType={'email-address'}
          icon='mail'
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
          validate={[required({msg: 'Password Required'}),length({ minimum: 4,msg: 'Password too short' })]}
        />
        <Field 
          name="confirmpass" 
          component={InputBox} 
          placeholder="Confirm Password"
          secureTextEntry={true}
          icon='lock'
          iconStyle={{top:5,paddingLeft:15}}
          validate={[confirmation({ field: 'password', msg: 'Password does not match' })]}
        />
      </Form>
    )
  }
}


const signupform = reduxForm({
  form: 'signupForm',
})(SignUpForm);

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signupform);