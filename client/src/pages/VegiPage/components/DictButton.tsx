import { useEffect } from 'react';
import styled from 'styled-components';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { getAsset } from 'utils';
import { flexContainer } from 'styles';
import praise from '../../../../../server/mock/praise';

interface Text {
  children: string;
  increaseLevel: () => void;
}

const ButtonContainer = styled.div`
  ${flexContainer({
    d: 'column',
    ai: 'center',
    jc: 'center',
    g: 'var(--spacing-xxxs)',
  })}
`;

const Img = styled.img`
  width: 2.5rem;
  height: auto;
`;

const Button = styled.button`
  width: 100%;
  height: 3.75rem;
  background: var(--color-normal-green);
  border: none;
  border-radius: 3.125rem;
  font: inherit;
  color: var(--color-white);
  font-size: var(--text-md);
  cursor: pointer;
  ${flexContainer({
    d: 'row',
    ai: 'center',
    jc: 'center',
    g: 'var(--spacing-xxxs)',
  })}
`;

export default function DictButton({ children, increaseLevel }: Text) {
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [sentimental] = praise;

  useEffect(() => {
    if (!listening && sentimental) {
      increaseLevel();
    } // sentimental 조건에 따라, positive, negative, neutral을 판단할 수 있습니다! 그에 따라 캐릭터 레벨업 여부 판단 가능합니다!
  }, [listening]);

  const handleButtonClick = () => {
    SpeechRecognition.startListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <ButtonContainer>
      <Button onClick={handleButtonClick}>
        <Img src={listening ? getAsset('micon.svg') : getAsset('micoff.svg')} />
        {children}
      </Button>
      <p className="sr-only">{transcript}</p>
    </ButtonContainer>
  );
}
