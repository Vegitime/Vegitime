/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FooterImg from '../StartPage/components/FooterImg';
import { ReactComponent as Formuser } from '@/assets/formuser.svg';
import { ReactComponent as Padlock } from '@/assets/padlock.svg';
import { ReactComponent as Name } from '@/assets/name.svg';


export default function SignUp() {
  return (
    <>
      <div>
        <h2>Sign up</h2>
        <form>
          <fieldset>
            <legend className="sr-only">회원 로그인 폼</legend>
            
            <div>
              <label className="sr-only" htmlFor="userId">아이디</label>
              <Formuser fill='#01192C' width="35" height="35"/>
              <input type="text" id="userId" required placeholder="아이디를 입력해주세요"/>
              <div>영문, 숫자 포함 6~15자로 입력해주세요.</div>
              <button>완료!</button>
            </div>

            <div>
              <label className="sr-only" htmlFor="userNickName">닉네임</label>
              <Name fill='#01192C' width="35" height="35"/>
              <input type="text" id="userNickName" required placeholder="닉네임을 입력해주세요"/>
              <div>1글자 이상 입력해주세요.</div>
            </div>
            
            <div>
              <label className="sr-only" htmlFor="userPwd">비밀번호</label>
              <Padlock fill='#01192C' width="35" height="35"/>
              <input type="password" id="userPwd" required placeholder="패스워드를 입력해주세요"/>
              <div>영문, 숫자 포함 6~10자로 입력해주세요.</div>
            </div>

            <div>
              <label className="sr-only" htmlFor="userPwdCheck">비밀번호 확인</label>
              <Padlock fill='#01192C' width="35" height="35"/>
              <input type="password" id="userPwdCheck" required placeholder="패스워드를 한 번 더 입력해주세요"/>
              <div>비밀번호가 일치하지 않아요.</div>
            </div>
            
            <button type="submit">회원가입</button>
          </fieldset>
        </form>

        <div>
          <span>아직 회원이세요?</span>
          <Link to="/">로그인</Link>
        </div>
      </div>
      <FooterImg type="start" />
    </>
  );
}
