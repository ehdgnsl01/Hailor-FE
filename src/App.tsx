import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main.tsx'
import Admin from './pages/admin.tsx'
import styled from 'styled-components'

const Layout = styled.div`
    width: 100vw;
    height: 100vh;
`

function App() {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App
