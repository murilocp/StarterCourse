import React from 'react';
import Routes from './routes';
import './config/StatusBarConfig';

//naõ foi criada a classe, mas sim umn arrow function
//o component pode ser definido por uma function ou uma classe. Isso vai impactar somente nas funcionalidades do React que temos acesso
//caso não seja necessário ter acesso a certas funcionalidades, é mais simples usar a function

const App = () => <Routes />;

/*class App extends Component {
    render() {
        return <Routes />
    }
}*/

//todo component deve ser exportado dentro do arquivo
export default App;