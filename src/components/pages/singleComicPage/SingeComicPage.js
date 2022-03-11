// import { useState, useEffect } from 'react';
// import useMarvelService from '../../../services/MarvelService';
import { useParams, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
// import Spinner from '../../spinner/Spinner';
// import Error from '../../error/Error';
// import AppBanner from '../../appBanner/AppBanner';

import './singleComicPage.scss';

const SingleComicPage = ({data}) => {
//     const [comic, setComic] = useState(null);
//     const {comicId} = useParams();
//     const {loading, error, getSingleComis, clearError} = useMarvelService();

//     // console.log(comicId);

//     useEffect(() => {
//         updateComic()
//     }, [comicId]);

//     const updateComic = () => {
//         clearError()
//         getSingleComis(comicId)
//             .then(onComicLoaded)
//     }

//     const onComicLoaded = (comic) => {
//         setComic(comic)
//     }

//     const spinner = loading ? <Spinner/> : null;
//     const errorMessage = error ? <Error/> : null;
//     const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

//     return (
//         <>
//             <AppBanner/>
//             {spinner}
//             {errorMessage}
//             {content}
//         </>
//     )
// }

// const View = ({comic}) => {
//     // console.log('object');
//     const {title, description, pages, language, thumbnail, prices} = comic;
//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={title} className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pages}</p>
//                 <p className="single-comic__descr">{`Language: ${language}`}</p>
//                 <div className="single-comic__price">{prices}</div>
//             </div>
//             <Link to="/comics" className="single-comic__back">Back to all</Link>
//         </div>
//     )

    
    const {title, description, pages, language, thumbnail, prices} = data;
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                name="description"
                content="Comics description"
                />
                <title>{`About comic ${title} `}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">{`Language: ${language}`}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;