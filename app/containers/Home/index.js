import React from "react";
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers, BeerItem, BeerInput } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as beerActions from "../../actions/beer";
import appStyles from '../../theme/appStyles';
import styles from './styles';



export const gatherBeers = (dispatch, token) => {
  return async function(dispatch, getState) {
    const res = dispatch(beerActions.getBeers(token));
  };
};




class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render(){
    this.props.getTheBeers(this.props.token);
    console.log('beerList', this.props.beerList);
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
            <View style={appStyles.contentBg}>

              <Text>Lets fills this thing up 

              { this.props.beerList[0].beerName }


                
                </Text>

            </View>
          </Content>
         </ImageBackground>
      </Container>     
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    beerList: state.beer.beerList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      getTheBeers: (token) => dispatch(gatherBeers(dispatch, token))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);