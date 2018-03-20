import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from "react-native-modal";
import { styles } from '../styles/Styles'
import { getFeed } from '../services/HomeService'
import { numberToReal } from '../utils/StringUtil'
import { images } from '../../assets/Images'

const window = Dimensions.get('window');

type Props = {};
export default class HomePage extends Component<Props> {

    constructor() {
        super()
        this.state = {
            options: [
                {
                    key: 0,
                    name: 'Popular',
                    selected: true
                },
                {
                    key: 1,
                    name: 'Marcas',
                    selected: false
                },
                {
                    key: 2,
                    name: 'Perto de mim',
                    selected: false
                },
                {
                    key: 3,
                    name: 'Coleções',
                    selected: false
                },
            ],
            products: [],
            newChat: 0,
            loader: true,
            isVisible: false,
            itemSelected: null
        }
    }

    componentDidMount() {
        getFeed({
            onSuccess: (data) => {
                this.setState({ products: data.feed, newChat: data.chat.new, loader: false })
            }
        })
    }

    _textLikes(item) {
        num = (item.likes.people.length > 0) ? item.likes.total - item.likes.people.length : item.likes.total
        
        if (num > 999) {
            num = (num/1000).toFixed(1) + 'k'
        }

        return '+' + num + ' gostaram'
    }

    _imageFromString(string) {
        string = string.substring(string.lastIndexOf('/')+1, string.lastIndexOf('.'))
        return images[string]
    }

    _renderItemOptions = ({item}) => (
        <TouchableWithoutFeedback 
            onPress={() => {
                newOptions = []
                this.state.options.forEach(op => {
                    op.selected = (item.key == op.key) ? true : false
                    newOptions.push(op)
                })
                this.setState({options: newOptions})
            }}>
            <View style={styles.optionItem}>
                <Text style={[(item.selected) ? { fontWeight: 'bold' } : null, styles.optionText]}>{item.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    )

    _renderItemProducts = ({item}) => (
        <TouchableHighlight
            ref={(component) => this._itemList = component}
            underlayColor='white'
            activeOpacity={0.7}
            onLongPress={() => {
                this.state.itemSelected = item
                this.setState({ isVisible: true })
            }}>
            <View style={styles.card}>

                <Image style={styles.cardImage} source={this._imageFromString(item.image)}/>
                
                <Text style={styles.productName}>
                    {item.name}
                </Text>

                <View style={styles.brand}>
                    <Image style={styles.brandImage} source={images[item.brand]}/>
                    <Text style={styles.brandText}>
                        por {item.brand}
                    </Text>
                </View>
                
                <View style={styles.price}>
                    <Text style={styles.priceText}>
                        {(item.sale_price != null) ? numberToReal(item.sale_price/100) : numberToReal(item.price/100)}
                    </Text>
                    <Text style={styles.oldPriceText}>
                        {(item.sale_price != null) ? ' era ' + numberToReal(item.price/100) : null}
                    </Text>
                </View>

                <Text style={styles.featured}>
                    {(item.feature != null) ? item.feature : null}
                </Text>
                
                <View style={styles.likes}>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {(item.likes.people[0] != null) ? (<Image style={styles.friendImage} source={this._imageFromString(item.likes.people[0].img)}/>) : null}
                        {(item.likes.people[1] != null) ? (<Image style={[{marginLeft: -16}, styles.friendImage]} source={this._imageFromString(item.likes.people[1].img)}/>) : null}
                        {(item.likes.people[2] != null) ? (<Image style={[{marginLeft: -16}, styles.friendImage]} source={this._imageFromString(item.likes.people[2].img)}/>) : null}
                        
                        <Text style={styles.likesText}>
                            {this._textLikes(item)}
                        </Text>
                    </View>

                    {(item.liked) ? (<Image style={styles.likedImage} source={require('../../assets/card/like.png')}/>) : null}
                </View>

                {(item.sale_price != null) ? (<Text style={styles.sale}>
                    {((item.sale_price/item.price)*100-100).toFixed(0)}%
                </Text>) : null}

            </View>

        </TouchableHighlight>
    )

    render() {

        return (
            <View style={styles.container}>

                <Spinner 
                    visible={this.state.loader} 
                    overlayColor={'rgba(255, 255, 255, 0.5)'}
                    color={'black'} />

                <View style={styles.header}>
                    <Text style={styles.title}>
                        shopflick  
                    </Text>
                    <View style={styles.headerButtons}>
                        <TouchableHighlight
                            underlayColor='white'
                            activeOpacity={0.7}
                            onPress={() => {
                                
                            }}>
                            <View>
                                <Image style={styles.headerButton} source={require('../../assets/navbar/chat.png')}/>
                                {(this.state.newChat > 0) ? (<View style={styles.notifications}>
                                    <Text style={styles.notificationText}>
                                        {this.state.newChat}
                                    </Text>
                                </View>) : null}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor='white'
                            activeOpacity={0.7}
                            onPress={() => {
                                
                            }}>
                            <Image style={styles.headerButton} source={require('../../assets/navbar/filter.png')}/>
                        </TouchableHighlight>
                    </View>
                </View>

                <FlatList
                    style={{height: 50}}
                    data={this.state.options}
                    keyExtractor={item => item.name}
                    renderItem={this._renderItemOptions}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />

                <FlatList
                    style={styles.list}
                    data={this.state.products}
                    keyExtractor={item => item.name}
                    renderItem={this._renderItemProducts}
                    numColumns={2}
                />

                <View style={styles.tabContainer}>
                    <View style={styles.tabLine}/>
                    <View style={styles.tab}>
                        <Image style={styles.tabItem} source={require('../../assets/tabbar/home.png')}/>
                        <Image style={styles.tabItem} source={require('../../assets/tabbar/my_profile.png')}/>
                        <Image style={styles.tabItem} source={require('../../assets/tabbar/my_orders.png')}/>
                        <Image style={styles.tabItem} source={require('../../assets/tabbar/add.png')}/>
                    </View>
                </View>

                <Modal 
                    isVisible={this.state.isVisible}
                    animationIn={'zoomIn'}
                    animationOut={'zoomOut'}>
                    <TouchableWithoutFeedback onPress={() => this.setState({isVisible: false})}>
                        <View style={{width: '100%', height: '100%'}}>

                            <View style={[(this.state.products.indexOf(this.state.itemSelected)%2 == 0) ? {marginLeft: 10} : {marginLeft: window.width/2+10}, styles.containerLongPress]}>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableWithoutFeedback
                                        underlayColor='white'
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            alert('Compartilhar ' + this.state.itemSelected.name)
                                        }}>
                                        <View style={[{ marginTop: 20, marginRight: 30 }, styles.longPressButton]}>
                                            <Image style={styles.headerButton} source={require('../../assets/longpress/share.png')}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        underlayColor='white'
                                        activeOpacity={0.7}
                                        onPress={() => {
                                            alert('Adicionar ' + this.state.itemSelected.name)
                                        }}>
                                        <View style={styles.longPressButton}>
                                            <Image style={styles.headerButton} source={require('../../assets/longpress/plus.png')}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <TouchableWithoutFeedback
                                    underlayColor='white'
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        alert('Guardar ' + this.state.itemSelected.name)
                                    }}>
                                    <View style={[{ marginTop: 40, marginLeft: 25 }, styles.longPressButton]}>
                                        <Image style={styles.headerButton} source={require('../../assets/longpress/wardrobe.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        );
    }
}
