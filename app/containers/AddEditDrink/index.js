import React from 'react'
import { StyleSheet, View, ImageBackground, Image } from 'react-native'
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
  Input,
  Spinner, Row, Col, Toast
} from 'native-base';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import { bindActionCreators } from "redux";
import * as Animatable from 'react-native-animatable';

import { Layout, Colors, Screens } from '../../constants';
import { Headers } from '../../components';
import imgs from '../../assets/images';
import * as beerActions from "../../actions/beer";
import { showToast } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import styles from './styles';
import BeerForm from './form';


export const drinkBeer = (values, state, props, dispatch) => {
  return async function (dispatch, getState) {
  values.beerImageLink = '';
  values.beerId = state.beerId;
  if (values.beerRating === undefined) {
    values.beerRating = 3;
  }

  if (state.beerId > 0) {
    dispatch(beerActions.editBeer(values, state.userId, state.token))
      .then(res => {
        showToast("Bottoms Up!", "success", 3000);
          setTimeout(function(){ 
            dispatch(NavigationActions.navigate({ routeName: Screens.Home.route })); }, 2000);
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message) {
          showToast(message, "danger");
        }
        console.log(`
        Error messages returned from server:`, messages)
      });

  } else {
    if (values.beerRating === undefined) {
      values.beerRating = 3;
    }
    dispatch(beerActions.addBeer(values, state.userId, state.token))
      .then(res => {
          showToast("Bottoms Up!", "success", 3000);
          setTimeout(function(){ 
            dispatch(NavigationActions.navigate({ routeName: Screens.Home.route })); }, 2000);
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message) {
          showToast(message, "danger");
        }
        console.log(`
        Error messages returned from server:`, messages)
      });
  }
};
} 

export const throwAwayBeer = (state, dispatch) => {
  return async function (dispatch) {
    dispatch(beerActions.throwAwayBeer(state.userId, state.beerId, state.token))
      .then(res => {
        showToast("All the rum is gone.", "success", 3000);
          setTimeout(function(){ 
            dispatch(NavigationActions.navigate({ routeName: Screens.Home.route })); }, 2000);
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message) {
          showToast(message, "danger");
        }
        console.log(`
        Error messages returned from server:`, messages)
      });
  };
} 

class AddEditDrink extends React.Component {
  constructor(props) {
    super(props);
    if (this.props && this.props.state && this.props.state.beer && this.props.state.beer.selectedBeer) {
      this.state = {
        beerId: this.props.state.beer.selectedBeer.beerId,
        beerName: this.props.state.beer.selectedBeer.beerName,
        beerDescription: this.props.state.beer.selectedBeer.beerDescription,
        beerRating: this.props.state.beer.selectedBeer.beerRating,
        beerImageLink: '',
        userId: this.props.state.auth.userId,
        token: this.props.token
      };
    } else {
      this.state = {
        beerId: '',
        beerName: '',
        beerDescription: '',
        beerRating: 3,
        beerImageLink: '',
        userId: this.props.state.auth.userId,
        token: this.props.token
      };
    }
  }

  render() {
    return (
      <Container style={appStyles.container}>
        <ImageBackground
          source={imgs.bg}
          style={{ width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          <BeerForm beerData={this.state} onSubmit={(values) => this.props.handleBeer(values, this.state, this.props)} />
            <Animatable.View
              animation="fadeIn"
              delay={1000}
              style={{ flex: 0.2, height: 80, }}>
              {this.props.isLoading ?
                <Spinner color={Colors.secondary} /> :
                <Button
                  full
                  primary
                  style={appStyles.btnSecontary}
                  onPress={() => this.props.pourBeer()}
                >
                  <Text style={{ fontWeight: 'bold', fontSize:16 }}>Update</Text>
                </Button>
              }
            </Animatable.View>

            <Animatable.View
              animation="fadeIn"
              delay={1000}
              style={{ flex: 0.2,}}>
              {this.props.isLoading ?
                <Spinner color={Colors.secondary} /> :
                <Button
                  full
                  primary
                  style={appStyles.btnDelete}
                  onPress={() => this.props.removeBeer(this.state)}
                >
                  <Text>Remove</Text>
                </Button>
              }
            </Animatable.View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    user: state.auth.user,
    token: state.auth.token,
    selectedBeer: state.beer.selectedBeer
  };
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    pourBeer: () => dispatch(submit('beerForm')),
    handleBeer: (values, beerState, beerProps) => dispatch(drinkBeer(values, beerState, beerProps, dispatch)),
    removeBeer: (beerState) => dispatch(throwAwayBeer(beerState, dispatch)),
  };
};


// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AddEditDrink);