import styled from 'styled-components';

interface LevelType {
  level: number;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 2rem;
  border-radius: 3.125rem;
  overflow: hidden;
`;

const BackBar = styled.div`
  width: 100%;
  height: 1.875rem;
  background-color: var(--color-white);
  margin: 0 auto;
`;

const FrontBar = styled.div<LevelType>`
  width: calc(100% * (${(props) => props.level} / 5));
  height: 1.875rem;
  background-color: var(--color-light-green);
  position: absolute;
  top: 0px;
  left: 0px;
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

export default function ProgressBar({ level }: LevelType) {
  return (
    <Container>
      <FrontBar level={level} />
      <BackBar />
      <P>{level} / 5</P>
    </Container>
  );
}
