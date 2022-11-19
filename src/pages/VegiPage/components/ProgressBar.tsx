interface TextType {
  text: string;
}

export default function ProgressBar({ text }: TextType) {
  return (
    <Container>
      <FrontBar />
      <BackBar />
      <P>{text}</P>
    </Container>
  );
}
