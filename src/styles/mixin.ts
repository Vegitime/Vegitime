interface IAbsolute {
  [key: string]: number | string;
}
interface IFlexContainer {
  d?: string;
  w?: string;
  ai?: string;
  jc?: string;
  g?: number | string;
}

export const absolute = ({ t, b, l, r }: IAbsolute) => `
  position: absolute;
  top: ${typeof t === 'string' ? t : t && t + 'px'};
  bottom: ${typeof b === 'string' ? b : b && b + 'px'};
  left: ${typeof l === 'string' ? l : l && l + 'px'};
  right: ${typeof r === 'string' ? r : r && r + 'px'};
`;

export const flexContainer = ({ d, w, ai, jc, g }: IFlexContainer) => `
  display: flex;
  flex-direction: ${d};
  flex-wrap: ${w};
  align-items: ${ai};
  justify-content: ${jc};
  gap: ${typeof g === 'string' ? g : g && g + 'px'};
`;
