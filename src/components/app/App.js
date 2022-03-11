import {BrowserRouter as Router, Route, Switch}  from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from "../pages/Page404";
import SinglePage from "../pages/SinglePage";
import SingleComicPage from "../pages/singleComicPage/SingeComicPage";
import SingleCharPage from "../pages/singleCharPage/SingleCharPage";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                           <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                        <Route exact path="/comics/:id" >
                            <SinglePage Component={SingleComicPage} pageType="comics"/>
                        </Route>
                        <Route exact path="/characters/:id" >
                            <SinglePage Component={SingleCharPage} pageType="characters"/>
                        </Route>
                        <Route path="*">
                            <Page404/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;






