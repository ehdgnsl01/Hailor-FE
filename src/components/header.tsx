import styled from 'styled-components'

const HeaderLayout = styled.header`
    width: 100%;
    z-index: 1000;
`

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0; /* 텍스트 여백 */
`

const GradientText = styled.span`
    font-weight: 500; /* 두꺼운 글씨 */
    font-style: oblique;
    font-size: 2.4rem;
    background: linear-gradient(45deg, #292959, #5e58bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
`

const HeaderDivider = styled.div`
    width: 100%;
    height: 0.1rem;
    background: #d9d9d9;
    opacity: 60%;
`

function Header() {
    return (
        <HeaderLayout>
            <HeaderContent>
                <GradientText>Hailor</GradientText>
            </HeaderContent>
            <HeaderDivider />
        </HeaderLayout>
    )
}

export default Header
