import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps){
        if(this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    marvelService = new MarvelService();
    
    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return
        }
        this.onCharLoading()

        this.marvelService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
            
            // this.foo.bar = 0; // проверка ErrorBoundary
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        if(!this.state.error) {
            this.setState({
                loading: true
            }) 
        }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })  
    }


    render() {

        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <Error/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There no comics with this character'}
            {
                // eslint-disable-next-line 
                comics.map((item, i) => {

                    if(i < 10) {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    } 
                })
            }
            {/* <li className="char__comics-item">
                All-Winners Squad: Band of Heroes (2011) #3
            </li>
            <li className="char__comics-item">
                Alpha Flight (1983) #50
            </li>
            <li className="char__comics-item">
                Amazing Spider-Man (1999) #503
            </li>
            <li className="char__comics-item">
                Amazing Spider-Man (1999) #504
            </li>
            <li className="char__comics-item">
                AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
            </li>
            <li className="char__comics-item">
                Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
            </li>
            <li className="char__comics-item">
                Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
            </li>
            <li className="char__comics-item">
                Vengeance (2011) #4
            </li>
            <li className="char__comics-item">
                Avengers (1963) #1
            </li>
            <li className="char__comics-item">
                Avengers (1996) #1
            </li> */}
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;