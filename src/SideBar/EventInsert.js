import { useState } from 'react';
import './SideTemplate.css';
import EventInsertModal from './EventInsertModal';
import moment from 'moment';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function EventInsert() {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventColor, setEventColor] = useState('#03a9f4');
  const [startDate, setStartDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
  const [endDate, setEndDate] = useState(moment.tz(new Date(), 'Asia/Seoul').format("YYYY-MM-DDTHH:mm"));
  const [allDay, setAllDay] = useState(false);

  const handleModalToggle = () => {
    setShowModal(prev => !prev);
    setEventColor('#03a9f4');
  };

  const handleAddEvent = () => {
    setShowModal(true);
  };

  return (
    <>
      <form className="Event-title" onClick={handleAddEvent}>
        <div className='EventTitleName'
          title='일정 목록은 "오늘"을 기준으로 이후 일정만 보여집니다 이전 일정은 달력으로 확인해주세요:)'>
          일정을 추가하세요!
        </div>
        <div className='plus' title='일정 추가 하기'><AiOutlinePlusCircle /></div>
      </form>
      {showModal && (
        <EventInsertModal
          showModal={showModal} setShowModal={setShowModal}
          eventName={eventName} setEventName={setEventName}
          eventColor={eventColor} setEventColor={setEventColor}
          startDate={startDate} setStartDate={setStartDate}
          endDate={endDate} setEndDate={setEndDate}
          allDay={allDay} setAllDay={setAllDay}
          handleModalToggle={handleModalToggle}
        />
      )}
    </>
  )
}

export default EventInsert;