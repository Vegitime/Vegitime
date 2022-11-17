export const absolute = ({ t, b, l, r }: { [key: string]: number }) => `
  position: absolute;
  top: ${t && t + 'px'};
  bottom: ${b && b + 'px'};
  left: ${l && l + 'px'};
  right: ${r && r + 'px'};
`;

export const flexContainer = ({
  d,
  w,
  ai,
  jc,
  g,
}: {
  d?: string;
  w?: string;
  ai?: string;
  jc?: string;
  g?: number | string;
}) => `
  display: flex;
  flex-direction: ${d};
  flex-wrap: ${w};
  align-items: ${ai};
  justify-content: ${jc};
  gap: ${typeof g === 'string' ? g : g && g + 'px'};
`;
