import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import RNShake from 'react-native-shake';

let counter = 0;

const {height, width} = Dimensions.get('window');

const H1 = props => {
  return (
    <Text
      style={[
        {fontFamily: 'Quicksand-Bold', fontSize: 16, color: '#0E2B5A'},
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

const H2 = props => {
  return (
    <Text
      style={[
        {fontFamily: 'Quicksand-SemiBold', fontSize: 16, color: '#0E2B5A'},
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

class App extends React.Component {
  state = {
    configOne: [
      {name: 'Dark StatusBar Icon', status: 0},
      {name: 'Light StatusBar Icon', status: 0},
    ],
    configTwo: [
      {name: 'Hide StatusBar', status: 0},
      {name: 'Show StatusBar ', status: 0},
    ],
    statusBarStyle: 'Dark StatusBar Icon',
    statusBarColor: '#000',
    statusBarHidden: 'Hide StatusBar',
    showConfig: true,
    picker1: false,
    picker2: false,
  };

  onTap = () => {
    if (this.state.showConfig == false) {
      counter++;
      if (counter >= 3) {
        counter = 0;
        this.setState({showConfig: true});
      }
      setTimeout(() => {
        counter = 0;
      }, 500);
    }
  };

  applyConfigOne = index => {
    let configOne = this.state.configOne;
    let statusBarStyle = configOne[index].name;
    configOne.forEach(el => (el.status = 0));
    configOne[index].status = 1;
    this.setState({configOne, statusBarStyle});
  };

  applyConfigTwo = index => {
    let configTwo = this.state.configTwo;
    let statusBarHidden = configTwo[index].name;
    configTwo.forEach(el => (el.status = 0));
    configTwo[index].status = 1;
    this.setState({configTwo, statusBarHidden});
  };

  changeColor = color => {
    color = color.trim();
    this.setState({statusBarColor: color});
  };

  componentDidMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      this.onTap();
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  render() {
    const {
      statusBarHidden,
      statusBarStyle,
      statusBarColor,
      showConfig,
      configOne,
      configTwo,
    } = this.state;
    if (statusBarHidden == 'Hide StatusBar') {
      isTranslucent = true;
      statusBarColorData = 'rgba(0,0,0,0)';
    } else {
      isTranslucent = false;
      statusBarColor == ''
        ? null
        : (statusBarColorData = statusBarColor.toLowerCase().trim());
    }

    console.disableYellowBox = true;

    statusBarStyle == 'Dark StatusBar Icon'
      ? (statusBarStyleContent = 'dark-content')
      : (statusBarStyleContent = 'light-content');
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}} onPress={this.onTap}>
        <StatusBar
          barStyle={statusBarStyleContent}
          translucent={isTranslucent}
          backgroundColor={statusBarColorData}
        />
        <WebView source={{uri: 'https://www.figma.com/mirror'}} />

        {showConfig ? (
          <View style={styles.blackScreen}>
            <View style={styles.menu}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <H2 style={styles.pickerItem2}>
                  Device Height: {Math.floor(height)}
                </H2>

                <H2 style={styles.pickerItem2}>
                  Device Width : {Math.floor(width)}
                </H2>
                {configOne.map((el, key) => {
                  if (el.status == 0) {
                    return (
                      <TouchableOpacity
                        style={styles.pickerItem}
                        key={key}
                        onPress={() => {
                          this.applyConfigOne(key);
                        }}>
                        <H2>{el.name}</H2>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={styles.pickerItemActive}
                        key={key}
                        onPress={() => {
                          this.applyConfigOne(key);
                        }}>
                        <H2>{el.name}</H2>
                      </TouchableOpacity>
                    );
                  }
                })}

                {configTwo.map((el, key) => {
                  if (el.status == 0) {
                    return (
                      <TouchableOpacity
                        style={styles.pickerItem}
                        key={key}
                        onPress={() => {
                          this.applyConfigTwo(key);
                        }}>
                        <H2>{el.name}</H2>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={styles.pickerItemActive}
                        key={key}
                        onPress={() => {
                          this.applyConfigTwo(key);
                        }}>
                        <H2>{el.name}</H2>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>

              {statusBarHidden == 'Hide StatusBar' ? null : (
                <TextInput
                  autoCapitalize={false}
                  value={statusBarColor}
                  placeholder="StatusBar Color - #ff9900"
                  style={[styles.dialog, {fontFamily: 'Quicksand-SemiBold'}]}
                  onChangeText={color => this.changeColor(color)}
                />
              )}

              <TouchableOpacity
                style={{alignItems: 'center', padding: 20}}
                onPress={() => this.setState({showConfig: false})}>
                <H1 style={{color: '#0E2B5A'}}>CLOSE</H1>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blackScreen: {
    backgroundColor: '#0008',
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  dialog1: {
    borderRadius: 10,
    padding: 5,
    fontSize: 15,
    marginBottom: 10,
  },

  dialog: {
    borderColor: '#dfdfdf',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 17,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: 'red',
    padding: 10,
    position: 'absolute',
    width: '110%',
    zIndex: 1,
  },
  pickerItem: {
    borderColor: '#dfdfdf',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 17,
    marginBottom: 10,
    width: '48%',
  },
  pickerItemActive: {
    borderColor: '#dfdfdf',
    backgroundColor: '#dfdfdf',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 17,
    marginBottom: 10,
    width: '48%',
  },
  pickerItem2: {
    borderRadius: 10,
    padding: 15,
    fontSize: 17,
    marginBottom: 10,
    width: '48%',
  },
});

export default App;
