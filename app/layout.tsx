import "./globals.css";
import React from "react";
import Header from "@/components/Header";

// 모든 페이지에 공통으로 적용되는 틀 : 위에 헤더, 아래에 주소에 맞는 페이지(children)가 들어간다
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
