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
import { TextInput } from 'react-native'

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
      startingValue={Math.max(1, this.props.beerData.beerRating)}
      initialRating={Math.max(1, this.props.beerData.beerRating)}
      defaultRating={Math.max(this.props.beerData.beerRating)}
      imageSize={20}
      ratingColor='black'
      tintColor={Colors.secondaryLight}
      onFinishRating={(value) => { this.changeRate("beerRating", value) }}
    />)
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
        <Field
          name="beerName"
          component={InputBox}
          placeholder="Drink Name"
          keyboardType={'default'}
          icon='rest'
          iconStyle={{ top: 5, paddingLeft: 15 }}
          validate={[required({ msg: 'Drink Name Required' })]}
        />
        <Field
          name="beerDescription"
          component={InputBox}
          placeholder="Description"
          keyboardType={'default'}
          icon='tago'
          iconStyle={{ top: 5, paddingLeft: 15 }}
        />
        <Field
          name="Rating"
          component={this.renderField}
        />
      </Form>
    )
  }
}

BeerForm = reduxForm({
  form: 'beerForm',
})(BeerForm);

export default connect(state => (
  {
    initialValues: {
      beerDescription: state.beer.selectedBeer.beerDescription,
      beerName: state.beer.selectedBeer.beerName,
    }
  }))(BeerForm);


  