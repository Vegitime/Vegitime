export default function Heading({ text }: IHeading) {
  return <h2>{text}</h2>;
}

interface IHeading {
  text: string;
}
