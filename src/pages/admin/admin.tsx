import { Outlet } from 'react-router-dom'
import Header from '../../components/header'
import Navigation from '../../components/navigation'
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

function Admin() {
    return (
        <MainLayout>
            <Header role="admin" />
            <ContentLayout>
                {/* 각 페이지 컴포넌트가 이 Outlet에 렌더링 됨 */}
                <Outlet />
            </ContentLayout>
            <Navigation isAdmin={true} />
        </MainLayout>
    )
}

export default Admin
