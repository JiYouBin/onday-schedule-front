import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import './MyCalendar.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment';
import EventInsertModal from '../SideBar/EventInsertModal';
import EventUpdateModal from '../SideBar/EventUpdateModal';

function MyCalendar() {

  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventColor, setEventColor] = useState('#03a9f4');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleModalToggle = () => {
    setShowModal(prev => !prev);
    setEventColor('#03a9f4');
  };

  const handleModalEventToggle = () => {
    setShowModalUpdate(prev => !prev);
    setEventColor('#03a9f4');
  }

  const handlerDateClick = (info) => {
    setStartDate(moment(info.date).format("YYYY-MM-DDTHH:mm"));
    setShowModal(true);
  }

  const handlerEventClick = (info) => {
    setEventId(info.event.extendedProps.eventIdx);
    setEventName(info.event.title);
    setStartDate(info.event.start);
    setEndDate(info.event.end);
    setEventColor(info.event.backgroundColor);
    setShowModal(false);
    setShowModalUpdate(true);
  };

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ondayschedule/eventlist`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const newEvents = data && data.map(({ eventId, eventName, eventColor, startDate, endDate, allDay }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return {
        timeZone: 'Asia/Seoul',
        title: eventName,
        start: `${start.getFullYear()}-${('0' + (start.getMonth() + 1)).slice(-2)}-${('0' + start.getDate()).slice(-2)}T${('0' + start.getHours()).slice(-2)}:${('0' + start.getMinutes()).slice(-2)}`,
        end: `${end.getFullYear()}-${('0' + (end.getMonth() + 1)).slice(-2)}-${('0' + end.getDate()).slice(-2)}T${('0' + end.getHours()).slice(-2)}:${('0' + end.getMinutes()).slice(-2)}`,
        color: eventColor,
        eventIdx: eventId,
        allDay: allDay
      };
    });
    setEvents(newEvents);

  }, [data]);

  return (
    <>
      <div className="calendar-box">
        <div className="calendar">
          <FullCalendar
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
            googleCalendarApiKey="AIzaSyBIRZ-O0O6HeoQIY1s2QnuvdBjvseJqzwI"
            selectable={true}
            displayEventTime={false}
            // views={timeGri}
            dayMaxEventRows= {4}
            eventSources={[
              {
                googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                color: 'white',
                textColor: '#DD1707'
              },
              { events }
            ]}
            locale="ko"
            dateClick={handlerDateClick}
            eventClick={handlerEventClick}
      
            headerToolbar={{
              center: 'title',
              start: 'prev',
              end: 'next'
            }}
          
            height={"842px"}
            dayCellContent= { function(arg) {
              return arg.dayNumberText.replace("일","");
            }}
          />
        </div>
      
      {/* 날짜 빈공간 클릭 시 해당 날짜의 이벤트 일정 추가 모달 팝업 생성 */}
        {showModal && (
          <EventInsertModal
            showModal={showModal} setShowModal={setShowModal} 
            eventColor={eventColor} setEventColor={setEventColor}
            startDate={startDate} setStartDate={setStartDate}
            handleModalToggle={handleModalToggle}
          />
        )}

      {/* 이벤트 클릭 시 해당 날짜의 이벤트 일정 수정 모달 팝업 생성 */}
        {showModalUpdate && (
          <EventUpdateModal
            eventId={eventId} setEventId={setEventId}
            showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate}
            eventColor={eventColor} setEventColor={setEventColor}
            handleModalEventToggle={handleModalEventToggle}
          />
        )}
      </div>
    </>
  );
}

export default MyCalendar;
