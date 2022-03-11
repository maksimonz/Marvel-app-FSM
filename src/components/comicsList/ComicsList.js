import { useState, useEffect } from 'react/cjs/react.development';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const setContent = (process, Component, newItemsLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemsLoading ? <Component/> : <Spinner/>;
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

const ComicsList = () => {
    const [comicsList, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const {process, setProcess, getAllComics} = useMarvelService();
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
            onRequest(offset, true);
            // console.log('effect');
             }, [])

    const onRequest = (offset, initial) => { 
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true); 
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
            // console.log('req');
            // .finally(setNewItemsLoading(true))
    }

    const onComicsLoaded = (newComicsList) => {
        if(newComicsList.length < 8){
            setComicsEnded(true)
        }
        setComics((comicsList) => [...comicsList, ...newComicsList]);
        setOffset((offset) => offset + 8);
        setNewItemsLoading(false)
    }

    const renderContent = (arr) => {
        const items = arr.map((item, i) => {
            
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{`${item.prices}$`}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    // console.log('render');
    return (
        <div className="comics__list">
            {setContent(process, () => renderContent(comicsList), newItemsLoading)}
            <button
                onClick={onRequest}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                disabled={newItemsLoading} 
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;