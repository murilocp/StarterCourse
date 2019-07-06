import {AppRegistry} from 'react-native';
//ao inves de importar direto da pasta raiz, importar da pasta src
//por padrão se não passa o nome do arquivo, ele pega o index.js
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
