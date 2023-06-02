import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from "moment-timezone";
import './EventInsertModal.css';
import ColorPicker from './ColorPicker';
import { MdCalendarToday } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { GoDash } from "react-icons/go";
import Swal from "sweetalert2";

function EventInsertModal(props) {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    setStartDate(props.startDate);
  }, []);

  const handleAllday = (e) => {
    setAllDay(e.target.checked);
    setEndDate(moment(startDate).format("YYYY-MM-DDT23:59"));
  }

  //일정 추가를 클릭하여 생성된 모달 팝업에서 새로운 event 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    //날짜 포맷
    const isoStartDate = moment.tz(startDate, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    const isoEndDate = moment.tz(endDate, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/insertevent`, {
      eventName: eventName,
      startDate: isoStartDate,
      endDate: isoEndDate,
      eventColor: props.eventColor,
      allDay: allDay
    })
      Swal.fire({
        text: "일정 등록이 완료되었습니다! (◍•ᴗ•◍)❤",
        confirmButtonColor:"#0096EB"
      })
      .then(function(){
        window.location.replace("/");                
      })
      .catch((error) => {
        Swal.fire(`일정 등록에 실패했습니다... ‧₊˚(✘﹏✘) (${error.message})`);
        return;
      });
  };

  return (
    <Modal show={props.showModal} onHide={props.handleModalToggle} backdrop="static">
      <AiOutlineClose className='close' variant="secondary" onClick={props.handleModalToggle} />

      <form className='modalContent' onSubmit={handleSubmit}>
      
        <div className="eventNameBox">
          <div className="colorPicker">
            <ColorPicker eventColor={props.eventColor} setEventColor={props.setEventColor} />
          </div>
          <input type="text" className="eventName" id="eventName" value={eventName} 
            placeholder="일정을 입력해주세요." onChange={(e) => setEventName(e.target.value)} required />
        </div>
      
        <div className='DatetimeBox'>
          <div className='dateImg'><p><MdCalendarToday /></p></div>
          <div className="Datetime">
            <label id="dateSelect" htmlFor="eventStartDate">
              <input type="datetime-local" id="eventStartDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <span className='cn'><GoDash /></span>
            <label htmlFor="eventEndDate">
              {allDay ? (
                <><input type="datetime-local" id="eventEndDate" value={moment(startDate).format("YYYY-MM-DDT23:59")} readOnly /></>)
                : <><input type="datetime-local" id="eventEndDate" min={startDate} onChange={(e) => setEndDate(e.target.value)} /></>
              }
            </label>
          </div>
        </div>

        <div className="allDay">
          <div className='allDayImg'><IoMdTime /></div>
          <div className='allDayName'>
            <label className="form-check-label" htmlFor="allDay">하루종일</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="allDay"
              checked={allDay}
              onChange={handleAllday}
            />
          </div>
        </div>

        <div className='submitButton'>
          <button id='okbutton' variant="primary" type="submit">일정 추가</button>
        </div>
      </form>
    </Modal>
  );
}

export default EventInsertModal;