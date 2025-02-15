import styled from 'styled-components'

const HeaderLayout = styled.header`
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: end;
    top: 0;
    width: 100%;
    min-height: 5rem;
    z-index: 1000;
    background-color: #ffffff;
    border-bottom: 0.1rem solid rgba(217, 217, 217, 0.6);
`

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0; /* 텍스트 여백 */
`

const GradientText = styled.span`
    font-weight: 500; /* 두꺼운 글씨 */
    font-style: italic;
    font-size: 2.4rem;
    background: linear-gradient(45deg, #292959, #5e58bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
`

function Header() {
    return (
        <HeaderLayout>
            <HeaderContent>
                <GradientText>Hailor</GradientText>
            </HeaderContent>
        </HeaderLayout>
    )
}

export default Header
