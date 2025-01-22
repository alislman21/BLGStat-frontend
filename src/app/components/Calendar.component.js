import { useState } from "react";
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import 'react-calendar/dist/Calendar.css';


function CalendarShow(){
    const [date, setDate] = useState(new Date());

    const onChange = (date) => {
        setDate(date);
    }

    return(
        <div>
            <Calendar className='.react-calendar__tile--active' onChange={onChange} value={date} />
        </div>
    )
}

export default CalendarShow;