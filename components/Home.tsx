import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacity,
  ImageStyle
} from 'react-native';

interface IProps {
  title?: StyleProp<TextStyle>;
  button?: StyleProp<ViewStyle>;
  navigation?: {
    navigate: Function;
  };
}

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  button: ViewStyle;
  getStarted: TextStyle;
  icon: ImageStyle;
}

export default function Home(props: IProps) {
  const { button, navigation } = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center'
        }}
      >
        <Text style={styles.title} testID="home-title">
          You have no activity yet
        </Text>
      </View>

      <View style={{ justifyContent: 'flex-end' }}>
        <Text style={styles.getStarted} testID="get-started-text">
          Get Started
        </Text>
        <TouchableOpacity
          onPress={() => navigation?.navigate('ActivityPage')}
          style={[styles.button, button]}
          testID="get-started-action"
        >
          <AntDesign
            name="arrowright"
            size={30}
            color="#fff"
            style={{ color: '#fff', textAlign: 'center' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 32,
    lineHeight: 43.58,
    marginTop: '-150%'
  },
  button: {
    backgroundColor: '#BB0A21',
    width: 277,
    borderRadius: 10,
    padding: 10,
    color: '#fff'
  },
  getStarted: {
    fontSize: 16,
    lineHeight: 18.75,
    color: '#6B818C',
    textAlign: 'center'
  },
  icon: {
    resizeMode: 'contain',
    borderEndWidth: 5,
    borderColor: '#fff'
  }
});
