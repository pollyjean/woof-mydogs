import { useState } from "react";

interface UseMutationState<T> {
  isLoading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });
  function mutate(data: T) {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => {
        setState((prev) => ({ ...prev, data: json }));
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, error }));
      })
      .finally(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
      });
  }
  return [mutate, { ...state }];
}
