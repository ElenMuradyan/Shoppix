import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Hero = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('@/assets/images/hero.png')}
        style={styles.container}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.textCon}>
            <Text style={styles.bigText}>Ամեն ինչ՝ տնից դուրս չգալով</Text>
            <Text style={styles.subText}>
              Ամենօրյա օգտագործման ապրանքներ՝ մատչելի գներով։{"\n"}
              Խնայիր գումար՝ առանց որակը կորցնելու։
            </Text>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Սկսել գնումները</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: '5%',
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  textCon: {
    padding: 16,
    borderRadius: 10,
  },
  bigText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subText: {
    fontSize: 13,
    color: '#eee',
    lineHeight: 20,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
   },
    buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
   },
});