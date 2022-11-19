import styled from 'styled-components';

interface TextType {
  text: string;
}

const Container = styled.div`
  position: relative;
  width: 353px;
  margin: 0 auto 32px;
`;

const BackBar = styled.div`
  width: 353px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 50px;
  margin: 0 auto;
`;

const FrontBar = styled.div`
  width: calc(353px * (3 / 5));
  height: 30px;
  background-color: #a4c597;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50px;
  margin: 0 auto;
`;

const P = styled.p`
  width: 100%;
  font-size: 16px;
  color: #5f9538;
  position: absolute;
  top: 0px;
  left: 0px;
  text-align: center;
  margin: 0;
  line-height: 30px;
`;

export default function ProgressBar({ text }: TextType) {
  return (
    <Container>
      <FrontBar />
      <BackBar />
      <P>{text}</P>
    </Container>
  );
}
