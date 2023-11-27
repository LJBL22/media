import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunk) => {
  // 以參數 thunk 帶入 fetchUsers/addUsers 即可一個 hook 完成兩件事
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback((arg) => {
    setIsLoading(true);
    dispatch(thunk(arg)) // 這裡不加就會一直找 bug ＱＱ
      .unwrap()
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);
  //useCallback 用途：當資料有更改，才會更新、回傳『函式』 => 適用於這個抓取資料的 thunk；節省性能
  // useMemo 是回傳『值』，兩者都是性能優化

  return [runThunk, isLoading, error]; // （1)傳遞出去
};

export const jsonServerUrl = 'http://localhost:3000'
