const users = [
  {
    nickname: 'a',
    money: 1120,
    vegis: [
      {
        id: 1,
        type: 'avocado',
        name: '보카 도도',
        level: 3,
        alarm: 'AM 10:00',
        attendance: [true, true, false, true],
      },
      {
        id: 2,
        type: 'carrot',
        name: '당근 당근',
        level: 2,
        alarm: 'AM 7:00',
        attendance: [true, false, false, true, true, false],
      },
      {
        id: 3,
        type: 'eggplant',
        name: '가지 가지',
        level: 1,
        alarm: 'AM 8:00',
        attendance: [true, false, false, true, true, false, false],
      },
      {
        id: 4,
        type: 'onion',
        name: '양파 양파',
        level: 5,
        alarm: 'PM 6:30',
        attendance: [false, false, true, false, false, true, true, true, true],
      },
      {
        id: 5,
        type: 'radish',
        name: '무우 무우',
        level: 1,
        alarm: 'AM 12:05',
        attendance: [true, false, false, true, true, false, false],
      },
      {
        id: 6,
        type: 'tomato',
        name: '토마 토마',
        level: 5,
        alarm: '',
        attendance: [false, false, true, false, false, true, true, true, true],
      },
    ],
    harvest: 5,
  },
];

export default users;
