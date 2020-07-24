import React from "react";
import { AppRegistry, Image, StatusBar, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationActions } from 'react-navigation'
import {
  Button, View,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Body,
  Left,
  Thumbnail, Header,
  Footer
} from "native-base";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import imgs from '../../assets/images';
import appStyles from '../../theme/appStyles';
import { Screens, Colors, Layout } from '../../constants';
import styles from './styles';
import { getCurrentRoute } from '../../utils/common';
import { Svgicon, Headers } from '../../components';
import * as beerActions from "../../actions/beer";

export const gatherBeers = (dispatch, token) => {
  return async function (dispatch, getState) {
    const res = dispatch(beerActions.getBeers(token));
  };
};


class AddEditDrink extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.navigation.state && this.props.navigation.state.params) {
      console.log('tttt2', this.props.navigation.state.params.beer);
    }
    this.props.getTheBeers(this.props.token);
  }

  render(){
    return (


<Container style={appStyles.container}>
        <ImageBackground
          source={imgs.bg}
          style={{ width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          <Text>Screen for adding and editing drinks
              </Text>
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
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(userActions.logoutUser()),
      getTheBeers: (token) => dispatch(gatherBeers(dispatch, token))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AddEditDrink);