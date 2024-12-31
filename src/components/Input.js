import React from 'react';
import PropTypes from 'prop-types';

// Input 컴포넌트: HTML input 태그를 React로 래핑한 재사용 가능한 컴포넌트
const Input = ({ 
    className = '', // 기본값: 빈 문자열, 커스텀 CSS 클래스를 지정할 때 사용
    type = 'text',  // 기본값: 'text', input의 유형을 지정
    placeholder = '', // 기본값: 빈 문자열, input의 placeholder를 설정
    ...props // 추가 속성을 받을 수 있도록 스프레드 연산자 사용
}) => {
    return (
        <input
            // className에 기본 스타일 'custom-input'과 사용자 지정 클래스 추가
            className={`custom-input ${className}`}
            // type 속성에 전달된 값이나 기본값 'text' 설정
            type={type}
            // placeholder 속성에 전달된 값이나 기본값 빈 문자열 설정
            placeholder={placeholder}
            // 나머지 속성(value, onChange 등)은 props로 전달
            {...props}
        />
    );
};

// PropTypes를 통해 props의 데이터 타입을 정의
Input.propTypes = {
    className: PropTypes.string, // 문자열 타입, CSS 클래스 이름 지정
    type: PropTypes.string, // 문자열 타입, input 태그의 type 속성 (e.g., 'text', 'password')
    placeholder: PropTypes.string, // 문자열 타입, input 태그의 placeholder 속성
};

// Input 컴포넌트를 외부에서 사용할 수 있도록 export
export default Input;
