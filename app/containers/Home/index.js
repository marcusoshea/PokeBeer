import React from "react";
import { View, ImageBackground } from 'react-native'
import _ from 'lodash';
import { Layout, Colors, Screens, ActionTypes } from '../../constants';
import { Svgicon, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Button,
  Text
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as beerActions from "../../actions/beer";
import appStyles from '../../theme/appStyles';

import { Rating } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

export const gatherBeers = (dispatch, token) => {
  return async function (dispatch, getState) {
    const res = dispatch(beerActions.getBeers(token));
  };
};

export const addOrEditBeerToNavigate = (dispatch, userId, beer) => {
  return async function (dispatch, getState) {
    const res = dispatch({ type: ActionTypes.SELECTEDBEER, data: beer });
    if (beer !== undefined) {
      dispatch(NavigationActions.navigate({ routeName: Screens.AddEditDrink.route, userId: userId, beer: beer }));
    } else {
      dispatch(NavigationActions.navigate({ routeName: Screens.AddEditDrink.route, userId: userId }));
    }
  };
}

export const resetBeer = (dispatch) => {
  return async function (dispatch, getState) {
    const res = dispatch({ type: ActionTypes.SELECTEDBEER, data: '' });
  };
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.getTheBeers(this.props.token);
    this.props.resetSelectedBeer();
  }
  render() {
    var myloop = [];

    for (let i = 0; i < this.props.beerList.length; i++) {
      myloop.push(
        <View style={appStyles.contentBg} key={this.props.beerList[i].beerId}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{this.props.beerList[i].beerName}</Text>
          <Text style={{ paddingLeft: 10 }}>{this.props.beerList[i].beerDescription}</Text>
          <Rating
            type='heart'
            ratingColor='purple'
            isDisabled={true}
            ratingCount={5}
            startingValue={Math.max(1, this.props.beerList[i].beerRating)}
            imageSize={30}
            readonly
            ratingColor='black'
            tintColor={Colors.secondaryLight}
          />
          <Button transparent style={appStyles.rowBtn} onPress={() => this.props.setSelectedBeer(this.props.userId, this.props.beerList[i])}>
            <Svgicon color={Colors.black} name="arrow-right" />
          </Button>
        </View>
      );
    }
    if (this.props.beerList === undefined || this.props.beerList.length <= 0) {
      myloop.push(
        <View key="1" style={appStyles.contentBg}>
          <Text style={{ paddingTop: 30 }}>You haven't rated any drinks yet.</Text>
          <Button transparent style={appStyles.rowBtn} onPress={() => this.props.setSelectedBeer(this.props.userId)}>
            <Svgicon color={Colors.black} name="more" />
          </Button>
        </View>
      );
    }

    return (

      <Container style={appStyles.container}>
        <View style={{ flex: 1 }}>
          <NavigationEvents
            onWillFocus={() => {
              this.props.getTheBeers(this.props.token);
              this.props.resetSelectedBeer();
            }}
          />
        </View>
        <ImageBackground
          source={imgs.bg}
          style={{ width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
            <View>
              {myloop}
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
    beerList: state.beer.beerList,
    userId: state.auth.userId,
    selectedBeer: state.beer.selectedBeer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    getTheBeers: (token) => dispatch(gatherBeers(dispatch, token)),
    setSelectedBeer: (userId, beer) => dispatch(addOrEditBeerToNavigate(dispatch, userId, beer)),
    resetSelectedBeer: () => dispatch(resetBeer(dispatch)),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
