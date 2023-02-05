import styled from 'styled-components';
interface ImgProps {
  type: string;
}

const Img = styled.img<ImgProps>`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: ${({ type }) =>
    type === 'main' ? 'calc(-1 * var(--spacing-base))' : 0};
  z-index: -10000;
`;

export default function FooterImg({ type }: { type: string }) {
  const typeInfo: { [key: string]: string } = {
    start: `${process.env.ASSET_PATH}/background_img.png`,
    main: `${process.env.ASSET_PATH}/background_img_vegi.png`,
  };
  return <Img type={type} src={typeInfo[type]} alt="푸터 이미지" />;
}
