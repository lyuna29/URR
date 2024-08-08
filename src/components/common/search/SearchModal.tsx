"use client";

import { SearchProductTitleList } from "@/services/search/search.service";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../../../types/common";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import searchGray from "../../../../public/icon/search_gray.png";

type Keyword = {
  id: string;
  text: string;
};

export default function SearchModal({ closeModal }: { closeModal: () => void }) {
  const searchWordRef = useRef<HTMLInputElement>(null);
  const [filteringTitle, setFilteringTitle] = useState<Product[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  // 브라우저가 모두 렌더링된 상태에서 해당 함수를 실행할 수 있도록 작업
  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("keywords") || "[]";
      // setKeywords(JSON.parse(result));
      if (result) {
        setKeywords(JSON.parse(result));
      }
    }
  }, []);

  // keywords 객체에 의존하여, 변경될 경우 새롭게 localStorage의 아이템 keywords'를 세팅한다
  useEffect(() => {
    console.log("입력된 검색어:", keywords);
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  // 최근 검색어 추가
  const addKeywordHandler = (text: string) => {
    const newKeyword = {
      id: uuidv4(),
      text
    };
    setKeywords((prevKeywords) => {
      const updatedKeywords = [newKeyword, ...prevKeywords.filter((keyword) => keyword.text !== text)];
      localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      return updatedKeywords;
    });
  };

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
    localStorage.removeItem("keywords");
  };

  // 상픔 title을 기준으로 한 검색기능
  const SearchProducts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchWord = searchWordRef.current?.value;

    if (searchWord) {
      const { productTitle } = await SearchProductTitleList(searchWord);
      setFilteringTitle(productTitle);
      addKeywordHandler(searchWord);
      if (searchWordRef.current) {
        searchWordRef.current.value = "";
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <form onSubmit={SearchProducts} className="relative">
          <div className="h-12 font-semibold text-xl text-center">검색</div>
          <input
            type="text"
            ref={searchWordRef}
            placeholder="검색어를 입력하세요"
            className="w-[343px] h-[48px] border border-[#EAECEC] rounded-md indent-3 mb-2"
          />
          <button>
            <Image src={searchGray} alt="돋보기" width={28} height={28} className="absolute top-[57px] right-3" />
          </button>

          {filteringTitle.length > 0 ? (
            <ul className="h-[100px]">
              {filteringTitle.map((product) => (
                <li key={product.id}>
                  <Link href={`/products/detail/${product.id}`}>
                    <div className="text-[#0068E5]">
                      <div onClick={closeModal}>{product.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-[100px]"></div>
          )}
          <div>
            <div className="flex justify-between">
              <h2 className="text-xl">최근 검색어</h2>
              {keywords.length ? (
                <button type="button" onClick={handleClearKeywords} className="text-[#0068E5]">
                  모두 삭제
                </button>
              ) : (
                <button />
              )}
            </div>

            <ul className="flex flex-row">
              {keywords.length ? (
                keywords.map((keyword) => (
                  <li
                    key={keyword.id}
                    className="flex border border-[#1A82FF] text-[#0068E5] px-[6px] py-[3px] rounded-[14px] w-max mr-[16px]"
                  >
                    <p>{keyword.text}</p>
                  </li>
                ))
              ) : (
                <div className="h-[100px]"></div>
              )}
            </ul>
          </div>
        </form>
      </div>
    </>
  );
}
