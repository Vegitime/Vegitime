import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  min-width: 390px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

export default function FooterImg({ type }: { type: string }) {
  const typeInfo: { [key: string]: string } = {
    start: `${process.env.ASSET_PATH}/background_img.png`,
    main: `${process.env.ASSET_PATH}/background_img_vegi.png`,
  };
  return <Img src={typeInfo[type]} alt="푸터 이미지" />;
}
