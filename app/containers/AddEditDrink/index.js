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
import { Svgicon } from '../../components';


class AddEditDrink extends React.Component {
  constructor(props) {
    super(props);
    this.listItems = [ Screens.Home,Screens.Settings, Screens.AddEditDrink];
  }

  render() {
    return (
      <Container>
        <Content>

        </Content>
        <Footer style={styles.logoutFooter}>

        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    user: state.auth.user,
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AddEditDrink);