import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Style from '../style/main';

const DATA_STATE = {
  DATA_ERROR:     'DATA_ERROR',
  INTERNET_ERROR: 'INTERNET_ERROR',
  READY:          'READY'
};

const nullString = (string) => (string === undefined || string === null);

const checkUser = (user) => {
  if (nullString(user)) {
    return false;
  }

  if (user.length === 0) {
    return false;
  }

  return true;
};

const checkRepo = (repo) => {
  if (nullString(repo)) {
    return false;
  }

  if (repo.length === 0) {
    return false;
  }

  return true;
};

const getErrorMessage = (type) => {
  switch (type) {
    case DATA_STATE.DATA_ERROR:
      return (
        <View style={Style.flexRow}>
          <Text style={Style.defaultText}>
            <Text>Check your</Text>
            <Text style={Style.boldText}> username </Text>
            <Text>or your</Text>
            <Text style={Style.boldText}> repository </Text>
            <Text>name</Text>
          </Text>
        </View>
      );

    case DATA_STATE.INTERNET_ERROR:
      return (
        <View style={Style.flexRow}>
          <Text style={Style.defaultText}>
            <Text>Check your</Text>
            <Text style={Style.boldText}> internet connection</Text>
          </Text>
        </View>
      );

    default:
      return null;
  }
};

const Home = ({ navigation, route }) => {
  const [ repo, setRepo ] = useState('');
  const [ user, setUser ] = useState('');

  const [ dataState, setDataState ] = useState();

  const params = route.params;

  useEffect(() => {
    if (params) {
      const { data, type } = params;
      switch (type) {
        case 'repo':
          setRepo(data);
          setDataState();
          break;
        case 'user':
          setUser(data);
          setDataState();
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

  const getLabel = () => {
    const userOk = checkUser(user);
    const repoOk = checkRepo(repo);

    if (dataState === undefined || dataState === DATA_STATE.DATA_ERROR) {
      return 'CHECK';
    }

    if (userOk && repoOk) {
      return 'SEND';
    }

    return 'CHECK';
  };

  const onClick = useCallback(() => {
    NetInfo.fetch().then(({ isInternetReachable }) => {
      if (isInternetReachable) {
        if (dataState === DATA_STATE.READY) {
          console.log('sending');
          return;
        }

        const dataOk = checkUser(user) && checkRepo(repo);

        const _dataState = dataOk ? DATA_STATE.READY : DATA_STATE.DATA_ERROR;
        setDataState(_dataState);
      } else {
        setDataState(DATA_STATE.INTERNET_ERROR);
      }
    }).catch(() => setDataState(DATA_STATE.INTERNET_ERROR));
  }, [ dataState, user, repo ]);

  const repoText = repo.length > 0 ? repo : 'Repo';
  const userText = user.length > 0 ? user : 'User';

  const isError    = dataState !== undefined;
  const canSend    = dataState === DATA_STATE.READY;
  const sendStyle  = canSend ? Style.ready : {};
  const errorStyle = isError ? Style.error : {};
  const mainStyle  = { ...Style.container, ...errorStyle, ...sendStyle };

  return (
    <View style={mainStyle}>
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
      <View style={Style.flexRow}>
        {getErrorMessage(dataState)}
      </View>

      <TouchableOpacity style={Style.submitButton}
        onPress={onClick}>
        <Text style={Style.submitText}>
          {getLabel()}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
  route:      PropTypes.object.isRequired
};

export default Home;
