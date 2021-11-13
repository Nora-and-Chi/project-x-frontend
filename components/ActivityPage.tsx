import React, { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { daysOfTheWeek } from '../utils/constants';
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  TextInput,
  TouchableOpacity
} from 'react-native';

interface Styles {
  title: TextStyle;
  container: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  inputWrapper: ViewStyle;
  button: ViewStyle;
  daysOfTheWeekContainer: ViewStyle;
  selectedDaysOfWeek: ViewStyle;
  selectedButtonText: TextStyle;
  unSelectedButtonText: TextStyle;
}

interface IValues {
  name?: string;
  description?: string;
  motivation?: string;
  reminder?: string;
  selectedDays?: any;
  date?: any;
}
interface ActivityPageProps {
  navigation?: {
    navigate: Function;
  };
}

export default function ActivityPage({ navigation }: ActivityPageProps) {
  const [values, setValues] = useState<IValues>({ date: new Date() });
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const disableButton = !values.name || !values.motivation;

  function handleChange(name: string, event: string): void {
    setValues({
      ...values,
      [name]: event
    });
  }

  function handleDayOfWeekClick(day: string) {
    if (selectedDays.includes(day)) {
      const unselect = selectedDays.filter(selectedDay => selectedDay != day);
      setSelectedDays(unselect);
      setValues({
        ...values,
        selectedDays: selectedDays
      });
    } else {
      setSelectedDays([...selectedDays, day]);
      setValues({
        ...values,
        selectedDays: selectedDays
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Activity</Text>
      <View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label} testID="activity-name">
            Activity Name? (required)
          </Text>
          <TextInput
            testID="activity-input"
            value={values.name}
            placeholder="enter activity"
            onChangeText={event => handleChange('name', event)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            testID="description-input"
            value={values.description}
            placeholder="enter description"
            onChangeText={event => handleChange('description', event)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label} testID="days-of-week-label">
            What days would you practise this activity?
          </Text>
          <View
            testID="days-of-week-box"
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            {daysOfTheWeek?.map((day, index) => (
              <TouchableOpacity
                style={
                  selectedDays.includes(day)
                    ? styles.selectedDaysOfWeek
                    : styles.daysOfTheWeekContainer
                }
                key={index}
                onPress={() => handleDayOfWeekClick(day)}
              >
                <Text
                  style={
                    selectedDays.includes(day)
                      ? styles.selectedButtonText
                      : styles.unSelectedButtonText
                  }
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label} testID="motivation-label">
            What’s your motivation (required)
          </Text>
          <TextInput
            testID="motivation-input"
            multiline={true}
            numberOfLines={4}
            value={values.motivation}
            placeholder="enter motivation"
            onChangeText={event => handleChange('motivation', event)}
            style={[styles.input, { height: 100 }]}
            maxLength={40}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Set a reminder</Text>
          <RNDateTimePicker
            value={values.date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event: any) => handleChange('date', event)}
          />
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20
          }}
        >
          <TouchableOpacity
            onPress={() => navigation?.navigate('CameraComponent')}
            style={[
              styles.button,
              { backgroundColor: disableButton ? '#F5F5F5' : '#BB0A21' }
            ]}
            testID="get-started-action"
            disabled={disableButton}
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
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: '200',
    fontSize: 32,
    lineHeight: 43.58
  },
  label: {
    fontSize: 16,
    lineHeight: 18.75,
    color: '#6B818C'
  },
  input: {
    height: 41,
    borderWidth: 1,
    borderColor: '#E7E4E4',
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    padding: 10
  },
  inputWrapper: {
    marginTop: 15
  },
  daysOfTheWeekContainer: {
    borderWidth: 1,
    borderColor: '#E7E4E4',
    borderRadius: 5,
    fontWeight: 'bold',
    backgroundColor: '#F5F5F5',
    margin: 6,
    padding: 10
  },
  selectedDaysOfWeek: {
    borderWidth: 1,
    borderColor: '#BB0A21',
    backgroundColor: '#BB0A21',
    fontWeight: 'bold',
    borderRadius: 5,
    margin: 6,
    padding: 10,
    color: '#fff'
  },
  button: {
    backgroundColor: '#BB0A21',
    width: 277,
    borderRadius: 10,
    padding: 10,
    color: '#fff'
  },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  unSelectedButtonText: {
    fontWeight: 'bold'
  }
});
