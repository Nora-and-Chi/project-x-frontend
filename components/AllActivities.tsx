import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { activities } from '../utils/constants';
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity
} from 'react-native';

interface Styles {
  acitivityContainer: ViewStyle;
  container: ViewStyle;
  text: TextStyle;
  plus: ImageStyle;
  title: TextStyle;
}

interface AllActivitiesProps {
  navigation?: {
    navigate: Function;
  };
}

export default function AllActivities({ navigation }: AllActivitiesProps) {
  return (
    <View>
      <Text style={styles.title}>My Activities</Text>
      <View style={styles.container}>
        {activities.map(activity => (
          <TouchableOpacity key={activity.id} style={styles.acitivityContainer}>
            <Text style={styles.text}>{activity.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.plus}
          onPress={() => navigation?.navigate('ActivityPage')}
        >
          <AntDesign name="pluscircleo" size={98} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  title: {
    fontSize: 32,
    fontWeight: '400',
    margin: 19,
    lineHeight: 43.58
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  acitivityContainer: {
    height: 138,
    width: 148,
    backgroundColor: '#27292A',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 19,
    padding: 10
  },
  text: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 22,
    textAlign: 'center'
  },
  plus: {
    margin: 19,
    height: 138,
    width: 148,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
