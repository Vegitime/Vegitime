interface TitleType {
  level: string;
  name: string;
}

export default function Title({ level, name }: TitleType) {
  return (
    <H2>
      <p>{level}</p>
      <p>{name}</p>
    </H2>
  );
}
