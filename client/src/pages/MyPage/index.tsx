import { Header, Title, Navigation } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import users from '../../../../server/mock/users.js';
import Chart from 'react-apexcharts';
import { makeChart } from 'utils';

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xs);
`;

const StyledUl = styled.ul`
  ${flexContainer({ d: 'column', w: 'wrap', g: 'var(--spacing-xxs)' })}
  width: 100%;
  li {
    font-size: var(--text-sm);
    line-height: var(--text-lg);
  }
`;

const StyledDiv = styled.div`
  min-width: 100%;
  height: 18.75rem;
  .apexcharts-tooltip-series-group:last-of-type
    .apexcharts-tooltip-marker::after {
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #999999;
  }
`;

export default function MyPage() {
  const { nickname, money, vegis, harvest } = users[0];
  const categories = vegis.map(({ name }) => name);
  const types = vegis.map(({ type }) => type);
  const success = vegis.map(
    ({ attendance }) => attendance.filter((a) => a === true).length
  );
  const fail = vegis.map(
    ({ attendance }) => attendance.filter((a) => a === false).length
  );

  const chart = makeChart({ categories, types, success, fail });

  return (
    <>
      <Header />
      <StyledMain>
        <Title>My Page</Title>
        <StyledUl>
          <li>닉네임 : {nickname}</li>
          <li>자산 : {money}원 </li>
          <li>판매 작물 : {harvest}개</li>
          <li>보유 작물 : {vegis.length}개</li>
          <li>통계: </li>
          <StyledDiv>
            <Chart
              options={chart.options}
              series={chart.series}
              width="100%"
              height="100%"
              type="bar"
            />
          </StyledDiv>
        </StyledUl>
      </StyledMain>
      <Navigation />
    </>
  );
}
