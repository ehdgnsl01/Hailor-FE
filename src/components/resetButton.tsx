import React from 'react'
import styled from 'styled-components'

interface ResetButtonProps {
    onClick: () => void
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
    return (
        <ButtonLayout onClick={onClick}>
            <Icon />
        </ButtonLayout>
    )
}

const ButtonLayout = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0.8rem;
`

const Icon = styled.img.attrs({
    src: '/ResetIcon.svg',
    alt: 'Reset',
})`
    width: 1.6rem;
    height: 1.6rem;
    opacity: 0.6;
`

export default ResetButton
