import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import User from './pages/users/user.tsx'
import Admin from './pages/admin/admin.tsx'
import Home from './pages/users/home.tsx'
import Search from './pages/users/search.tsx'
import Reservation from './pages/users/reservation.tsx'
import Chat from './pages/users/chat.tsx'
import MyPage from './pages/users/mypage.tsx'
import Main from './pages/main.tsx'
import Login from './pages/login/login.tsx'
import Register from './pages/login/register.tsx'
import Payment from './pages/payment/payment.tsx'
import PaymentCancel from './pages/payment/paymentCancel.tsx'
import PaymentFailure from './pages/payment/paymentFailure.tsx'
import PaymentSuccess from './pages/payment/paymentSuccess.tsx'
import { useEffect } from 'react'

const Layout = styled.div`
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
`

function App() {
    function setScreenSize() {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    useEffect(() => {
        setScreenSize()
    })
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Main />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="user" element={<User />}>
                        <Route path="" element={<Home />} />
                        <Route path="search" element={<Search />}>
                            <Route path="payment" element={<Payment />}>
                                <Route path="cancel" element={<PaymentCancel />} />
                                <Route path="failure" element={<PaymentFailure />} />
                                <Route path="success" element={<PaymentSuccess />} />
                            </Route>
                        </Route>
                        <Route path="reservation" element={<Reservation />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="mypage" element={<MyPage />} />
                    </Route>
                    <Route path="admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App
