import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addUser, fetchUsers } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from '../hook/use-thunk';
import UsersListItem from './UsersListItem';

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

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className='h-10 w-full' />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className='flex flex-row justify-between items-center rm-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUsersError && 'Error creating user...'}
      </div>
      {content}
    </div>
  );
};

export default UsersList;
