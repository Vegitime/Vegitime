import { ReactComponent as Home } from '@/assets/home.svg';
import { ReactComponent as Logout } from '@/assets/logout.svg';
import { ReactComponent as Alarmlist } from '@/assets/alarmlist.svg';
import { ReactComponent as User } from '@/assets/user.svg';
import { ReactComponent as Cart } from '@/assets/cart.svg';
import { MoneyInfo, LinkVegiInfo, Heading } from './components';

export default function MyFarm() {
  return (
    <>
      <header>
        <Home />
        <MoneyInfo />
        <Logout />
      </header>
      <main>
        <Heading text="My Farm" />
        <ul>
          <li>
            <LinkVegiInfo vegetble="eggplant" level={3} />
          </li>
          <li>
            <LinkVegiInfo vegetble="carrot" level={2} />
          </li>
          <li>
            <LinkVegiInfo vegetble="onion" level={1} />
          </li>
          <li>
            <LinkVegiInfo vegetble="eggplant" level={5} />
          </li>
        </ul>
      </main>
      <nav>
        <ul>
          <li>
            <Alarmlist />
            <User />
            <Cart />
          </li>
        </ul>
      </nav>
    </>
  );
}
