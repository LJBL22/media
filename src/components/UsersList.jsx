import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';
import Skeleton from './Skeleton';

const UsersList = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsers()); //要包在 dispatch 裡面
  }, [dispatch]);

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

  return <div>{renderedUsers}</div>;
};

export default UsersList;
