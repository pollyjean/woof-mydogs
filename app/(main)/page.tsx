"use client";
import { API_URL } from "@/libs/constants";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface ApiAnswers {
  url?: string;
  isLiked?: boolean;
}

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR<ApiAnswers>(API_URL);
  const [video, setVideo] = useState<ApiAnswers>({
    url: undefined,
    isLiked: false,
  });
  const { url, isLiked } = video;
  const handleNewDog = () => {
    setVideo({ url: undefined, isLiked: false });
    mutate();
    setVideo((prev) => ({ ...prev, url: data?.url }));
  };
  const handleLike = () => {
    if (data) {
      setVideo((prev) => ({ ...prev, isLiked: !isLiked }));
      mutate({ url, isLiked });
    }
  };
  useEffect(() => {
    if (!isLoading) {
      setVideo({ url: data?.url, isLiked: data?.isLiked });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  if (error) return <main>{error}</main>;
  return (
    <main className="flex flex-col items-center">
      <section>
        <h1 className="text-gray-100 font-bold text-2xl mb-10">Woof.tv</h1>
        {isLoading ? null : (
          <div className="p-6 bg-slate-800 flex flex-col gap-2 items-stretch">
            <video
              src={url ? url : data?.url}
              controls
              autoPlay
              className="max-h-96  md:max-w-full w-11/12 m-auto"
            ></video>
            <div className="flex gap-2 items-stretch justify-center">
              <button
                className="w-80 p-3 text-sm font-semibold bg-gray-50 rounded-md border-2 border-slate-700 hover:border-slate-600 hover:bg-white md:w-5/6"
                onClick={handleNewDog}
              >
                New Dog!
              </button>
              <button
                className="w-80 p-3 text-sm font-semibold bg-blue-400 rounded-md border-2 border-slate-700 hover:border-slate-600 hover:bg-opacity-95 text-white md:w-5/6"
                onClick={handleLike}
              >
                {(isLiked ? isLiked : data?.isLiked) ? "Unlike" : "Like"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
