import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import '../css/Login.css';

const Login = () => {
    const navigate = useNavigate();

    const[user, setUser] = useState({
        id:'',
        password:'',
    })

    const [error, setError] = useState('')

    const handleLogin = () => {
        if(!user.id || !user.password){
            setError('아이디와 비밀번호를 입력해주세요')
            return;
        }
        navigate('/board/dash');
    };

    const handleSignup = () => {
        navigate('/auth/signup')
    }

    const handleChange = (e) => {
        const {id, value} = e.target;
        setUser((prev) => ({
            ...prev,
            [id]:value,
        }));
        setError('');
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>로그인</h2>
                <div className="login-form">
                    <label htmlFor="username">아이디</label>
                    <Input 
                        id="id" 
                        placeholder="아이디를 입력하세요"
                        value={user.id}
                        onChange={handleChange} />
                    
                    <label htmlFor="password">비밀번호</label>
                    <Input 
                        id="password" 
                        type="password" 
                        placeholder="비밀번호를 입력하세요" 
                        value={user.password}
                        onChange={handleChange}/>
                    
                    {error && (<p className="error-message">{error}</p>)}

                    <div className="button-container">
                        <Button value="로그인" onClick={handleLogin} />
                    </div>
                </div>
                <div className="extra-links">
                    <Button value="아이디 찾기" />
                    <Button value="비밀번호 찾기" />
                    <Button value="회원가입" onClick={handleSignup}/>
                </div>
            </div>
        </div>
    );
};

export default Login;
