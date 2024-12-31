import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { call } from '../api/apiService'
import Input from '../components/Input'
import Button from '../components/Button'
import '../css/Signup.css'

const Signup = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        password: '',
        name: '',
    });

    const handleCancel = () => {
        navigate('/auth/login')
    }

    const handleChange = (e) => {
        const { id, value } = e.target; // input의 id와 value를 추출
        setUser((prevUser) => ({
            ...prevUser, // 기존 값 유지
            [id]: value, // 변경된 필드 업데이트
        }));
    }

    const handleSignup = () => {
        call()
        navigate('/auth/login')
    }

    return(
        <div className='signup-container'>
            <div className='signup-box'>
                <h2>회원가입</h2>
                <div className='signup-form'>
                    <label htmlFor="username">아이디</label>
                    <div className='id-form'>
                        <Input 
                            id="id"
                            type="text"
                            placeholder="아이디를 입력하세요"
                            value={user.id}
                            onChange={handleChange} />
                        <Button value={"중복체크"} /> <br/>
                    </div>
                    <label htmlFor="password">비밀번호</label>
                    <Input 
                        id="password" 
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={user.password}
                        onChange={handleChange} />
                    <label htmlFor="name">이름(닉네임)</label>
                    <Input 
                        id="name" 
                        type="text" 
                        placeholder="이름을 입력하세요"
                        value={user.name}
                        onChange={handleChange} />
                    <Button value={"회원가입"} onClick={handleSignup}/>
                    <Button value={"취소"} onClick={handleCancel}/>
                </div>
            </div>
        </div>
    )
}

export default Signup;
