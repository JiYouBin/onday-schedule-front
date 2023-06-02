import './Title.css';
import {  BsFillCalendarHeartFill } from "react-icons/bs";

function Title () {
return(
    <>
        <div className="top">
                <div className="circle"><BsFillCalendarHeartFill/></div>
                <h2 className="title">ON:day</h2>
        </div>
    </>
);
}

export default Title;
