import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Main() {
    // TODO: add logic check user Info
    const navigation = useNavigate()
    useEffect(() => {
        navigation('/user')
    }, [])
    return <div>Hailor</div>
}

export default Main
