
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
| 스타일링 | Tailwind CSS v4 (`@theme`로 컬러·폰트·반응형 기준 설정), tailwind-merge |
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

- [x] 진행 중인 할 일(TO DO)과 완료된 할 일(DONE)을 나누어 조회
- [x] 로고 클릭 시 `/` 페이지로 이동
- [x] 입력창에 텍스트를 입력하고 추가하기 버튼 또는 엔터로 할 일 추가
- [x] 항목 왼쪽 체크 버튼으로 완료/진행 중 상태 전환
- [x] 항목의 글자 영역을 누르면 상세 페이지로 이동
- [x] 할 일이 없을 때 빈 화면(empty state) 표시

### 할 일 상세 페이지 (`/items/{itemId}`)

- [x] 할 일 이름 수정
- [x] 진행/완료 상태 수정
- [x] 메모 추가
- [x] 이미지 첨부 (최대 1개, 파일 이름은 영문, 5MB 이하)
- [x] 수정 완료 시 변경 사항 반영 후 목록 페이지로 이동
- [x] 삭제하기 버튼으로 삭제 후 목록 페이지로 이동

### 공통

- [x] 디자인 시안의 컬러 시스템 적용
- [x] 공용 컴포넌트 작성
- [x] 반응형 레이아웃 (모바일 / 태블릿 / 데스크탑)
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
├── app/
│   ├── layout.tsx            # 모든 페이지 공통 레이아웃 (헤더 포함)
│   ├── loading.tsx           # 데이터를 불러오는 동안 보여주는 화면
│   ├── globals.css           # 전역 스타일 (컬러, 폰트, 반응형 기준)
│   ├── page.tsx              # 할 일 목록 페이지 (/)
│   └── items/[itemId]/
│       └── page.tsx          # 할 일 상세 페이지 (/items/{itemId})
├── components/
│   ├── Header.tsx            # 상단 로고 헤더
│   ├── button.tsx            # 공용 버튼 (색상, 모양 옵션)
│   ├── search.tsx            # 공용 입력창
│   ├── check-list.tsx        # 할 일 한 줄 UI (체크 버튼 + 이름)
│   ├── todo-item.tsx         # 할 일 한 줄 (완료 토글, 상세 이동 연결)
│   ├── add-todo.tsx          # 할 일 추가 (입력창 + 추가하기 버튼)
│   └── item-detail.tsx       # 상세 화면 (이름·메모·이미지 수정, 삭제)
├── api/
│   ├── axiosInstance.ts      # axios 공통 설정 (baseURL, timeout)
│   └── api.ts                # API 요청 함수 모음
├── types/
│   └── todo.ts               # Todo 관련 타입 정의
├── public/                   # 정적 파일 (아이콘, 이미지)
└── .env                      # 환경변수 (공개 값만 포함)
```

## 구현하며 고민한 점

- **axios 인스턴스 사용**: API 주소와 tenantId를 `baseURL`에 한 번만 설정해서, 요청 함수에서는 `/items`처럼 경로만 쓰도록 했습니다.
- **환경변수**: API 주소와 tenantId는 비밀 정보가 아니라 `.env`에 두고 커밋했습니다.
- **서버 컴포넌트와 클라이언트 컴포넌트 분리**: 목록·상세 데이터는 서버 컴포넌트(`page.tsx`)에서 조회하고, 입력·클릭이 필요한 부분(`add-todo`, `todo-item`, `item-detail`)은 `"use client"` 컴포넌트로 분리했습니다.
- **엔터로 할 일 추가**: 입력창과 버튼을 `<form onSubmit>`으로 묶어서 엔터와 버튼 클릭을 같은 제출로 처리했습니다. `onKeyDown`으로 엔터를 감지하면 한글 입력 중 글자가 중복 입력될 수 있어서 폼 제출 방식을 선택했습니다.
- **데이터 갱신**: 할 일을 추가하거나 완료 상태를 바꾼 뒤에는 `router.refresh()`로 서버에서 목록을 다시 불러오고, 상세 페이지에서 수정·삭제한 뒤에는 `router.push("/")`로 목록 페이지로 이동합니다.
- **Cache Components 대응**: `next.config.ts`의 `cacheComponents` 설정 때문에 요청마다 달라지는 데이터를 미리 렌더링하지 않도록 `await connection()`을 사용하고, 로딩 중에는 `app/loading.tsx`가 보이도록 했습니다.
- **이미지 업로드 검증**: 파일을 서버로 보내기 전에 파일 이름(영문·숫자·`.`·`_`·`-`)과 크기(5MB 이하)를 클라이언트에서 먼저 검사합니다.
- **공용 컴포넌트와 스타일**: 버튼·입력창·체크 리스트를 공용 컴포넌트로 만들고, `tailwind-merge`로 클래스를 묶어 정리했습니다. 디자인 시안에 맞춰 `md` 분기점을 744px로 바꿨습니다.
