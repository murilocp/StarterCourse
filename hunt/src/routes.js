import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';

//com isso ele entende que a primeira página é o Main;
export default createStackNavigator({
    Main
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "DA552F"
        },
        headerTintColor: "#FFF"
    },
});