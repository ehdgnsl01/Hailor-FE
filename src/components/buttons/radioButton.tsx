import styled from 'styled-components'
import * as React from 'react'

interface Props {
    data: string[]
    selected: string
    onClick: (target: string) => void
}

function RadioButton({ data, selected, onClick }: Props) {
    return (
        <RadioButtonLayout>
            {data.map(
                (d, index): React.ReactNode => (
                    <ButtonItem key={`${d}-${index}`} onClick={() => onClick(d)} selected={d === selected} index={index} total={data.length}>
                        {d}
                    </ButtonItem>
                ),
            )}
        </RadioButtonLayout>
    )
}

const RadioButtonLayout = styled.div<{ columnGap?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid rgba(217, 217, 217, 0.6);
    border-radius: 50rem;
    background-color: #ffffff;
    color: #000000;
    width: fit-content;
    column-gap: 4.7rem;
    padding: 1.6rem 3.2rem;
`

const ButtonItem = styled.div<{ selected: boolean; index: number; total: number }>`
    font-weight: bold;
    font-size: 1.6rem;
    color: ${({ selected }) => (selected ? '#FFFFFF' : '#000000')};
    position: relative;
    padding: 0.8rem 1.6rem;
    z-index: 2;
    transition: color 0.3s ease-in-out;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: #35376e;
        border-radius: 50rem;
        transform: translate3d(-50%, -50%, 0) scale(${({ selected }) => (selected ? 1 : 0)});
        transition: transform 0.4s ease-in-out;
        padding: 1.2rem 1.6rem;
        z-index: -1;
    }

    ${({ selected, index, total }) =>
        selected &&
        `
            transform: translateX(${total === 1 ? 0 : index < total / 2 ? '10px' : '-10px'});
            transition: transform 0.4s ease-in-out;
    `}
`

export default RadioButton
