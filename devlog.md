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
