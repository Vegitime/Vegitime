import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

export default function FooterImg({ type }: { type: string }) {
  const typeInfo: { [key: string]: string } = {
    start: '/assets/background_img.png',
    main: '/assets/background_img_vegi.png',
  };
  return <Img src={typeInfo[type]} alt="푸터 이미지" />;
}
