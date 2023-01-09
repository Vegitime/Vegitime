import styled from 'styled-components';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { getAsset } from 'utils';
import { flexContainer } from 'styles';

interface Text {
  children: string;
  onClickHandler: () => void;
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

export default function DictButton({ children, onClickHandler }: Text) {
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const handleButtonClick = async () => {
    await SpeechRecognition.startListening();
    onClickHandler();
  };

  return (
    <ButtonContainer>
      <Button onClick={handleButtonClick}>
        <Img src={listening ? getAsset('micon.svg') : getAsset('micoff.svg')} />
        {children}
      </Button>
      <p>{transcript}</p>
    </ButtonContainer>
  );
}
