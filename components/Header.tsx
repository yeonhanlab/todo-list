import Image from "next/image";

/** 공통 상단 바 : 로고를 누르면 "/"로 이동(새로고침)한다 */
export default function Header() {
    return (
        <header className="h-15 w-full border-b border-slate-200 bg-white">
            {/* 안쪽 내용: 최대 폭을 제한하고 가운데 정렬. 화면이 넓어질수록 좌우 여백이 늘어난다 */}
            <div className="flex mx-auto h-full max-w-[1200px] items-center px-4 md:px-6">
                {/* 과제 요구사항이 "새로고침"이라 Link 대신 a 태그를 사용 */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/">
                    {/* 모바일(기본): 심볼만. md 이상에서는 숨김 */}
                    <Image
                        src="/image/headerlogo-b.svg"
                        alt="do it 로고만"
                        width={71}
                        height={40}
                        className="md:hidden"
                    />
                    {/* 태블릿 이상: 심볼 + 글자. 모바일에서는 숨김 */}
                    <Image
                        src="/image/headerlogo-a.svg"
                        alt="do it 로고와 글자"
                        width={151}
                        height={40}
                        className="hidden md:block"
                    />
                </a>
            </div>
        </header>
    );
}
