import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';

const setContent = (process, Component, newItemsLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return !newItemsLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return  <Error/>;
            break;
        default: 
            throw new Error ('Unexpected process')
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [isEnd, setIsEnd] = useState(false);
   
    const {process, setProcess, getAllCharacters} = useMarvelService();
   
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
   
    useEffect(() => {
        if (setNewItemsLoading) {
          onRequest(offset, true);
        }
    }, [newItemsLoading])
   
    const onScroll = () => {
        if (document.body.scrollHeight <= window.innerHeight + document.documentElement.scrollTop + 2) {
          setNewItemsLoading(true);
        //   console.log(object);
        }
    };
   
    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllCharacters(offset)
            .then(onCharactersLoaded)
            .then(() => setProcess('confirmed'))
            .finally(() => setNewItemsLoading(false));
    };
   
    const onCharactersLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setOffset((offset) => offset + 9);
        setIsEnd(ended);
    };

    const itemRefs = useRef([]);

    const onFocus = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected')
    }

    const renderContent = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <CSSTransition key={item.id} timeout={5000} classNames="char__item">
                    <li 
                        key={item.id}
                        ref={el => itemRefs.current[i] = el} 
                        className="char__item" 
                        style={imgStyle}
                        tabIndex='0'
                        onClick={() => {
                            props.onGetCharId(item.id);
                            onFocus(i);
                            }
                        }       
                    onKeyPress={(e)=> {
                        // console.log(e.key);
                        if(e.key = ' ' || e.key === "Enter"){
                            props.onGetCharId(item.id);
                            onFocus(i);
                        }
                    }}>
                            <img src={item.thumbnail} alt={item.name}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )

    }

    return (
        <div className="char__list">
            {setContent(process, () => renderContent(charList), newItemsLoading)}
            <button 
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{display: isEnd ? 'none' : 'block'}}
                onClick={()=>onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onGetCharId: PropTypes.func.isRequired
}


export default CharList;