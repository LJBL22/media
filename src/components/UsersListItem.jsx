import { GoTrash } from 'react-icons/go';
import { useThunk } from '../hook/use-thunk';
import { removeUser } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);
  const handleUserRemove = () => {
    doRemoveUser(user);
  };
  const header = (
    <>
      <Button className='mr-3' loading={isLoading} onClick={handleUserRemove}>
        <GoTrash />
      </Button>
      {error && `<div>Error deleting user.${error.message}</div>`}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
