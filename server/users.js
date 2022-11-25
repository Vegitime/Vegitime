const users = [
  {
    nickname: 'a',
    money: 1120,
    vegis: [
      {
        id: 1,
        type: 'eggplant',
        name: '가지 가지',
        level: 3,
        alarm: '',
        attendance: [true, true, false, true],
      },
      {
        id: 2,
        type: 'carrot',
        name: '당근 당근',
        level: 2,
        alarm: '',
        attendance: [true, false, false, true, true, false],
      },
      {
        id: 3,
        type: 'onion',
        name: '양파 양파',
        level: 1,
        alarm: '',
        attendance: [true, false, false, true, true, false, false],
      },
      {
        id: 4,
        type: 'eggplant',
        name: '가지 가지',
        level: 5,
        alarm: '',
        attendance: [false, false, true, false, false, true, true, true, true],
      },
    ],
    harvest: 5,
  },
];

export default users;
