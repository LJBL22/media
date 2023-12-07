import { GoTrash } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useFetchPhotosQuery, useRemoveAlbumMutation } from '../store';
import Skeleton from './Skeleton';

const AlbumsListItem = ({ album }) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const handleRemoveAlbum = () => {
    removeAlbum(album); // pass arg
  };
  const header = (
    <>
      <Button
        onClick={handleRemoveAlbum}
        className='mr-3'
        loading={results.isLoading}
      >
        <GoTrash />
      </Button>
      <div>{album.title}</div>
    </>
  );

  const { isLoading, error, data } = useFetchPhotosQuery(album);
  let content;
  if (isLoading) {
    content = <Skeleton times={1} className='h-10 w-full' />;
  } else if (error) {
    content = `<div>Error:${error}</div>`;
  } else {
    content = data.map((photo) => {
      return <img src={photo.url} key={photo.id} />;
    });
  }
  return (
    <ExpandablePanel header={header} key={album.id}>
      {content}
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
