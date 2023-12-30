import {useLocation, useNavigate} from "react-router-dom";

function Test(){
    const location = useLocation();
    const nav = useNavigate();
    const data = location.state;

    return (
        <>
            <p>{data}</p>
            <button type="submit" onClick={() => nav('/')}>Go back</button>
        </>
    )
}

export default Test;
