import { ReactComponent as Eggplant } from '@/assets/eggplant.svg';
import { ReactComponent as Remove } from '@/assets/remove.svg';

export default function AlarmList() {
  return (
    <container>
      <Eggplant />
      <span>AM 07:00</span>
      <Remove />
    </container>
  );
}
