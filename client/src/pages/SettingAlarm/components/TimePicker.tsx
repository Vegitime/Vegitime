import styled from 'styled-components';
import { flexContainer } from 'styles';

const Container = styled.div`
  width: 100%;
  ${flexContainer({ d: 'row', w: 'nowrap', ai: 'center', jc: 'space-around' })}
  font-size: var(--text-md);
  &::before {
    content: '';
    width: calc(100% - var(--spacing-xxs) * 2);
    height: 3.75rem;
    display: block;
    position: absolute;
    z-index: -1;
    border-radius: 3.125rem;
    background-color: white;
  }

  .meridian,
  .hour,
  .minute {
    ${flexContainer({
      d: 'column',
      w: 'nowrap',
      ai: 'center',
      g: 'var(--spacing-xxxs)',
    })}
  }

  .meridian > button,
  .hour > button,
  .minute > button {
    width: 7.3125rem;
  }

  .meridian > div,
  .hour > div,
  .minute > div {
    width: 7.3125rem;
    height: 3.75rem;
    line-height: 3.75rem;
    text-align: center;
  }
`;

const CurrentHour = styled.div`
  &::after {
    content: ':';
    position: relative;
    left: 2.5rem;
  }
`;

const padStart = (time: number) => {
  const timeStr = time + '';
  return timeStr.padStart(2, '0');
};

export default function TimePicker() {
  const current = new Date();
  const [_hour, _minute, , ampm] = current
    .toLocaleTimeString('en-US')
    .replace(' ', ':')
    .split(':');
  const hour = +_hour;
  const minute = +_minute;
  const isAm = ampm === 'AM';

  return (
    <Container
      id="timepicker-group"
      className="timepicker-spinbuttons"
      role="group"
      aria-labelledby="myTimepickerLabel myTimepickerTime"
    >
      <div id="myTimepickerLabel" className="sr-only">
        기상 시간을 선택해주세요
      </div>
      <div className="sr-only" id="myTimepickerTime">
        현재 선택된 시간은 {isAm ? '오전' : '오후'} {hour}시 {minute}분 입니다
      </div>
      <div className="meridian">
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
      <div className="hour">
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
          {hour === 1 ? 12 : padStart(hour - 1)}
        </div>
        <CurrentHour
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={hour}
          aria-valuemin={1}
          aria-valuemax={12}
          aria-label="Hour"
        >
          {padStart(hour)}
        </CurrentHour>
        <div className="next" aria-hidden="true">
          {hour === 12 ? padStart(1) : padStart(hour + 1)}
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

      <div className="minute">
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
          {minute === 0 ? 59 : padStart(minute - 1)}
        </div>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={minute}
          aria-valuemin={0}
          aria-valuemax={59}
          aria-label="Minute"
        >
          {padStart(minute)}
        </div>
        <div className="next" aria-hidden="true">
          {minute === 59 ? padStart(0) : padStart(minute + 1)}
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
    </Container>
  );
}
