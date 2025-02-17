import styled from 'styled-components'

import { ChevronDownIcon } from '../icon'
import { ButtonTypes } from '../../types/button.ts'

interface Props {
    text: string
    type: ButtonTypes
    onClick: () => void
}

const palette = [
    {
        color: '#292929',
        background: '#FFFFFF',
        stroke: '#D9D9D9',
    },
    {
        color: '#FAFCFE',
        background: '#35376E',
        stroke: '#292959',
    },
]

function Button({ text, type, onClick }: Props) {
    return (
        <ButtonLayout color={palette[type].color} background={palette[type].background} stroke={palette[type].stroke} onClick={onClick}>
            <ButtonText>{text}</ButtonText>
            <ChevronDownIcon width={'1.2rem'} height={'0.9rem'} fill={palette[type].color} />
        </ButtonLayout>
    )
}

const ButtonLayout = styled.div<{ color: string; background: string; stroke: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid ${props => props.stroke};
    border-radius: 50rem;
    background-color: ${props => props.background};
    color: ${props => props.color};
    width: fit-content;
    column-gap: 0.4rem;
    padding: 0.8rem 1.2rem;
`

const ButtonText = styled.span`
    font-size: 1.4rem;
    text-align: center;
`

export default Button
