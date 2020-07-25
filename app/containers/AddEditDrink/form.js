import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { Form } from 'native-base';
import { required } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from './styles';
import { AirbnbRating } from 'react-native-elements';
import { Colors } from '../../constants';

class BeerForm extends React.Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
  }

  changeRate(name, value) {
    this.props.change(name, value) // function provided by redux-form
  }

  renderField = (field) => {
    return (<AirbnbRating {...field} ratingColor='purple'
      ratingCount={5}
      startingValue={Math.max(1, this.props.beerData.BeerRating)}
      initialRating={Math.max(1, this.props.beerData.BeerRating)}
      imageSize={20}
      ratingColor='black'
      tintColor={Colors.secondaryLight}
      onFinishRating={(value) => { this.changeRate("BeerRating", value) }}
    />)

  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
        <Field
          name="BeerName"
          component={InputBox}
          placeholder="Drink Name"
          keyboardType={'default'}
          icon='user'
          iconStyle={{ top: 5, paddingLeft: 15 }}
          validate={[required({ msg: 'Drink Name Required' })]}
          value={this.props.beerData.BeerName}
        />
        <Field
          name="BeerDescription"
          component={InputBox}
          placeholder="Description"
          keyboardType={'default'}
          icon='user'
          iconStyle={{ top: 5, paddingLeft: 15 }}
          value={this.props.beerData.BeerDescription}
        />
        <Field
          name="Rating"
          component={this.renderField}
          value="5"
        />

      </Form>
    )
  }
}

const beerform = reduxForm({
  form: 'beerForm',
})(BeerForm);

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(beerform);