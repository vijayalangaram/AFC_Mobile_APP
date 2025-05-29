import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, TextInput, Platform } from 'react-native';
import SMSRetriever, { SmsListenerEvent } from 'react-native-sms-retriever';

interface ForgotPasswordScreenProps {
  navigation: any; // You should replace 'any' with your proper navigation type
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [otpError, setOtpError] = useState<string>('');

  // Check if OTP is complete
  useEffect(() => {
    const isComplete = otp.every(digit => digit !== '');
    setIsButtonDisabled(!isComplete);
    setOtpError('');
  }, [otp]);

  // Auto-fetch OTP from SMS (Android only)
  useEffect(() => {
    if (Platform.OS === 'android') {
      const listenForOtp = async () => {
        try {
          const registered = await SMSRetriever.startSmsRetriever();
          if (registered) {
            SMSRetriever.addSmsListener((event: SmsListenerEvent) => {
              if (event.message) {
                const extractedOtp = extractOtpFromSms(event.message);
                if (extractedOtp && extractedOtp.length === 6) {
                  const otpArray = extractedOtp.split('');
                  setOtp(otpArray);
                  SMSRetriever.removeSmsListener();
                }
              }
            });
          }
        } catch (error) {
          console.log('Error setting up SMS listener:', error);
        }
      };

      listenForOtp();
      return () => {
        if (Platform.OS === 'android') {
          SMSRetriever.removeSmsListener();
        }
      };
    }
  }, []);

  const extractOtpFromSms = (message: string): string | null => {
    // This regex looks for a 6-digit number in the message
    const otpRegex = /\b\d{6}\b/;
    const match = message.match(otpRegex);
    return match ? match[0] : null;
  };

  const handleOtpChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) { // Only allow numbers
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Auto focus to next input
      if (text && index < 5) {
        // You'll need to add refs to your TextInputs for this to work
        // This is just a placeholder for the logic
      }
    }
  };

  const handleVerifyOtp = () => {
    // Here you would typically verify the OTP with your backend
    // For demo purposes, we'll just navigate to welcome screen
    navigation.navigate('Login'); // Make sure you have this screen in your navigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentimagetop}>
        <Image source={require('./images.png')} style={styles.image} />
      </View>

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

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.otpBox, otpError ? styles.otpBoxError : null]}
              value={digit}
              onChangeText={(text: string) => handleOtpChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>
        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

        <TouchableOpacity>
          <Text style={styles.resendText}>
            Didn't receive the OTP? <Text style={styles.resendLink}>Resend OTP</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <TouchableOpacity
          style={[styles.loginButton, isButtonDisabled ? styles.disabledButton : null]}
          onPress={handleVerifyOtp}
          disabled={isButtonDisabled}
        >
          <Text style={styles.loginButtonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentimagetop: {
    padding: 10,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  content: {
    backgroundColor: '#00205B',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    paddingTop: 40,
    marginBottom: 10,
    flex: 0,
    height: '75%',
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
  loginButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#0071CF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  otpBoxError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});


export default ForgotPasswordScreen;