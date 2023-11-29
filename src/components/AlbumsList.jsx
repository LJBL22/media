import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import AlbumsListItem from './AlbumsListItem';
import Button from './Button';
import Skeleton from './Skeleton';

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
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
      return <AlbumsListItem album={album} key={album.id} />;
    });
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg font-bold'>Albums For {user.name}</h3>
        <Button onClick={handleAddAlbum} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      {content}
    </div>
  );
};

export default AlbumsList;
