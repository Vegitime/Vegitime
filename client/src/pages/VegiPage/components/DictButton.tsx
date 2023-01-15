import { Dispatch, SetStateAction, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { getAsset } from 'utils';
import { flexContainer } from 'styles';

interface Text {
  children: string;
  setLevel: Dispatch<SetStateAction<number>>;
  isDisabled?: boolean;
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

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 3.75rem;
  background: ${({ disabled }) =>
    disabled ? 'var(--color-light-green)' : 'var(--color-normal-green)'};
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

export default function DictButton({ children, setLevel, isDisabled }: Text) {
  const { id } = useParams();
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    async function analyzeSentiment(content: string) {
      const res = await axios.patch(
        `${process.env.URL}api/vegetables/${id}/praise`,
        { content },
        { withCredentials: true }
      );
      const { sentiment } = res.data.body.data;
      if (sentiment === 'positive') setLevel((level) => level + 1);
    }

    if (!listening && transcript !== '') {
      analyzeSentiment(transcript);
    }
  }, [listening]);

  const handleButtonClick = () => {
    SpeechRecognition.startListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <ButtonContainer>
      <Button
        onClick={handleButtonClick}
        disabled={isDisabled ? true : listening ? true : false}
      >
        <Img src={listening ? getAsset('micon.svg') : getAsset('micoff.svg')} />
        {children}
      </Button>
      <p className="sr-only">{transcript}</p>
    </ButtonContainer>
  );
}
