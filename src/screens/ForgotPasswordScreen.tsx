import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Forget Password</Text>
        
        <Text style={styles.text}>
          We have sent a One-Time Password (OTP){'\n'}
          To your Registered Email Address{'\n'}
          n******di@abc.com
        </Text>
        
        <Text style={styles.text}>
          Please check your inbox and enter the{'\n'}
          OTP to proceed.
        </Text>
        
        <TouchableOpacity>
          <Text style={styles.resendText}>
            Didn't receive the OTP? <Text style={styles.resendLink}>Resend OTP</Text>
          </Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <Text style={styles.verifyText}>Verify OTP</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00205B',
  },
  content: {
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  resendText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  resendLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 20,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ForgotPasswordScreen; 