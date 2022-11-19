/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FooterImg from '../StartPage/components/FooterImg';
import { ReactComponent as Formuser } from '@/assets/formuser.svg';
import { ReactComponent as Padlock } from '@/assets/padlock.svg';

export default function SignIn() {
  return (
    <>
      <section className="signin">
        <h2 className="signin-title">Sign in</h2>
        <form className="signin-form">
          <fieldset>
            <legend className="sr-only">회원 로그인 폼</legend>
            <div className="user-id">
              <label className="sr-only" htmlFor="userId">아이디</label>
              <Formuser fill='#01192C' width="35" height="35"/>
              <input type="text" id="userId" required placeholder="아이디를 입력해주세요"/>
            </div>
            <div>아이디를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.</div>
            <div className="user-pwd">
              <label className="sr-only" htmlFor="userPwd">비밀번호</label>
              <Padlock fill='#01192C' width="35" height="35"/>
              <input type="password" id="userPwd" required placeholder="패스워드를 입력해주세요"/>
            </div>
            <div>비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.</div>
            <div>일치하는 회원 정보가 없어요. 다시 시도해주세요.</div>
            <button type="submit" className="signin-button">로그인</button>
          </fieldset>
        </form>
        <div>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/" className="icon-right-open">화원가입</Link>
        </div>
      </section>
      <FooterImg type="start" />
    </>
  );
}
