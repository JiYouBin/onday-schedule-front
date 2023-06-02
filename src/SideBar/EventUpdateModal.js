import axios from "axios";
import { useState } from "react";
import { Modal, Toast } from 'react-bootstrap';
import './SideTemplate.css';
import moment from "moment-timezone";
import { useEffect } from "react";
import ColorPicker from "./ColorPicker";
import { MdCalendarToday } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { GoDash } from "react-icons/go";
import Swal from "sweetalert2";

function EventUpdateModal(props) {

    const [details, setDetails] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventColor, setEventColor] = useState('');
    const [startDate, setStartDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
    const [endDate, setEndDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
    const [allDay, setAllDay] = useState(false);
    const [eventId, setEventId] = useState(0);

    useEffect(() => {
        //클릭한 이벤트 정보의 eventId를 props값으로 받아와 데이터 불러오기
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/eventdetail/${props.eventId}`)
            .then(response => {
                setEventName(response.data[0].eventName);
                props.setEventColor(response.data[0].eventColor);
                setStartDate(moment.tz(response.data[0].startDate, 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
                setEndDate(moment.tz(response.data[0].endDate, 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
                setAllDay(response.data[0].allDay);
            })
            .catch(error => console.log(error));
    }, []);

    const handleUpdateEvent = (e) => {
        e.preventDefault();
        //날짜 포맷
        const isoStartDate = moment.tz(startDate, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
        const isoEndDate = moment.tz(endDate, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');

        //필요한 필드값을 상태변수로 받아와 서버에 전달
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/eventupdate/${props.eventId}`, {
            eventName: eventName,
            startDate: isoStartDate,
            endDate: isoEndDate,
            eventColor: props.eventColor,
            allDay: allDay
        })
        Swal.fire({
            text: "일정이 변경되었습니다! (◍•ᴗ•◍)❤",
            confirmButtonColor: "#0096EB"
        })
            .then(function() {
                window.location.replace("/");
            })
            .catch(error => {
                console.log(error)
                Swal.fire("일정 수정에 실패했습니다... ‧₊˚(✘﹏✘)");
                return;
            });
    }

    const handleDeleteEvent = () => {
        // 클릭한 이벤트 정보의 eventId를 props값으로 받아와 데이터 변경
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/eventdelete/${props.eventId}`)
            Swal.fire({
                text: "일정이 삭제되었습니다! (◍•ᴗ•◍)❤",
                showConfirmButton: false,
                timer: 800
            })
            .then(() => {
                window.location.replace("/");
            })
            .catch(error => {
                console.log(error)
                Swal.fire("일정 삭제에 실패했습니다... ‧₊˚(✘﹏✘)");
                return;
            });
    };


    return (
        <Modal show={props.showModalUpdate} onHide={props.handleModalEventToggle} backdrop="static">
            <AiOutlineClose className='close' variant="secondary" onClick={props.handleModalEventToggle} />

            <form className='modalContent' >
                <div className="eventNameBox">
                    <div className="colorPicker">
                        <ColorPicker eventColor={props.eventColor} setEventColor={props.setEventColor} />
                    </div>
                    <input type="text" className="eventName" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)}></input>
                </div>

                <div className='DatetimeBox'>
                    <div className='dateImg'><MdCalendarToday /></div>
                    <div className="Datetime">
                        <label id="dateSelect" htmlFor="eventStartDate">
                            <input type="datetime-local" id="eventStartDate" value={moment(startDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setStartDate(moment.tz(new Date(e.target.value), 'Asia/Seoul'))} />
                        </label>
                        <span className='cn'><GoDash /></span>
                        <label htmlFor="eventEndDate">
                            {allDay ? (
                                <><input type="datetime-local" id="eventEndDate" value={moment(startDate).format("YYYY-MM-DDT23:59")} readOnly /><br /></>)
                                : <><input type="datetime-local" id="eventEndDate" value={moment(endDate).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setEndDate(e.target.value)} /><br /></>
                            }
                        </label>
                    </div>
                </div>

                <div className="allDay">
                    <div className='allDayImg'><IoMdTime /></div>
                    <div className='allDayName'>
                        <label className="form-check-label" htmlFor="allDay">하루종일</label>
                        <input type="checkbox" className="form-check-input" id="allDay" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
                    </div>
                </div>

                <div className="udbutton">
                    <button id='okbutton' onClick={handleUpdateEvent}>수정</button>
                    <button id='debutton' onClick={() => handleDeleteEvent(eventId)}>삭제</button>
                </div>
            </form>
        </Modal >

    )
}

export default EventUpdateModal;