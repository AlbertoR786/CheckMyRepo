import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import Style from '../style/main';

const Home = ({ navigation, route }) => {
  const [ repo, setRepo ] = useState('');
  const [ user, setUser ] = useState('');

  const params = route.params;

  useEffect(() => {
    if (params) {
      const { data, type } = params;
      switch (type) {
        case 'repo':
          setRepo(data);
          break;
        case 'user':
          setUser(data);
          break;
            // no default
      }
    }
  }, [ params ]);

  const toUser = useCallback(() => {
    navigation.navigate({
      name:   'DataEntry',
      params: {
        type:        'user',
        name:        'USER',
        placeholder: 'Type your github username'
      },
      merge: true
    });
  }, [ navigation ]);

  const toRepo = useCallback(() => {
    navigation.navigate({
      name:   'DataEntry',
      params: {
        type:        'repo',
        name:        'REPOSITORY',
        placeholder: 'Type your repository name'
      },
      merge: true
    });
  }, [ navigation ]);

  const repoText = repo.length > 0 ? repo : 'Repo';
  const userText = user.length > 0 ? user : 'User';

  return (
    <View style={Style.container}>
      <Text style={Style.title}>
        Set the repository address
      </Text>
      <Text style={Style.gitText}>
        github.com
      </Text>
      <View style={Style.flexRow}>
        <Text style={Style.gitText}>/</Text>
        <TouchableOpacity onPress={toUser}>
          <Text style={Style.dataText}>{userText}</Text>
        </TouchableOpacity>
      </View>
      <View style={Style.flexRow}>
        <Text style={Style.gitText}>/</Text>
        <TouchableOpacity onPress={toRepo}>
          <Text style={Style.dataText}>{repoText}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={Style.submitButton}
        onPress={console.log}>
        <Text style={Style.submitText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
  route:      PropTypes.object.isRequired
};

export default Home;
