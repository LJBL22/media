import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

const useThunk = (thunk) => {
  // 以參數 thunk 帶入 fetchUsers/addUsers 即可一個 hook 完成兩件事
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);
  //useCallback 用途：當資料有更改，才會更新、回傳『函式』 => 適用於這個抓取資料的 thunk；節省性能
  // useMemo 是回傳『值』，兩者都是性能優化

  return [runThunk, isLoading, error]; // （1)傳遞出去
};

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers); //(2)自動對應
  const [doAddUser, isCreatingUser, creatingUsersError] = useThunk(addUser);
  const { data } = useSelector((state) => {
    return state.users;
  });

  // 精簡版
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doAddUser();
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className='h-10 w-full' />;
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => {
    // 先示意，之後會成為 component
    return (
      <div key={user.id} className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center cursor pointer'>
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        {isCreatingUser ? (
          <Button>Creating user...</Button>
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUsersError && 'Error creating user...'}
      </div>
      {renderedUsers}
    </div>
  );
};

export default UsersList;
