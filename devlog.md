## 2024.12.04
### 1.React프로젝트 github에 업로드
### 2.EC2인스턴스 생성하여 React프로젝트 배포
- EC2 인스턴스 생성
  - OS : Ubuntu 22.04
  - freetier기 때문에 t2.micro로 설정
  - SSH로 접속하기 위해 키페어 생성
  - 보안그룹생성

#### 인바운드 설정
- ssh 접속을 위한 22번 포트
- springboot 접속을 위한 8080번 포트
- http 접속을 위한 80번 포트
- https 접속을 위한 443번 포트

### 3. EC2에 SSH로 접속
- ssh키파일의 권한을 400으로 설정합니다.
```bash
chmod 400 sshKeyFile.pem
```
- EC2에 SSH로 접속한다.
```bash
ssh -i budgetBook.pem ubuntu@ip주소
```
- github 레포지토리에서 ReactProject를 clone한다.
```bash
git clone ~.git
```
- Node Package Manager를 설치한다.
```
sudo apt-get install npm
```
#### 패키지 설치중 에러발생
```bash
sudo apt install npm
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
E: Unable to locate package npm
```
#### 해결과정
```bash
# 우분투를 처음 설치했으니 apt 패키지를 업데이트했습니다.
ubuntu@ip-172-31-42-97:~$ sudo apt-get update

# 다시 npm install을 진행했으나 실패했습니다.
ubuntu@ip-172-31-42-97:~$ npm install
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /home/ubuntu/package.json
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, open '/home/ubuntu/package.json'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/ubuntu/.npm/_logs/2024-12-04T06_19_29_740Z-debug-0.log

#파일을 확인하고 프로젝트폴더 안에 package.json이 있으니 이동합니다.
ubuntu@ip-172-31-42-97:~$ ls
budgetBook  package-lock.json

ubuntu@ip-172-31-42-97:~$ cd budgetBook
ubuntu@ip-172-31-42-97:~/budgetBook$ npm install

#node의 현재 버전이 12이고 14이상을 요구합니다.
npm WARN EBADENGINE   required: { node: '^14 || >=16' },
npm WARN EBADENGINE   current: { node: 'v12.22.9', npm: '8.5.1' }
npm WARN EBADENGINE }
...

# node 삭제하기
ubuntu@ip-172-31-42-97:~$ sudo apt-get purge nodejs --auto-remove

# nvm 설치하기
ubuntu@ip-172-31-42-97:~$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# 설정파일 reload를 통해 cli에서 nvm 명령어 사용할 수 있게 설정합니다.
ubuntu@ip-172-31-42-97:~$ source ~/.bashrc

# nvm 버전을 확인합니다.
ubuntu@ip-172-31-42-97:~$ nvm -v
0.39.3

# nvm을 통해 node.js 설치합니다.
# 원하는 버전을 입력하면 해당 버전을 설치할 수 있습니다.
nvm install 20

# nvm 버전 확인 명령어를 통해 패키지 설치 완료 여부를 확인합니다.
nvm -v

# 여러버전이 설치되어있다면 사용할 node.js 버전을 선택합니다.
nvm use 18

# 프로젝트 경로로 이동하여 패키지 설치를 했습니다.
ubuntu@ip-172-31-42-97:~$ cd budgetBook/
ubuntu@ip-172-31-42-97:~/budgetBook$ npm install
```
### 4. 프로젝트 빌드하기
```bash
ubuntu@ip-172-31-42-97:~/budgetBook$ npm run build

The build folder is ready to be deployed.
You may serve it with a static server:

npm install -g serve
serve -s build

# serve 설치하기
ubuntu@ip-172-31-42-97:~/budgetBook$ npm install -g serve

# 빌드한 프로젝트 실행하기
ubuntu@ip-172-31-42-97:~/budgetBook$ serve -s build
```

### 5. 외부에서 접속하기
```bash
http://3.35.124.22:3000
```

#### 터미널을 종료하면 프로그램도 같이 종료가 되는 문제 발생
- Nohup을 사용하여 터미널을 종료하더라도 백그라운드에서 동작하도록 구성
- 리눅스 시스템에서 제공하는 기본 명령어하고 하여 설치를 안해도 된다고 합니다.
```bash
nohup serve -s build &
```
- 실행하고 터미널을 종료하고 외부에서 실행이 잘 되는것을 확인했습니다.

## 2024.12.05
- 집에 미니PC가 있어 AWS가 아닌 미니PC로 환경을 옮겨보고싶어졌습니다.
- 미니PC환경 : Window 10

### 1. React프로젝트 받아오기
- github에서 ReactProject를 다운받아왔습니다.
- serve 패키지를 이용하여 프로젝트를 빌드했습니다.

