interface Alarm {
  ampm: 'AM' | 'PM';
  hour: string;
  minute: string;
}

export const getDefaultAlarmFormat = () => {
  const date = new Date();
  const [hour, minute, , ampm] = date
    .toLocaleTimeString('en-US')
    .replace(' ', ':')
    .split(':');
  return `${ampm} ${hour}:${minute}`;
};

export const separateDefaultAlarmFormat = () => {
  const date = new Date();
  const [_hour, _minute, , ampm] = date
    .toLocaleTimeString('en-US')
    .replace(' ', ':')
    .split(':');
  return { hour: +_hour, minute: +_minute, ampm };
};

export const separateAlarmFormat = (datestr: string): Alarm => {
  const alarmFormat = datestr === '' ? getDefaultAlarmFormat() : datestr;
  const [ampm, hour, minute] = alarmFormat.replace(':', ' ').split(' ');
  return { ampm, hour, minute };
};

export const getAlarmFormat = ({
  hour,
  minute,
  ampm,
}: {
  hour: number;
  minute: number;
  ampm: 'AM' | 'PM';
}) => {
  return `${ampm} ${hour}:${minute}`;
};
