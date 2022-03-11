import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundaty/ErrorBoundary";
import {Helmet} from "react-helmet";

const ComicsPage = () => {
    return (
        <>            
            <Helmet>
                <meta
                name="description"
                content="Comics page information"
                />
                <title>Comics information portal</title>
            </Helmet>
            <AppBanner/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;