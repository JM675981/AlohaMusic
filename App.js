import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import React, { Component } from "react";


export default class App extends Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
  }

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
    this.loadAudio();
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
    this.setState({
      isPlaying: !isPlaying
    });
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const status = {
      shouldPlay: this.state.isPlaying,
      volume: this.state.volume,
    };
    await playbackInstance.loadAsync(require('./music/ukulele.mp3'), status, false);
    this.setState({
      playbackInstance
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Aloha Music</Text>
        <Image source={require('./images/ukulele.png')} style={styles.image} />
        <TouchableOpacity onPress={this.handlePlayPause}>
          {this.state.isPlaying ?
            <Feather name="pause" size={32} color="#563822" /> :
            <Feather name="play" size={32} color="#563822" />
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: 300,
    backgroundColor: '#da9547',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 35,
    color: '#563822',
  },
  image: {
    height: 500,
    width: 300,
    marginBottom: 35,
  }
});
