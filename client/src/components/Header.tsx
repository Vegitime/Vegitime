import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { MoneyInfo } from 'components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  ${flexContainer({ d: 'row', w: 'nowrap', jc: 'space-between' })}
  padding: var(--spacing-xxl) var(--spacing-md) var(--spacing-xxs);
  background-color: var(--color-skyblue);
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 var(--spacing-xxs) var(--spacing-xxs);
  z-index: 1000;
`;

const StyledDiv = styled.div`
  ${flexContainer({ d: 'row', w: 'nowrap', g: 'var(--spacing-base)' })}
`;

export default function Header({ money }: { money?: number }) {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios
        .get(`${process.env.URL}api/users/logout`, { withCredentials: true })
        .then((response) => response.data);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledHeader>
      <button onClick={() => navigate(-1)}>
        <img
          width={40}
          height={40}
          src={getAsset('arrow.svg')}
          alt="뒤로 가기"
        />
      </button>
      <StyledDiv>
        <MoneyInfo size="large">{money}</MoneyInfo>
        <button type="button" onClick={logout}>
          <img
            width={40}
            height={40}
            src={getAsset('logout.svg')}
            alt="로그아웃"
          />
        </button>
      </StyledDiv>
    </StyledHeader>
  );
}
