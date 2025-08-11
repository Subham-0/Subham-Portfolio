import { Input, message } from 'antd'
import React from 'react'
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { useDispatch } from 'react-redux';
import loginInstance from '../../util/loginInstance';


function Login() {
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    })



    const dispatch = useDispatch();

    const login_fun = async () => {
        try {
            dispatch(ShowLoading())
            
            const response = await loginInstance.post("/api/portfolio/admin-login", user)
            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message)
                localStorage.setItem('token', JSON.stringify(response.data))
                window.location.href = '/admin'
            }
            else {
                message.error(response.data.message)
            }
        } catch (error) {

            message.error(error.message)
            dispatch(HideLoading())
        }
    }
    return (
        <div className='flex justify-center items-center h-screen  bg-primary'>
            <div className=' flex flex-col w-96 gap-4 p-6 m-2 border-white shadow-2xl border rounded-lg text-white'>
                <h1 className='text-xl'>Protfolio - Admin Login</h1>
                <hr></hr>
                <Input type="text"
                    placeholder='Username'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}

                />

                <Input type="password"
                    placeholder='Password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}

                />
                <button className='bg-secondary border-white  border rounded-lg p-2' onClick={login_fun}>Login</button>
            </div>
        </div>
    )
}

export default Login