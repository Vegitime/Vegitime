export function executeFuncOnTime(
  func: () => void,
  { hour, minute }: { hour: number; minute: number }
) {
  const date = new Date();
  const year = date.getFullYear(); // 2021
  const month = date.getMonth();
  const day = date.getDate(); // 10

  const oprDate = new Date(year, month, day, hour, minute);
  const nowDate = new Date();

  const timer = oprDate.getTime() - nowDate.getTime();
  if (timer < 0) {
    if (timer > -60000) func();
    return;
  } else {
    setTimeout(func, timer);
  }
}
