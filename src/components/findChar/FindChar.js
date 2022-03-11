import { Formik } from 'formik';
import { useState, useEffect} from 'react';
import { ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import useMarvelService from '../../services/MarvelService';
import "./findChar.css";

const FindChar = () => {
    const {loading, error, getCharName, clearError} = useMarvelService();
    const [char, setChar] = useState(null);
    const [clearText, setCleartext] = useState(false)

    const getChar = (char) => {
        setChar(char)
    }    

    const updateChar = (name) => {
        clearError();

        getCharName(name)
            .then(getChar)
    }


    const cleanNotification = () => {
        setCleartext(true)
    }

    const clearRuselts = () => {
        results = null;
    }
   

    const errorMessage = error ? <div><ErrorMessage /></div> : null;
    let results = !char || clearText ? null : char.length > 0 ? 
        <>
            <div className='success_mgs'>There is! </div>
            <Link className='charLink' to={`/characters/${char[0].id}`}>
                <img className='charIcon' src={char[0].thumbnail} alt={char[0].name} />
                <div className='charText'>Visit {char[0].name} page?</div>
            </Link>
        </> : 
        <div className='error_msg'>The character was not found. Check the name and try again</div>

    return (
        <>
            <div className="find_char">
                <div className="find_title">Or find a character by name:</div>
                <Formik initialValues={{ name: ''}}
                    validate={(values) => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'This field is required';
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {    
                        setTimeout(()=>setCleartext(false), 500)
                        updateChar(values.name);  
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                       <form className="input_block" onSubmit={handleSubmit}>
                            <label htmlFor="name"></label>
                                <input 
                                    className="find_input" 
                                    type="text" 
                                    name="name" 
                                    placeholder="Enter name"
                                    onChange={handleChange}
                                    onKeyDown={cleanNotification}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            <button type="submit"  href="#" className="button button__main" disabled={loading}>
                                <div className="inner">FIND</div>
                            </button>
                            <div className='error_msg'>{errors.name && touched.name && errors.name}</div>
                        </form>
                    )}
                </Formik>
                {results}
                {errorMessage}
            </div>
        </>
    )
}

export default FindChar;

