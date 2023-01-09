import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { VEGETABLE_INFO } from 'utils';
import { ReactComponent as Arrow } from '@/assets/polygon.svg';

interface VegiSelectProps {
  id: number;
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
}

interface SelectProps extends MenuProps {
  types: Array<VegiSelectProps>;
  selectedId: number;
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

const ComboOption = styled(Link)`
  display: block;
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

export default function VegiSelect({
  maxHeight,
  types,
  selectedId,
  ...props
}: SelectProps) {
  const [isopen, setIsOpen] = useState(false);

  const [selectedVegi] = types.filter(({ id: _id }) => _id === selectedId);

  return (
    <Container {...props}>
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
          aria-activedescendant={isopen ? `combo-${selectedId}` : ''}
          onClick={() => setIsOpen((isopen) => !isopen)}
        >
          {VEGETABLE_INFO[selectedVegi.type].name}
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
            {types.map((_type) => {
              const { type, id } = _type;
              return (
                <ComboOption
                  to={`/settingalarm/${id}`}
                  key={id}
                  role="option"
                  id={`combo-${id}`}
                  aria-selected={selectedId === id ? 'true' : 'false'}
                  onClick={() => {
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
