import { Outlet } from 'react-router-dom'

function Payment() {
    return (
        <div>
            <div>결제 페이지</div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Payment
