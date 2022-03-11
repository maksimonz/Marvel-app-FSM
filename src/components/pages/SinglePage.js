import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, pageType}) => {
    const [data, setData] = useState(null);
    const {id} = useParams();
    const {loading, error, getSingleComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id]);

    const updateData = () => {
        clearError()

        switch (pageType) {
            case "comics":
                getSingleComic(id)
                .then(onDataLoaded)
                break;
            case "characters": 
                getCharacter(id)
                .then(onDataLoaded)
                break;
        }

    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <Error/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SinglePage;