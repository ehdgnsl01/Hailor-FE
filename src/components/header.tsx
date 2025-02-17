import styled from 'styled-components'

interface HeaderProps {
    role?: 'admin' | 'user'
}

const HeaderLayout = styled.header`
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: end;
    top: 0;
    width: 100%;
    min-height: 5rem;
    z-index: 9999;
    background-color: #ffffff;
    border-bottom: 0.1rem solid rgba(217, 217, 217, 0.6);
`

const HeaderContent = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding: 0.4rem 0;
`

const GradientText = styled.span`
    font-weight: 500;
    font-style: italic;
    font-size: 2.4rem;
    background: linear-gradient(45deg, #292959, #5e58bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
`

const AdminTag = styled.span`
    font-size: 1.2rem;
    color: red;
    margin-left: 0.5rem;
`

function Header({ role }: HeaderProps) {
    return (
        <HeaderLayout>
            <HeaderContent>
                <GradientText>Hailor</GradientText>
                {role === 'admin' && <AdminTag>Admin</AdminTag>}
            </HeaderContent>
        </HeaderLayout>
    )
}

export default Header
