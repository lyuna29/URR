"use client";

import { InfWaitList } from "@/hooks/useInfWaitList";
import { infUserApprove, updateUserApprove } from "@/services/users/users.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AdminPage() {
  const [restart, setRestart] = useState<boolean>(false);
  const { data: influencerApproveList, isSuccess } = useQuery({
    queryKey: ["infApprove", restart],
    queryFn: infUserApprove
  }); // 커스텀훅으로 만들기

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserApprove,
    onSuccess: () => {
      setRestart(!restart);
    }
  });

  const influencerApproveHandler = (userId: string) => {
    mutation.mutate(userId);
  };

  return (
    <>
      <div className="p-5 h-[700px] whitespace-nowrap">
        <h2 className="text-xl mb-2">관리자 페이지</h2>
        {isSuccess &&
          influencerApproveList?.map((inf: any, index: number) => {
            return (
              <div key={index} className="flex">
                <div>닉네임: {inf.nickname} / </div>
                <div>확인 링크: {inf.account_link}</div>
                <button onClick={() => influencerApproveHandler(inf.id)} className="bg-[#1A82FF] p-1 rounded-md ml-2">
                  승인
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
