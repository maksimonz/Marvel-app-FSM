import { useState } from "react";
import {Helmet} from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundaty/ErrorBoundary";
import FindChar from "../findChar/FindChar";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [char, setChar] = useState(null)

    const onGetCharId = (id) => {
        setChar(id)
    }

    return(
        <>  
            <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onGetCharId={onGetCharId}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={char}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FindChar/>
                    </ErrorBoundary>
                </div>

            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;