import styled from 'styled-components';

interface TextType {
  text: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 2rem;
`;

const BackBar = styled.div`
  width: 100%;
  height: 1.875rem;
  background-color: var(--color-white);
  border-radius: 3.125rem;
  margin: 0 auto;
`;

const FrontBar = styled.div`
  width: calc(100% * (3 / 5));
  height: 1.875rem;
  background-color: var(--color-light-green);
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 3.125rem;
  margin: 0 auto;
`;

const P = styled.p`
  width: 100%;
  font-size: var(--spacing-base);
  color: var(--color-normal-green);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
  text-align: center;
  margin: 0;
  line-height: 1;
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
