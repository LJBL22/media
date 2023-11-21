import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

const UsersList = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsers()); //要包在 dispatch 裡面
  }, [dispatch]);

  const handleUserAdd = () => {
    //call dispatch & run thunk at the same time
    dispatch(addUser());
  };

  if (isLoading) {
    return <Skeleton times={6} className='h-10 w-full' />;
  }

  if (error) {
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
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
};

export default UsersList;
