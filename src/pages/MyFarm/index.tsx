import { ReactComponent as Home } from '@/assets/home.svg';
import { ReactComponent as Logout } from '@/assets/logout.svg';
import { MoneyInfo } from './components';

export default function MyFarm() {
  return (
    <>
      <header>
        <Home />
        <MoneyInfo />
        <Logout />
      </header>
      <main></main>
      <nav></nav>
    </>
  );
}
