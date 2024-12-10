import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

const Signup = () => {
    return(
        <div>
            아이디 : <Input />
            <Button value={"중복체크"} /> <br/>
            비밀번호 : <Input /> <br/>
            이름 :  <Input /> <br/>
            <Button value={"회원가입"} />
            <Button value={"취소"} />
        </div>
    )
}

export default Signup;
