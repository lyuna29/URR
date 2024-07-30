"use client";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="flex flex-row justify-between items-center h-12 w-[90%] mx-auto">
        <div>
          <h1>로고</h1>
        </div>
        <div className="flex gap-2">
          <Link href={"/search"}>검색</Link>
          <p>장바구니</p>
          <Link href={"/admin"}>
            <p>관리자</p>
          </Link>
        </div>
      </header>
      {/* <div className="bg-gray-300 flex-col h-[100px] w-full fixed">
        <div className="flex flex-col border border-red-500 w-[90%] mx-auto">
          <input type="text" className="border border-black rounded-md mx-auto h-8 w-[80%]" />
          <p>추천 인플루언서</p>
        </div>
      </div> */}
    </>
  );
};

export default Header;
