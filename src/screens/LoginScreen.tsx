import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('nnamdi.l@abc.com');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.contentimagetop}>
        <Image source={require('./images.png')} style={styles.image} />
      </View>

      <View style={styles.content}>
        <View style={styles.headerContainerWelcome}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subtitle}>Please enter your details to login.</Text>
        </View>

        <Text style={styles.label}>Email Address*</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password*</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="***********"
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberDevice(!rememberDevice)}
          >
            {rememberDevice ? (
              <Text style={styles.checkboxChecked}>✓</Text>
            ) : (
              <Text style={styles.checkboxUnchecked}>□</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Remember this device</Text>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or login using</Text>

        {/* <TouchableOpacity style={styles.faceIdButton}> */}
          {/* //ext style={styles.faceIdText}>Face ID</Text> */}
        <Image source={require('./faceid.png')}  style={styles.image} />
        {/* </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainerWelcome: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#fff', // Changed to white for better visibility on blue background
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc', // Lighter color for better visibility
    textAlign: 'center',
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
    borderBottomLeftRadius: 30, // Added bottom curves
    borderBottomRightRadius: 30, // Added bottom curves
    padding: 20,
    paddingTop: 40,
    //marginTop: 10,
    marginBottom: 10, // Add some bottom margin
    flex: 0, // Changed from 1 to prevent expanding
    height: '75%', // Set explicit height (adjust % as needed) 
  },
  contentimagetop: {
    padding: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#fff', // Changed to white
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff', // Added white background for inputs
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff', // Changed to white
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    fontSize: 14,
    color: '#fff', // Changed to white
  },
  checkboxUnchecked: {
    fontSize: 14,
    color: 'transparent',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#fff', // Changed to white
  },
  loginButton: {
    backgroundColor: '#0071CF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#fff', // Changed to white
    marginBottom: 20,
  },
  faceIdButton: {
    borderWidth: 1,
    borderColor: '#fff', // Changed to white
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceIdText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff', // Changed to white
  },
});

export default LoginScreen;