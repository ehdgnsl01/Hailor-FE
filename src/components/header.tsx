import styled from 'styled-components'

const HeaderLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
`

function Header() {
    // TODO: implement content
    return (
        <HeaderLayout>
            <span>header</span>
        </HeaderLayout>
    )
}

export default Header
