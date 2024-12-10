import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
       //onLogin(); //로그인 상태 업데이트
        navigate('/board'); //대시보드로 이동
    }

    return(
        <div>
            <div className='login-form'>
                <div>
                    아이디 : <Input /><br/>
                    비밀번호 : <Input />
                </div>
                <div>
                    <Button value={"로그인"} onClick={handleLogin}/>
                </div>
            </div>
            <Button value={"아이디 찾기"}/><br/>
            <Button value={"비밀번호 찾기"}/><br/>
            <Button value={"회원가입"}/>
        </div>
    )
}

export default Login;