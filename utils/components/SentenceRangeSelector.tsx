// //utils/components/SentenceRangeSelector.tsx

"use client"

import { useRef } from "react";

interface Props {
    sentence: string;
    onSelect: (startIndex: number, endIndex: number, text: string) => void;
}

export function SentenceRangeSelector({ sentence, onSelect }: Props) {
    const ref = useRef<HTMLParagraphElement>(null);     // ref 가 가리키는 대상은 <p> 요소.

    function handleMouseUp() {
        // 사용자가 웹페이지에서 마우스로 텍스트를 드래그하면 그 선택 부분을 가져오는 윈도우 메서드
        // window 객체는 브라우저 Web API
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;  // 선택한 영역이 존재하는지 검사, isCollapsed : 선택영역의 시작점과 끝점이 같은지 검사 = 드래그 없이 커서만 있는 상태인지 검사

        const range = selection.getRangeAt(0);  // 선택한 영역의 범위를 가져오는 윈도우 메서드
        const container = ref.current;  //ref 변수에 담긴 요소 자체를 가져옴
        if (!container || !container.contains(range.commonAncestorContainer)) return;   // ref 변수에 담긴게 없으면 handleMouseUp 함수 종료 

        const preRange = document.createRange();    //Range 객체 만들기
        preRange.selectNodeContents(container);     //ref로 가져온 태그안의 content 모두 선택 
        preRange.setEnd(range.startContainer, range.startOffset);   //preRange의 끝점을 사용자가 선택한 텍스트의 시작점으로 변환
        const startIndex = preRange.toString().length;  //사용자가 지정한 범위의 시작 인덱스를 preRange 의 끝점으로 지정
        const endIndex = startIndex + range.toString().length;  //사용자가 지정한 범위의 끝 인덱스를 시작인덱스에 range의 길이를 더한 값으로 지정 

        onSelect(startIndex, endIndex, range.toString());   //onSelect 함수 실행
        selection.removeAllRanges();    //사용자가 드래그한 영역 초기화
    }

    return (
        <p
            ref={ref}
            onMouseUp={handleMouseUp}   //사용자가 마우스 버튼을 뗐을때 함수 실행
            className="select-text cursor-text p-2 border rounded leading-relaxed"
        >
            {sentence}
        </p>
    )
}