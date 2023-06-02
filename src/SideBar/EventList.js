import axios from "axios";
import { useEffect, useState } from "react";
import './SideTemplate.css';
import moment from "moment-timezone";
import EventUpdateModal from "./EventUpdateModal";
import { FaCircle } from "react-icons/fa";

function EventList() {

    const [datas, setDatas] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [eventId, setEventId] = useState(0);  
    const [eventColor, setEventColor] = useState(''); 
    const handleModalEventToggle = () => {
        setShowModalUpdate(prev => !prev);
        setEventColor('#03a9f4');
    }

    //이벤트 클릭시 EventUpdateModal 팝업 생성
    const handleClick = (eventId) => {
        setShowModalUpdate(true);
        setEventId(eventId);
        setEventColor(datas.backgroundColor);
    };
    // endDate가 오늘날짜와 같거나 큰 이벤트의 리스트 조회
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/dailyevent`)
            .then(response => {
                setDatas(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            {datas && datas.map(event => (
                <>
                    <div className="EventItem">
                        <button className="detail" onClick={() => handleClick(event.eventId)}>
                            <FaCircle className="Circle" style={{ color: event.eventColor }} />
                            <p className="eventName">{event.eventName}</p>        
                        </button>
                        <p className="date">{moment(event.startDate).format("YYYY-MM-DD")} ~ {moment(event.endDate).format("YYYY-MM-DD")}</p>
                    </div>
                </>
            ))}
            {/* 모달 팝업 생성시 필요한 정보들을 props값으로 전달 */}
            {showModalUpdate && (    
                <EventUpdateModal
                    showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate}
                    eventId={eventId}setEventId={setEventId}
                    eventColor={eventColor} setEventColor={setEventColor}
                    handleModalEventToggle={handleModalEventToggle}
                />)}
        </>
    );
}

export default EventList;
