import { GoTrash } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

const AlbumsListItem = ({ album }) => {
  const header = (
    <>
      <Button className='mr-3'>
        <GoTrash />
      </Button>
      <div>{album.title}</div>
    </>
  );
  return (
    <ExpandablePanel header={header} key={album.id}>
      songs
    </ExpandablePanel>
  );
};

export default AlbumsListItem;