### 2. Nginx 설치하기
| **기능**               | **AWS CloudFront**                     | **Nginx**                                | **serve**                        |
|-----------------------|---------------------------------------|-----------------------------------------|---------------------------------------|
| **로드 밸런싱**        | ELB로 다중 인스턴스 처리 가능           | 자체 로드 밸런서 설정 가능                 | 지원 안 함                            |
| **캐싱**               | 글로벌 캐싱 제공                       | 로컬 캐싱 제공                            | 지원 안 함                            |
| **리버스 프록시**       | CloudFront가 제한적 제공                | 완벽히 지원                               | 지원 안 함                            |
| **설정 복잡도**         | 중간                                   | 중간-높음                                | 낮음                                  |
| **비용**               | 사용량에 따라 과금                     | 비용 효율적                               | 낮음                                  |

- serve와 Nginx의 차이점을 알아보고 Nginx를 써보기로 했습니다.
#### Nginx 설정하기
```bash
# Nginx 기본 사용자 설정 (Windows에서는 'nobody' 대신 기본값 사용)
#user  nobody;

# Nginx가 사용할 워커 프로세스의 수. 일반적으로 CPU 코어 수와 동일하게 설정.
worker_processes  1;

# 이벤트 모듈 설정
events {
    # 동시에 처리할 수 있는 최대 연결 수 설정 (클라이언트 수와 관계 있음)
    worker_connections  1024;
}

# HTTP 블록: HTTP 요청을 처리하는 설정
http {
    # MIME 타입 정의 파일 포함 (파일 확장자와 콘텐츠 타입을 매핑)
    include       mime.types;

    # 기본 MIME 타입 설정 (파일 확장자를 찾을 수 없을 때 사용)
    default_type  application/octet-stream;

    # 효율적인 파일 전송을 위해 sendfile 활성화
    sendfile        on;

    # 클라이언트 연결 유지 시간 설정 (초 단위, 65초로 설정)
    keepalive_timeout  65;

    # 서버 블록: 실제로 요청을 처리하는 가상 서버 설정
    server {
        # 서버가 수신할 포트를 지정 (80은 기본 HTTP 포트)
        listen       9090;

        # 서버 이름 설정 (요청 헤더의 Host 필드와 매칭)
        server_name  localhost;

        # location 블록: 특정 요청 경로를 처리하는 규칙 설정
        location / {
            # 정적 파일의 루트 디렉토리 경로 설정 (React 프로젝트의 빌드 폴더)
            root   C:/Users/leehj/Desktop/develop/budgetBook/build;

            # 기본 파일로 index.html 제공
            index  index.html;

            # SPA(Single Page Application) 처리를 위한 설정
            # 요청 경로($uri)가 존재하지 않으면 index.html로 처리
            try_files $uri /index.html;
        }

        # 에러 페이지 설정 (500번대 서버 에러 처리)
        error_page   500 502 503 504  /50x.html;

        # 에러 페이지 요청 처리
        location = /50x.html {
            # 에러 페이지의 루트 디렉토리 경로 설정
            root   C:/Users/leehj/Desktop/develop/budgetBook/build;
        }
    }
}
```

### 3. Nginx 실행하기
- 프롬프트에서 nginx폴더로 이동하여 실행하기
```
start nginx
```

### 4. 접속확인
- 로컬에서는 접속이 잘 되는것으로 확인했으나 공인 IP로 접근했을 때 접속이 안되는 현상을 확인했습니다.
- window 방화벽에 포트 인바운드 설정을 하고 실행했는데도 접속이 안됐습니다.

#### 문제해결
- 집으로 인터넷이 들어올 때 모뎀을 거치는데 모뎀쪽에 포트가 열려있지 않으면 접속이 안된다는걸 생각했습니다.
- 모뎀에 접속하여 포트를 열어줬더니 외부에서 접속 성공했습니다.

### 5. 도메인 연결
- 공인IP가 노출되는것이 마음에 안들어서 가비아에서 도메인을 구입한 후 DNS 설정으로 할당을 해줬습니다.
- 도메인을 통해 배포된 프로젝트에 접근할 수 있게 되었습니다.
```
http://hens-lab.shop:10001
```
- 하지만 여전히 도메인 뒤에 포트번호를 붙혀야 합니다.
- ISP에서 80번 포트에 대한 포트포워딩은 막아놓은 상태입니다.

### 6. HTTPS(433번 포트)로 전환
- 443번 포트는 대부분의 통신사에서 차단하지 않는다는걸 검색을 통해 알았습니다.
#### SSL 인증서 발급받기
- 


