import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

import React, { Fragment, useState, useEffect, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimezoneSelect from "./TimezoneSelect";

const DnDCalendar = withDragAndDrop(Calendar);


const defaultTZ = moment.tz.guess();
const defaultDateStr = "2015-4-13";

function getDate(str, momentObj) {
  return momentObj(str, "YYYY-MM-DD").toDate();
}

export default function MyCalendar() {
  const [timezone, setTimezone] = useState(defaultTZ);
  const [data, setData] = useState([]);

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      moment.tz.setDefault(timezone);
      return {
        defaultDate: getDate(defaultDateStr, moment),
        getNow: () => moment().toDate(),
        localizer: momentLocalizer(moment),
        // myEvents: [...events],
        scrollToTime: moment().toDate(),
      };
    }, [timezone]);

  useEffect(() => {
    return () => {
      moment.tz.setDefault(); // reset to browser TZ on unmount
    };
  }, []);

  let today = new Date();

  return (
    <Fragment>
      <TimezoneSelect
        defaultTZ={defaultTZ}
        setTimezone={setTimezone}
        timezone={timezone}
      />
      <div className="height600">
        <DnDCalendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          onSelectEvent={(ele) => {
            console.log("onSelectEvent", ele);
          }}
          onDoubleClickEvent={(ele) => {
            console.log("onDoubleClickEvent", ele);
          }}
          getNow={getNow}
          localizer={localizer}
          scrollToTime={scrollToTime}
          //   view="week"
          step={15}
          views={["week"]}
          min={
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)
          }
          // end time 5:00pm
          max={
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23)
          }
          allDayAccessor={["sun", "mon"]}
        />
      </div>
    </Fragment>
  );
}
