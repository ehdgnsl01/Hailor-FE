import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { userStore } from '../store/user'

function Main() {
    const navigate = useNavigate()
    const { getUser } = userStore()
    const user = getUser()

    // user.role이 변할 경우에 effect가 다시 실행되어야 하므로 의존성 배열에 추가
    useEffect(() => {
        if (!user.role) {
            navigate('/user/mypage')
        } else if (!user.role || user.role === 'USER') {
            navigate('/user')
        } else {
            navigate('/admin')
        }
    }, [navigate, user.role]) // user.role 추가

    return <div>Hailor</div>
}

export default Main
