import { Outlet } from 'react-router-dom'
import Header from '../../components/header.tsx'
import Navigation from '../../components/navigation.tsx'
import styled from 'styled-components'

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100%;
    min-height: 100%;
`

const ContentLayout = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: calc(env(safe-area-inset-bottom, 0.8rem) + 7.3rem);
`

function User() {
    return (
        <MainLayout>
            <Header />
            <ContentLayout id="content-layout">
                {/* 각 페이지 컴포넌트가 이 Outlet에 렌더링 됨 */}
                <Outlet />
            </ContentLayout>
            <Navigation />
        </MainLayout>
    )
}

export default User
