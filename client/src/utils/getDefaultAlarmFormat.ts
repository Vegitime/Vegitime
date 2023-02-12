interface Alarm {
  ampm: 'AM' | 'PM';
  hour: number;
  minute: number;
}

export const getDefaultAlarmFormat = () => {
  const date = new Date();
  const [hour, minute, , ampm] = date
    .toLocaleTimeString('en-US')
    .replace(' ', ':')
    .split(':');
  return `${ampm} ${hour}:${minute}`;
};

export const separateDefaultAlarmFormat = (): Alarm => {
  const date = new Date();
  const [_hour, _minute, , _ampm] = date
    .toLocaleTimeString('en-US')
    .replace(' ', ':')
    .split(':');
  const ampm = _ampm as 'AM' | 'PM';

  return { hour: +_hour, minute: +_minute, ampm };
};

export const separateAlarmFormat = (datestr: string): Alarm => {
  const alarmFormat = datestr === '' ? getDefaultAlarmFormat() : datestr;
  const [_ampm, _hour, _minute] = alarmFormat.replace(':', ' ').split(' ');
  const ampm = _ampm as 'AM' | 'PM';

  return { ampm, hour: +_hour, minute: +_minute };
};

export const getAlarmFormat = ({ hour, minute, ampm }: Alarm) => {
  return `${ampm} ${hour}:${minute}`;
};

export const getAlarmTime = ({ hour, minute, ampm }: Alarm) => ({
  hour: hour === 12 && ampm === 'AM' ? 0 : ampm === 'PM' ? hour + 12 : hour,
  minute,
});
