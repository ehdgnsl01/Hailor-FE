import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { userStore } from '../store/user.ts'

function Main() {
    const navigate = useNavigate()
    const { getUser } = userStore()
    const user = getUser()
    useEffect(() => {
        if (!user.role || user.role === 'USER') {
            navigate('/user')
        } else {
            navigate('/admin')
        }
    }, [navigate])
    return <div>Hailor</div>
}

export default Main
