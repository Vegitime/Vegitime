import { Header, Title, Navigation } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import users from '../../../../server/mock/users.js';
import Chart from 'react-apexcharts';

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
  width: 100%;
  height: calc(2 * var(--spacing-xxxl));
  .apexcharts-tooltip-series-group .apexcharts-tooltip-marker::after {
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: blue;
  }
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
  const success = vegis.map(
    ({ attendance }) => attendance.filter((a) => a === true).length
  );
  const fail = vegis.map(
    ({ attendance }) => attendance.filter((a) => a === false).length
  );

  const chart = {
    options: {
      chart: {
        id: 'basic-bar',
        fontFamily: 'Y_Spotlight',
        events: {
          click: (event: any, chartContext: any) => {
            console.log(event, chartContext);
          },
        },
      },
      colors: [
        function ({ dataPointIndex }: { dataPointIndex: number }) {
          const name = categories[dataPointIndex];
          return name == '가지 가지'
            ? '#734382'
            : name == '당근 당근'
            ? '#f68121'
            : '#7a992a';
        },
        '#999999',
      ],
      plotOptions: {
        bar: {
          distributed: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#fff'],
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          show: true,
        },
        y: {
          formatter: function (value: number) {
            return `${value} 일`;
          },
        },
        marker: {
          show: true,
        },
      },
      xaxis: {
        categories,
        labels: {
          style: {
            fontSize: 'var(--text-xs)',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: 'var(--text-xs)',
          },
        },
      },
    },
    series: [
      {
        name: '성공',
        data: success,
      },
      {
        name: '실패',
        data: fail,
      },
    ],
  };
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
        </StyledUl>
        <StyledDiv>
          <Chart
            options={chart.options}
            series={chart.series}
            width="100%"
            height="100%"
            type="bar"
          />
        </StyledDiv>
      </StyledMain>
      <Navigation />
    </>
  );
}
