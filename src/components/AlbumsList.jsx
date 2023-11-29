import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); // arg: user, specify the user
  const [addAlbum, results] = useAddAlbumMutation();
  // console.log(results); // 檢查以取 isLoading 狀態
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
      // debugging by checking the react component of devtool
      return (
        <ExpandablePanel header={header} key={album.id}>
          list of photos in the album
        </ExpandablePanel>
      );
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
