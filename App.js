import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [scoreTeamA, setScoreTeamA] = useState(0);
  const [scoreTeamB, setScoreTeamB] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      Alert.alert('Time Over', 'The match has ended!');
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const handleAddScore = (team) => {
    if (team === 'A') {
      const newScore = scoreTeamA + 1;
      setScoreTeamA(newScore);
      if (newScore === 10) {
        Alert.alert('Game Over', 'Team A wins!');
      }
    } else {
      const newScore = scoreTeamB + 1;
      setScoreTeamB(newScore);
      if (newScore === 10) {
        Alert.alert('Game Over', 'Team B wins!');
      }
    }
  };

  const handleSubtractScore = (team) => {
    if (team === 'A') {
      setScoreTeamA(scoreTeamA > 0 ? scoreTeamA - 1 : 0);
    } else {
      setScoreTeamB(scoreTeamB > 0 ? scoreTeamB - 1 : 0);
    }
  };

  const handleReset = () => {
    setScoreTeamA(0);
    setScoreTeamB(0);
    setTimeLeft(1200);
    setIsTimerRunning(false);
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Futsal Score</Text>

      <Text style={styles.timer}>Time Left: {formatTime(timeLeft)}</Text>
      <View style={styles.timerControls}>
        {!isTimerRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStartTimer}>
            <Text style={styles.startButtonText}>Start Timer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={handleStopTimer}>
            <Text style={styles.stopButtonText}>Stop Timer</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.teamContainer}>
        <Text style={styles.teamName}>Team A</Text>
        <Text style={styles.score}>{scoreTeamA}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAddScore('A')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleSubtractScore('A')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.teamContainer}>
        <Text style={styles.teamName}>Team B</Text>
        <Text style={styles.score}>{scoreTeamB}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAddScore('B')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleSubtractScore('B')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resetContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40', 
    marginBottom: 20,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c757d', 
    marginBottom: 20,
  },
  timerControls: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  teamContainer: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', 
    marginBottom: 10,
  },
  score: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#28a745', 
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  button: {
    backgroundColor: '#007bff', 
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetContainer: {
    marginTop: 30,
  },
  resetButton: {
    backgroundColor: '#dc3545', 
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  resetButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#28a745', 
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    elevation: 2,
  },
  startButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  stopButton: {
    backgroundColor: '#ffc107', 
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  stopButtonText: {
    color: '#343a40',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
