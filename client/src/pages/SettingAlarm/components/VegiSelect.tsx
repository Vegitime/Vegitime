import { useState } from 'react';
import styled from 'styled-components';
import { VEGETABLE_INFO } from 'utils';
import { flexContainer } from 'styles';
import { ReactComponent as Arrow } from '@/assets/polygon.svg';

interface SelectProps extends MenuProps {
  types: ('avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato')[];
}

interface MenuProps {
  maxHeight: string;
}

const SelectArrow = styled(Arrow)`
  position: absolute;
  right: var(--spacing-lg);
  top: 50%;
  transform: translateY(-50%);
`;

const Container = styled.div`
  width: 100%;
`;

const Combo = styled.div`
  position: relative;
`;

const ComboInput = styled.div`
  ${flexContainer({ ai: 'center', jc: 'center' })}
  height: 3.75rem;
  background-color: var(--color-white);
  border-radius: 3.125rem;
  font-size: var(--text-md);
  &[aria-expanded='true'] {
    border: 2px solid var(--color-normal-green);
  }
`;

const ComboMenu = styled.div<MenuProps>`
  width: 100%;
  position: absolute;
  left: 0;
  top: 110%;
  background-color: var(--color-white);
  border: 2px solid var(--color-normal-green);
  border-radius: 0.9375rem;
  max-height: ${({ maxHeight }) => maxHeight};
  overflow-y: scroll;
  z-index: 10000;
`;

const ComboOption = styled.div`
  padding: var(--spacing-base) 0;
  text-align: center;
  font-size: var(--text-sm);

  &:hover,
  &:focus {
    background-color: var(--color-grey);
  }

  &[aria-selected='true'] {
    color: var(--color-white);
    background-color: var(--color-normal-green);
  }
`;

export default function VegiSelect({ maxHeight, types }: SelectProps) {
  const [selectedIdx, setSelectedIdx] = useState(2);
  const [isopen, setIsOpen] = useState(false);
  return (
    <Container>
      <label id="combo-label" className="sr-only">
        알람을 설정할 야채를 선택하세요
      </label>
      <Combo>
        <ComboInput
          aria-controls="listbox"
          aria-expanded={isopen ? true : false}
          aria-haspopup="listbox"
          aria-labelledby="combo-label"
          id="combo"
          role="combobox"
          tabIndex={0}
          aria-activedescendant={isopen ? `combo-${selectedIdx}` : ''}
          onClick={() => setIsOpen((isopen) => !isopen)}
        >
          {VEGETABLE_INFO[types[selectedIdx]].name}
          <SelectArrow
            transform={isopen ? 'rotate(180)' : ''}
            fill="var(--color-normal-green)"
          />
        </ComboInput>
        {isopen && (
          <ComboMenu
            role="listbox"
            id="listbox"
            aria-labelledby="combo-label"
            tabIndex={-1}
            maxHeight={maxHeight}
          >
            {types.map((type, idx) => {
              return (
                <ComboOption
                  key={type}
                  role="option"
                  id={`combo-${idx}`}
                  aria-selected={selectedIdx === idx ? 'true' : 'false'}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setIsOpen(false);
                  }}
                >
                  {VEGETABLE_INFO[type].name}
                </ComboOption>
              );
            })}
          </ComboMenu>
        )}
      </Combo>
    </Container>
  );
}

VegiSelect.defaultProps = {
  maxHeight: '200px',
};
