import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './pages/user.tsx'
import Admin from './pages/admin.tsx'
import Home from './components/home.tsx'
import Search from './components/search.tsx'
import Reservation from './components/reservation.tsx'
import Chat from './components/chat.tsx'
import MyPage from './components/mypage.tsx'
import styled from 'styled-components'

const Layout = styled.div`
    width: 100vw;
    /* 데스크탑/태블릿 환경 스타일 (768px = 48rem, 500px = 31.25rem, 10px = 0.625rem) */
    @media (min-width: 48rem) {
        width: 31.25rem;
        left: 50%;
    }
`

function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<User />}>
                        <Route path="" element={<Home />} />
                        <Route path="search" element={<Search />} />
                        <Route path="reservation" element={<Reservation />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="mypage" element={<MyPage />} />
                    </Route>
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App
