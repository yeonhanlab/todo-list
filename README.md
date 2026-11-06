
Readme · MD
# Todo List

할 일 목록을 관리하는 To Do 서비스입니다. 프론트엔드 단기심화 과정 지원자 과제로 제작했습니다.

- 배포 링크: (배포 후 추가)
- 저장소: https://github.com/yeonhanlab/todo-list.git

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| HTTP 통신 | axios (인스턴스로 공통 설정 관리) |
| 패키지 매니저 | pnpm |
| 코드 포맷터 | Prettier |
| 배포 | Vercel |

## 실행 방법

### 1. 설치

```bash
pnpm install
```

### 2. 환경변수

프로젝트 루트의 `.env` 파일에 아래 두 값이 들어 있습니다.

```
NEXT_PUBLIC_API_URL=https://assignment-todolist-api.vercel.app/api
NEXT_PUBLIC_TENANT_ID=본인의 tenantId
```

> `.env`에는 공개 API 주소와 테스트용 tenantId만 있으며, 비밀 정보는 포함되어 있지 않습니다.

### 3. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

### 4. 빌드 및 실행

```bash
pnpm build
pnpm start
```

## 주요 기능

### 할 일 목록 페이지 (`/`)

- [ ] 진행 중인 할 일(TO DO)과 완료된 할 일(DONE)을 나누어 조회
- [ ] 로고 클릭 시 `/` 페이지로 이동
- [ ] 입력창에 텍스트를 입력하고 추가하기 버튼 또는 엔터로 할 일 추가
- [ ] 항목 왼쪽 체크 버튼으로 완료/진행 중 상태 전환
- [ ] 할 일이 없을 때 빈 화면(empty state) 표시

### 할 일 상세 페이지 (`/items/{itemId}`)

- [ ] 할 일 이름 수정
- [ ] 진행/완료 상태 수정
- [ ] 메모 추가
- [ ] 이미지 첨부 (최대 1개, 파일 이름은 영문, 5MB 이하)
- [ ] 수정 완료 시 변경 사항 반영 후 목록 페이지로 이동
- [ ] 삭제하기 버튼으로 삭제 후 목록 페이지로 이동
### 공통

- [ ] 디자인 시안의 컬러 시스템 적용
- [ ] 공용 컴포넌트 작성
- [ ] 반응형 레이아웃 (모바일 / 태블릿 / 데스크탑)
## 사용한 API

기본 주소: `https://assignment-todolist-api.vercel.app/api/{tenantId}`

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| GET | `/items` | 할 일 목록 조회 |
| POST | `/items` | 할 일 추가 |
| GET | `/items/{itemId}` | 할 일 상세 조회 |
| PATCH | `/items/{itemId}` | 할 일 수정 |
| DELETE | `/items/{itemId}` | 할 일 삭제 |
| POST | `/images/upload` | 이미지 업로드 |

## 폴더 구조

```
.
├── app/              # 페이지와 레이아웃 (App Router)
├── api/
│   ├── axiosInstance.ts   # axios 공통 설정 (baseURL, timeout)
│   └── api.ts             # API 요청 함수 모음
├── types/
│   └── todo.ts       # Todo 관련 타입 정의
├── public/           # 정적 파일
└── .env              # 환경변수 (공개 값만 포함)
```

> 컴포넌트를 추가하면 `components/` 폴더 구조도 함께 정리합니다.

## 구현하며 고민한 점

- **axios 인스턴스 사용**: API 주소와 tenantId를 `baseURL`에 한 번만 설정해서, 요청 함수에서는 `/items`처럼 경로만 쓰도록 했습니다.
- **환경변수**: API 주소와 tenantId는 비밀 정보가 아니라 `.env`에 두고 커밋했습니다.
