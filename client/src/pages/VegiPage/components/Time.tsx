import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAsset } from 'utils';

interface TimeType {
  text: string;
}

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const P = styled.p`
  margin: 2rem 0;
  font-size: var(--text-lg);
  text-align: center;
`;

const SettingImg = styled.img`
  width: 2.5rem;
  height: auto;
`;

export default function Time({ text }: TimeType) {
  return (
    <TimeContainer>
      <P>{text}</P>
      <Link to="/settingalarm">
        <SettingImg src={getAsset('setting.svg')} />
      </Link>
    </TimeContainer>
  );
}
