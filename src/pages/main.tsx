import Header from '../components/header.tsx'
import Navigation from '../components/navigation.tsx'
import styled from 'styled-components'

const MainLayout = styled.div`
    display: grid;
    width: 100vw;
    height: 100vh;
`

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`

function Main() {
    return (
        <MainLayout>
            <Header />
            <ContentLayout>content</ContentLayout>
            <Navigation />
        </MainLayout>
    )
}

export default Main
