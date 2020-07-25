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

class AddEditDrink extends React.Component {
  constructor(props) {
    super(props);
    console.log('ttttttttttt', this.props);
    this.state = {
      BeerId: '',
      BeerName: '',
      BeerDescription: '',
      BeerRating: '1',
      BeerImageLink: '',
      user:''
    };
    if (this.props.navigation.state && this.props.navigation.state.params) {
      this.state = {
        BeerId: this.props.navigation.state.params.beer.BeerId,
        BeerName: this.props.navigation.state.params.beer.BeerName,
        BeerDescription: this.props.navigation.state.params.beer.BeerDescription,
        BeerRating: this.props.navigation.state.params.beer.BeerRating,
        BeerImageLink: this.props.navigation.state.params.beer.BeerImageLink,
        userId: this.props.navigation.state.params.userId
      };
    }
  }

  handleBeer(values, dispatch, props) {
    console.log('ttttt', props);
    if (props.beerData.BeerId.length > 0) {
      
      values.push({"BeerId":props.beerData.BeerId});

      dispatch(beerActions.editBeer(values))
        .then(res => {
          if (res.status == 200) {
            showToast(res.msg, "success");
            dispatch(NavigationActions.navigate({ routeName: Screens.SignIn.route }));
            // this.props.navigation.navigate(Screens.SignIn.route)
          } else {
            showToast(res.msg, "danger");
          }
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

      values.push({"user":props.user});

      dispatch(beerActions.addBeer(values))
        .then(res => {
          if (res.status == 200) {
            showToast(res.msg, "success");
            dispatch(NavigationActions.navigate({ routeName: Screens.SignIn.route }));
            // this.props.navigation.navigate(Screens.SignIn.route)
          } else {
            showToast(res.msg, "danger");
          }
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
  } 

  render() {
    return (
      <Container style={appStyles.container}>
        <ImageBackground
          source={imgs.bg}
          style={{ width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
            <BeerForm beerData={this.state} onSubmit={this.handleBeer} />
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
                  <Text>Update</Text>
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
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    pourBeer: () => dispatch(submit('beerForm')),
    handleBeer: (beer) => dispatch(beerActions.addBeer(beer)),
  };
};


// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AddEditDrink);