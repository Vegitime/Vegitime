interface chartArgs {
  categories: Array<string>;
  types: Array<string>;
  success: Array<number>;
  fail: Array<number>;
}

interface Icolors {
  [key: string]: string;
}

const vegiColors: Icolors = {
  avocado: '#075F22',
  carrot: '#FF8C0D',
  eggplant: '#C322FF',
  onion: '#FBFB71',
  radish: '#C2FF63',
  tomato: '#FE0B29',
};

export const makeChart = ({ categories, types, success, fail }: chartArgs) => ({
  options: {
    chart: {
      id: 'basic-bar',
      fontFamily: 'Y_Spotlight',
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          const { dataPointIndex } = config;
          const type = types[dataPointIndex];
          const $marker = document.querySelector(
            '.apexcharts-tooltip-series-group .apexcharts-tooltip-marker'
          );
          const $oldDiv = $marker?.querySelector('div');
          const $div = document.createElement('div');
          $div.style.width = '12px';
          $div.style.height = '12px';
          $div.style.borderRadius = '50%';
          $div.style.backgroundColor = vegiColors[type];
          $oldDiv === null
            ? $marker?.appendChild($div)
            : $marker?.replaceChild($div, $oldDiv as Node);
        },
      },
    },
    colors: [
      function ({ dataPointIndex }: { dataPointIndex: number }) {
        const type = types[dataPointIndex];
        return vegiColors[type];
      },
      '#999999',
    ],
    plotOptions: {
      bar: {
        distributed: false,
        columnWidth: '70%',
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
        formatter: function (val: number) {
          return val.toFixed(0);
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
});
