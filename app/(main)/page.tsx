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
    <main>
      <h1>Woof.tv</h1>
      {isLoading ? null : (
        <div>
          <video src={url ? url : data?.url}></video>
          <div>
            <button onClick={handleNewDog}>New Dog!</button>
            <button onClick={handleLike}>
              {(isLiked ? isLiked : data?.isLiked) ? "Unlike" : "Like"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
