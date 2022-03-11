import Skeleton from "../components/skeleton/Skeleton";
import Error from "../components/error/Error";
import Spinner from "../components/spinner/Spinner";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
            break;
        case 'loading':
            return <Spinner/>;
            break;
        case 'confirmed':
            return <Component data={data}/>;
            break;
        case 'error':
            return  <Error/>;
            break;
        default: 
            throw new Error ('Unexpected process')
    }
}
export default setContent;