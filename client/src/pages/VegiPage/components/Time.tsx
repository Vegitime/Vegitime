import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAsset } from 'utils';

interface TimeType {
  text: string;
  id: string;
}

const TimeContainer = styled.div`
  position: relative;
  top: -16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const P = styled.p`
  margin: var(--spacing-base) 0;
  font-size: var(--text-lg);
  text-align: center;
`;

const SettingImg = styled.img`
  width: 2.5rem;
  height: auto;
`;

export default function Time({ text, id }: TimeType) {
  return (
    <TimeContainer>
      <P>{text === '' ? '시간을 설정해주세요' : text}</P>
      <Link to={`/settingalarm/${id}`}>
        <SettingImg src={getAsset('setting.svg')} />
      </Link>
    </TimeContainer>
  );
}
