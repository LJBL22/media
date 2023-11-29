import { GoTrash } from 'react-icons/go';
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); // arg: user, specify the user
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} className='h-10 w-full' />;
  } else if (error) {
    content = `<div>Error:${error}</div>`;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel header={header} key={user.id}>
          list of photos in the album
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div>
        Albums For {user.name}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      {content}
    </div>
  );
};

export default AlbumsList;
