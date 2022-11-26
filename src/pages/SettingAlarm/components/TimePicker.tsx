import * as React from 'react';

export default function TimePicker() {
  const current = new Date();
  const [_hour, _minute, , ampm] = current
    .toLocaleTimeString('en-US')
    .replace(' ', ':')
    .split(':');
  const hour = +_hour;
  const minute = +_minute;
  const isAm = ampm === 'AM';
  console.log(hour, minute, ampm);

  return (
    <div
      id="timepicker-group"
      className="timepicker-spinbuttons"
      role="group"
      aria-labelledby="myTimepickerLabel myTimepickerTime"
    >
      <div id="myTimepickerLabel">Choose a time to wake up</div>
      <div className="date" id="myTimepickerTime">
        current value is {'Friday, June 30th, 2019'}
      </div>
      <div className="meridian spinbutton">
        <button
          type="button"
          className="decrease"
          tabIndex={-1}
          aria-label={isAm ? '' : 'AM'}
          disabled={isAm ? true : false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <polygon points="2,18 18,18 10,4"></polygon>
          </svg>
        </button>
        <div className="previous" aria-hidden="true">
          {isAm ? '' : 'AM'}
        </div>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={1}
          aria-valuetext={isAm ? 'AM' : 'PM'}
          aria-valuemin={0}
          aria-valuemax={1}
          aria-label="Meridian"
        >
          {isAm ? 'AM' : 'PM'}
        </div>
        <div className="next" aria-hidden="true">
          {isAm ? 'PM' : ''}
        </div>
        <button
          type="button"
          className="increase"
          tabIndex={-1}
          aria-label={isAm ? 'PM' : ''}
          disabled={isAm ? false : true}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <polygon points="2,4 18,4 10,18"></polygon>
          </svg>
        </button>
      </div>
      <div className="hour spinbutton">
        <button
          type="button"
          className="decrease"
          tabIndex={-1}
          aria-label="previous hour"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <polygon points="2,18 18,18 10,4"></polygon>
          </svg>
        </button>
        <div className="previous" aria-hidden="true">
          {hour === 1 ? 12 : hour - 1}
        </div>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={hour}
          aria-valuemin={1}
          aria-valuemax={12}
          aria-label="Hour"
        >
          {hour}
        </div>
        <div className="next" aria-hidden="true">
          {hour === 12 ? 1 : hour + 1}
        </div>
        <button
          type="button"
          className="increase"
          tabIndex={-1}
          aria-label="next hour"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <polygon points="2,4 18,4 10,18"></polygon>
          </svg>
        </button>
      </div>

      <div className="minute spinbutton">
        <button
          type="button"
          className="decrease"
          tabIndex={-1}
          aria-label="previous minute"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <polygon points="2,18 18,18 10,4"></polygon>
          </svg>
        </button>
        <div className="previous" aria-hidden="true">
          {minute === 1 ? 59 : minute - 1}
        </div>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={minute}
          aria-valuemin={0}
          aria-valuemax={59}
          aria-label="Minute"
        >
          {minute}
        </div>
        <div className="next" aria-hidden="true">
          {minute === 59 ? 0 : minute + 1}
        </div>
        <button
          type="button"
          className="increase"
          tabIndex={-1}
          aria-label="next minute"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <polygon points="2,4 18,4 10,18"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}
