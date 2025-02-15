import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Main() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/user')
    }, [navigate])
    return <div>Hailor</div>
}

export default Main
