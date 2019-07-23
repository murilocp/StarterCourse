import React, { Component } from 'react';
import api from '../services/api';

//BUtton já tem estilização conforme plataforma iOS ou Android
import { View, Text, FlatList,  TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt"
    };

    //estado é uma variável para armazenar toda informação que será acessada e manipulada na página
    //react fica ouvindo as alterações do estado, executando o metodo render novamente após cada alteração
    state = {
        productInfo: {},
        docs: [],
        page: 1
    };

    //como é uma função nativa do React, esse tipo de função não tem problema
    //caso fosse uma função criada por mim, ela não iria alcançar o this
    componentDidMount() {
        this.loadProducts();
    }

    //herda o escopo criado acima dele
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        //const { docs, ... productInfo } = response.data; assim, ele sobrescreve as informações do estado
        const { docs, ... productInfo } = response.data;

        //com os ... estou indicando a soma dos vetores, ou seja, os valores atuais do estado somando com os novos valores retornados da API
        this.setState({ 
            docs: [...this.state.docs, ...docs], 
            productInfo, 
            page 
        });
    };

    loadMore = () => {
        const { page, productInfo } = this.state;

        //se for a página atual for igual ao total de paginas, não faz nada. Senão, muda a pagina
        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };

    //para retornar um conteúde de JSX direto, posso colocar o parenteses
    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
                style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate("Product", { product: item });
                }}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>            
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    //porcentagem da pagina que vai carregar o resto
                    //tem que ser em decimal, ou seja 0.2 = 20%
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },

    list: {
        padding: 20
    },

    productContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: "bold"
    }
});