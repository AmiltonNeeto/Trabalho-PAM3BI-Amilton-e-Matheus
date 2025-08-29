import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Platform, Image } from 'react-native';
import { Button, TextInput, Surface } from 'react-native-paper';

// Importação das imagens para web
import gorilaImg from './assets/gorila.jpg';
import macacoImg from './assets/mico.jpeg';
import orangotangoImg from './assets/orangotango.jpg';
import chimpanzeImg from './assets/chimpanze.jpg';
import erroImgSrc from './assets/OIP.png';

export default function App() {
  const gorila = Platform.OS === 'web' ? gorilaImg : require('./assets/gorila.jpg');
  const macaco = Platform.OS === 'web' ? macacoImg : require('./assets/mico.jpeg');
  const orangotango = Platform.OS === 'web' ? orangotangoImg : require('./assets/orangotango.jpg');
  const chimpanze = Platform.OS === 'web' ? chimpanzeImg : require('./assets/chimpanze.jpg');
  const erroImg = Platform.OS === 'web' ? erroImgSrc : require('./assets/OIP.png');

  let [img, setImg] = useState(gorila);
  let [textoImg, setTextImg] = useState('');
  let [x, setX] = useState('');
  let [placeholder, setPlaceholder] = useState('Digite o nome');

  const TrocaTextoImg = (texto) => {
    let novaImagem;
    let mensagemErro = '';

    switch (texto.toLowerCase()) {
      case 'mico':
        novaImagem = macaco;
        break;
      case 'gorila':
        novaImagem = gorila;
        break;
      case 'orangotango':
        novaImagem = orangotango;
        break;
      case 'chimpanzé':
        novaImagem = chimpanze;
        break;
      case '':
        novaImagem = erroImg;
        mensagemErro = 'Digite!';
        break;
      default:
        novaImagem = erroImg;
        mensagemErro = 'Não existe!';
    }

    setImg(novaImagem);
    setX(mensagemErro);
  };

  const TrocaImg = () => {
    let novaImagem;

    switch (img) {
      case gorila:
        novaImagem = macaco;
        break;
      case macaco:
        novaImagem = orangotango;
        break;
      case orangotango:
        novaImagem = chimpanze;
        break;
      case chimpanze:
        novaImagem = gorila;
        break;
      default:
        novaImagem = gorila;
    }

    setImg(novaImagem);
    setX('');
    setTextImg('');
  };

  return (
    <Surface style={styles.surface}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Selecione o primata:</Text>
        <Text style={styles.text}>1 - Gorila</Text>
        <Text style={styles.text}>2 - Mico</Text>
        <Text style={styles.text}>3 - Orangotango</Text>
        <Text style={styles.text}>4 - Chimpanzé</Text>
        <TextInput
          mode="outlined"
          label="Nome do primata"
          placeholder={placeholder}
          style={styles.input}
          value={textoImg}
          onChangeText={setTextImg}
          onFocus={() => setPlaceholder('')}
          onBlur={() => setPlaceholder('Digite o nome')}
        />
        <Text style={styles.errorText}>{x}</Text>
        <Image source={img} style={styles.image} />
        <Button
          mode="contained"
          icon="magnify"
          onPress={() => TrocaTextoImg(textoImg)}
          style={styles.button}
        >
          Procurar
        </Button>
        <Button
          mode="outlined"
          icon="refresh"
          onPress={TrocaImg}
          style={styles.button}
        >
          Trocar Imagem
        </Button>
      </SafeAreaView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    color: '#007100',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: '#007100',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    marginVertical: 12,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    marginVertical: 16,
    borderRadius: 12,
  },
  button: {
    marginVertical: 6,
    width: 200,
    
  },
  errorText: {
    color: '#ff0000',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
