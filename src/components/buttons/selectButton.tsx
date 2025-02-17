import styled from 'styled-components'

interface Props {
    text1: string
    text2: string
    onClick1: () => void
    onClick2: () => void
}

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 2rem 1.6rem;
    gap: 1.6rem;
`

const Button = styled.div<{ color: boolean }>`
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    background-color: ${props => (props.color ? '#35376E' : '#FFFFFF')};
    border: 0.1rem solid ${props => (props.color ? '#292959' : '#35376e')};
    border-radius: 50rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: ${props => (props.color ? '#FFFFFF' : '#35376E')};
    min-width: 12rem;
    padding: 1.2rem 2.4rem;
`

function SelectButton({ text1, text2, onClick1, onClick2 }: Props) {
    return (
        <ButtonGroup>
            <Button color={false} onClick={onClick1}>
                {text1}
            </Button>
            <Button color={true} onClick={onClick2}>
                {text2}
            </Button>
        </ButtonGroup>
    )
}

export default SelectButton
