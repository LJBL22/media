import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

const UsersList = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUsersError, setCreatingUsersError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  // 精簡版
  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap() // RTK 提供的函式，會解開 Promise
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(false)); // 無論成功失敗，必然會執行的放此
  }, [dispatch]);

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => setCreatingUsersError(err))
      .finally(() => setIsCreatingUser(false));
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
