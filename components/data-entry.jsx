import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Style from '../style/data-entry';

const DataEntry = ({ navigation, route }) => {
  const { type, placeholder, current } = route.params;

  const [ user, setUser ] = useState(current);

  const toHome = useCallback(() => {
    navigation.navigate({
      name:   'Home',
      params: { data: user, type },
      merge:  true
    });
  }, [ navigation, user ]);

  return (
    <View style={Style.container}>
      <TextInput style={Style.textInput}
        placeholder={placeholder}
        autoCorrect={false}
        value={user}
        onChangeText={setUser} />
      <TouchableOpacity style={Style.submitButton}
        onPress={toHome}>
        <Text style={Style.submitText}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

DataEntry.propTypes = {
  navigation: PropTypes.object.isRequired,
  route:      PropTypes.object.isRequired
};

export default DataEntry;
