import { ReactComponent as Home } from '@/assets/home.svg';
import { ReactComponent as Logout } from '@/assets/logout.svg';
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
      <nav></nav>
    </>
  );
}
