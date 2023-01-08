import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { ReactComponent as Arrow } from '@/assets/polygon.svg';
import { separateAlarmFormat } from 'utils';

interface keyDownHandlerArgs {
  e: React.KeyboardEvent<HTMLDivElement>;
  min: number;
  max: number;
  setState: Dispatch<SetStateAction<number>>;
}
interface timePickerProps {
  hour: number;
  minute: number;
  isAm: boolean;
  setHour: Dispatch<SetStateAction<number>>;
  setMinute: Dispatch<SetStateAction<number>>;
  setIsAm: Dispatch<SetStateAction<boolean>>;
}

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

  .previous,
  .next {
    color: var(--color-grey);
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
    position: absolute;
    left: 66vw;
  }
`;

const padStart = (time: number) => {
  const timeStr = time + '';
  return timeStr.padStart(2, '0');
};

const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
  window.getSelection()?.selectAllChildren(e.target as Node);
};

const handleKeyDown = ({ e, min, max, setState }: keyDownHandlerArgs) => {
  if (
    !e.key.match(`[0-9]`) &&
    !e.key.includes('Arrow') &&
    !e.key.includes('Page') &&
    e.key !== 'Tab' &&
    e.key !== 'Backspace' &&
    e.key !== 'Delete' &&
    e.key !== 'Enter' &&
    e.key !== 'Home' &&
    e.key !== 'End'
  ) {
    e.preventDefault();
    return;
  }
  const target = e.target as HTMLDivElement;
  const value = +target.innerText;
  if (e.key === 'Enter' || e.key === 'Tab') {
    e.preventDefault();
    if (value >= min && value <= max) {
      setState(value);
      target.blur();
      window.getSelection()?.removeAllRanges();
    }
  }
};

const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
  const target = e.target;
  const text = target.textContent ?? '';
  if (text.length > 2) {
    target.textContent = text.slice(-2);
    const range = document.createRange();
    range.selectNodeContents(target);
    range.collapse(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};

export default function TimePicker({
  hour,
  minute,
  isAm,
  setHour,
  setMinute,
  setIsAm,
}: timePickerProps) {
  return (
    <Container
      id="timepicker-group"
      role="group"
      aria-labelledby="myTimepickerLabel myTimepickerTime"
    >
      <div id="myTimepickerLabel" className="sr-only">
        기상 시간을 선택해주세요
      </div>
      <div id="myTimepickerTime" className="sr-only">
        현재 선택된 시간은 {isAm ? '오전' : '오후'} {hour}시 {minute}분 입니다
      </div>

      <div className="meridian">
        <button
          type="button"
          tabIndex={-1}
          aria-label={isAm ? '' : '오전'}
          disabled={isAm ? true : false}
          onClick={() => {
            setIsAm(true);
          }}
        >
          <Arrow transform="rotate(180)" />
        </button>
        <div className="previous" aria-hidden="true">
          {isAm ? '' : 'AM'}
        </div>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={1}
          aria-valuetext={isAm ? '오전' : '오후'}
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
          tabIndex={-1}
          aria-label={isAm ? '오후' : ''}
          disabled={isAm ? false : true}
          onClick={() => {
            setIsAm(false);
          }}
        >
          <Arrow />
        </button>
      </div>

      <div className="hour">
        <button
          type="button"
          tabIndex={-1}
          aria-label="1시간 감소"
          onClick={() => {
            setHour(hour === 1 ? 12 : hour - 1);
          }}
        >
          <Arrow transform="rotate(180)" />
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
          contentEditable={true}
          onClick={handleDivClick}
          onKeyDown={(e) => {
            handleKeyDown({ e, setState: setHour, min: 1, max: 12 });
          }}
          onInput={handleInput}
        >
          {padStart(hour)}
        </CurrentHour>
        <div className="next" aria-hidden="true">
          {hour === 12 ? padStart(1) : padStart(hour + 1)}
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-label="1시간 증가"
          onClick={() => {
            setHour(hour === 12 ? 1 : hour + 1);
          }}
        >
          <Arrow />
        </button>
      </div>

      <div className="minute">
        <button
          type="button"
          tabIndex={-1}
          aria-label="1분 감소"
          onClick={() => {
            setMinute(minute === 0 ? 59 : minute - 1);
          }}
        >
          <Arrow transform="rotate(180)" />
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
          contentEditable={true}
          onClick={handleDivClick}
          onKeyDown={(e) => {
            handleKeyDown({ e, setState: setMinute, min: 0, max: 59 });
          }}
          onInput={handleInput}
        >
          {padStart(minute)}
        </div>
        <div className="next" aria-hidden="true">
          {minute === 59 ? padStart(0) : padStart(minute + 1)}
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-label="1분 증가"
          onMouseDown={() => {
            setMinute(minute === 59 ? 0 : minute + 1);
          }}
        >
          <Arrow />
        </button>
      </div>
    </Container>
  );
}
