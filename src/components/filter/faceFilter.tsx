import { useState, useEffect } from 'react'
import styled from 'styled-components'
import RadioButton from '../radioButton'

interface FaceFilterProps {
    initialSelected: string | null
    onConfirm: (value: string) => void
}

const FaceFilter: React.FC<FaceFilterProps> = ({ initialSelected, onConfirm }) => {
    const [selected, setSelected] = useState<string>(initialSelected || '대면')

    useEffect(() => {
        setSelected(initialSelected || '대면')
    }, [initialSelected])

    return (
        <Container>
            <RadioButton data={['대면', '비대면', '대면·비대면']} selected={selected} onClick={(option: string) => setSelected(option)} />
            <SelectButton onClick={() => onConfirm(selected)}>선택하기</SelectButton>
        </Container>
    )
}

export default FaceFilter

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    padding-top: 2rem;
    overflow-y: scroll;
`

const SelectButton = styled.button`
    padding: 1.6rem 5rem;
    background-color: #35376e;
    color: #fafcfe;
    border: none;
    border-radius: 3rem;
    font-size: 1.8rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #292959;
    }
`
