import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import Product from './pages/product';

//com isso ele entende que a primeira página é o Main;
export default createStackNavigator({
    Main,
    Product
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: "DA552F"
        },
        headerTintColor: "#FFF"
    },
});