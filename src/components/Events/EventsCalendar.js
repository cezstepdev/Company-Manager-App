import React, {useState} from 'react'
import { Calendar } from '@fullcalendar/core';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Events.css'

const EventsCalendar = () => {
    const [events, setEvents] = useState([
        {"id": 1,"title": "All Day Event","start": "2021-11-01"},
        {"id": 2,"title": "Long Event","start": "2021-11-07","end": "2021-11-10"},
        {"id": 3,"title": "Repeating Event","start": "2021-11-09T16:00:00"},
        {"id": 4,"title": "Repeating Event","start": "2021-11-16T16:00:00"},
        {"id": 5,"title": "Conference","start": "2021-11-11","end": "2021-11-13"},
        {"id": 6,"title": "Meeting","start": "2021-11-12T10:30:00","end": "2021-11-12T12:30:00"},
        {"id": 7,"title": "Lunch","start": "2021-11-12T12:00:00"},
        {"id": 8,"title": "Meeting","start": "2021-11-12T14:30:00"},
        {"id": 9,"title": "Happy Hour","start": "2021-11-12T17:30:00"},
        {"id": 10,"title": "Dinner","start": "2021-11-12T20:00:00"},
        {"id": 11,"title": "Birthday Party","start": "2021-11-13T07:00:00"},
        {"id": 12,"title": "Click for Google","url": "https://www.google.com/","start": "2021-11-28"}
    ]);

    const options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultView: 'dayGridYear',
        defaultDate: '2017-02-01',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true
    };

    return (
        <div className="events">
            <div className="calendar">
                <FullCalendar events={events} options={options} />
            </div>
        </div>
    );
};

export default EventsCalendar;