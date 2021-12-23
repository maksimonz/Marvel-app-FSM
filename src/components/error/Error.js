import img from './error.png';
import './error.scss';

const Error = () => {
    return (
        <div className='error'>
            <img src={img} alt="error"/>
            <div className='error-message'>
                <h3>Error, something went wrong...</h3>
            </div>
        </div>
    )
}

export default Error;