import { useState } from "react";
import { Link } from "react-router-dom";

import Error from "../error/Error";

const Page404 = () => {
    const [color, setHover] = useState('black')

    const style =  {"fontSize": "30px", "marginTop" : "40px", "fontWeight": "700", color};

    return (
        <div>
            <Error/>
            <Link 
                onMouseOver={() => setHover('darkred')}
                onMouseLeave={() =>  setHover("black")}
                style={style} to="/"
                >Back to main page</Link>
        </div>
    )
}

export default Page404;