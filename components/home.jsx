import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Style from '../style/main';

// replace this with sops or git-crypt!
const SEND_URL = 'https://pushmore.io/webhook/d3Gm4aEPCuhAUjfbECLLdW41';
const SENDER   = 'Alberto Ronchi <alberto.ronchi786@gmail.com>';

const DATA_STATE = {
  DATA_ERROR:     'DATA_ERROR',
  INTERNET_ERROR: 'INTERNET_ERROR',
  SEND_ERROR:     'SEND_ERROR',
  READY:          'READY',
  SENT:           'SENT'
};

const nullString = (string) => (string === undefined || string === null);

const checkUser = (user) => {
  if (nullString(user)) {
    return false;
  }

  if (user.length === 0) {
    return false;
  }

  // From github: Username may only contain alphanumeric characters or single
  // hyphens, and cannot begin or end with a hyphen.
  // gently offered by https://github.com/shinnn/github-username-regex

  const gitUserRegEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

  return gitUserRegEX.test(user);
};

const checkRepo = (repo) => {
  if (nullString(repo)) {
    return false;
  }

  if (repo.length === 0) {
    return false;
  }

  // github repo names must be shorter than 100 chars and contain only
  // alphanumeric and hypens
  const gitRepoRegEX = /^[A-Za-z0-9_.-]{0,38}$/i;

  return gitRepoRegEX.test(repo);
};

const sendRepo = (user, repo) => {
  const repoUrl = `https://github.com/${user}/${repo}`;
  const sender  = SENDER;
  const body    = { repoUrl, sender };

  return fetch(SEND_URL, {
    method: 'POST',
    body:   JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      return response.statusText;
    }

    return 'ERROR';
  }).then((status) => {
    // i know that the bot isn't perfect, and that there are some 200 that are
    // not successes. However i couldn't find any doc on these cases, and i
    // can't get one: so i assume that when the 200 isn't real, there is a
    // different statusText instead of empty string.
    if (status.length > 0) {
      return false;
    }

    return true;
  });
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

    case DATA_STATE.SEND_ERROR:
      return (
        <View style={Style.flexRow}>
          <Text style={Style.defaultText}>
            <Text>There was error with the bot. Try</Text>
            <Text style={Style.boldText}> sending it again</Text>
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

  const [ sending, setSending ]     = useState();
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
        current:     user,
        placeholder: 'Type your github username'
      },
      merge: true
    });
  }, [ navigation, user ]);

  const toRepo = useCallback(() => {
    navigation.navigate({
      name:   'DataEntry',
      params: {
        type:        'repo',
        name:        'REPOSITORY',
        current:     repo,
        placeholder: 'Type your repository name'
      },
      merge: true
    });
  }, [ navigation, repo ]);

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
    NetInfo.fetch()
      .then(({ isInternetReachable }) => {
        if (isInternetReachable) {
          if (dataState === DATA_STATE.READY) {
            setSending(true);
            sendRepo(user, repo)
              .then((success) => {
                if (success) {
                  setDataState(DATA_STATE.SENT);
                  setUser('');
                  setRepo('');
                } else {
                  setDataState(DATA_STATE.SEND_ERROR);
                }

                setSending(false);
              }).catch(() => setDataState(DATA_STATE.SEND_ERROR));

            return;
          }

          const dataOk     = checkUser(user) && checkRepo(repo);
          const _dataState = dataOk ? DATA_STATE.READY : DATA_STATE.DATA_ERROR;

          setDataState(_dataState);
        } else {
          setDataState(DATA_STATE.SEND_ERROR);
        }
      }).catch(() => setDataState(DATA_STATE.SEND_ERROR));
  }, [ dataState, user, repo ]);

  const repoText = repo.length > 0 ? repo : 'Repo';
  const userText = user.length > 0 ? user : 'User';

  const dataError  = dataState === DATA_STATE.DATA_ERROR;
  const netError   = dataState === DATA_STATE.INTERNET_ERROR;
  const sendError  = dataState === DATA_STATE.SEND_ERROR;
  const isError    = dataError || netError || sendError;

  const canSend    = dataState === DATA_STATE.READY;
  const sendStyle  = canSend ? Style.ready : {};

  const errorStyle = isError ? Style.error : {};
  const mainStyle  = { ...Style.container, ...errorStyle, ...sendStyle };

  if (sending) {
    return (
      <View style={Style.centeredContainer}>
        <Text style={Style.submitText}>
          SENDING
        </Text>
      </View>
    );
  }

  if (dataState === DATA_STATE.SENT) {
    return (
      <View style={Style.container}>
        <View>
          <Text style={Style.sentText}>
            All done!
          </Text>
          <Text style={Style.sentText}>
            Repository sent.
          </Text>
        </View>

        <View style={Style.submitButton}>
          <Text style={Style.submitText}>
            Cool
          </Text>
        </View>
      </View>
    );
  }

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
