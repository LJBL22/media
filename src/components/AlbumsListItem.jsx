import { GoTrash } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';

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

  return (
    <ExpandablePanel header={header} key={album.id}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
