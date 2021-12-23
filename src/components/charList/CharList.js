import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    componentDidMount() {
        this.onRequest();
        window.addEventListener('scroll', this.getPageBottom)
        // this.foo.bar = 0; // проверка ErrorBoundary
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.getPageBottom)
    }

    marvelService = new MarvelService();

    getPageBottom = () => {
        // console.log( window.innerHeight);
        // console.log(Math.floor(document.documentElement.scrollTop));
        // console.log(document.body.scrollHeight);
        if(document.body.scrollHeight <= window.innerHeight + document.documentElement.scrollTop + 2){
            if(this.state.charEnded){
                window.removeEventListener('scroll', this.getPageBottom);
            } else {
                this.onRequest(this.state.offset)
            }
        }
    }

    onRequest = (offset) => {
        console.log('request');
        this.onCharsListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onCharsLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))

    }

    onCharsListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    itemRefs = [];

    getRef = (elem) => {
        this.itemRefs.push(elem);
    }

    onFocus = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected')
        // console.log(this.itemRefs);
    }

    renderContent = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (

                <li 
                key={item.id}
                ref={this.getRef} 
                className="char__item" 
                style={imgStyle}
                tabIndex='0'
                // onFocus={this.onFocus}
                onClick={() => {
                        this.props.onGetCharId(item.id);
                        this.onFocus(i);
                        }
                }       
                onKeyPress={(e)=> {
                    console.log(e.key);
                    if(e.key = ' ' || e.key === "Enter"){
                        this.props.onGetCharId(item.id);
                        this.onFocus(i);
                    }
                }}>
                        <img src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <Error/> : null;
        const content = this.renderContent(charList);

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={()=>this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


CharList.propTypes = {
    onGetCharId: PropTypes.func.isRequired
}


export default CharList;