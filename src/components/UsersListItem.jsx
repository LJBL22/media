import { GoTrash } from 'react-icons/go';
import { useThunk } from '../hook/use-thunk';
import { removeUser } from '../store';
import Button from './Button';

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);
  const handleUserRemove = () => {
    doRemoveUser(user);
  };
  return (
    <div className='mb-2 border rounded'>
      <div className='flex p-2 justify-between items-center cursor pointer'>
        <Button loading={isLoading} onClick={handleUserRemove}>
          <GoTrash />
        </Button>
        {error && `<div>Error deleting user.${error.message}</div>`}
        {user.name}
      </div>
    </div>
  );
};

export default UsersListItem;
