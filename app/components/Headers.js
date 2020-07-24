import React from "react";
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import {
  Button,
  Text,
  Header, Left, Body, Right
} from 'native-base';
import appStyles from '../theme/appStyles';
import { Colors, ActionTypes, Screens } from '../constants';
import Logo from './Logo';
import Svgicon from './Svgicon';

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visibleModal:false
    }
  }

  render() {
if (this.props.navigation.state.routeName === "Home") {
  leftRender =  <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
                  <Svgicon color={Colors.white} name="menu" />
                </Button>

  rightRender = <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.navigate(Screens.AddEditDrink.route)}>
                  <Svgicon color={Colors.white} name="plus"/>
                </Button>
} else {
  leftRender = <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.navigate(Screens.Home.route)}>
                  <Svgicon color={Colors.white} name="arrow-left"/>
                </Button>;
  rightRender = <Text></Text>;
}

    return (
        <Header transparent>
          <Left style={appStyles.row}>
           {leftRender}
          </Left>
          <Body style={appStyles.rowXcenter}>
            <TouchableWithoutFeedback onPress={() => this.props.showModal()}>
              <Logo header={true} />
            </TouchableWithoutFeedback>
          </Body>
          <Right style={appStyles.row}>
            {rightRender}
          </Right>
        </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
      showModal: () => {
        dispatch({ type: ActionTypes.SHOWMODAL, showModal: true })
      },
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);