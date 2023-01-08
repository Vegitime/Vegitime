export const getDefaultAlarmFormat = () => {
  const date = new Date();
  const [hour, minute, , ampm] = date
    .toLocaleTimeString('en-US')
    .replace(' ', ':')
    .split(':');
  return `${ampm} ${hour}:${minute}`;
};

export const separateAlarmFormat = (datestr: string) => {
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
