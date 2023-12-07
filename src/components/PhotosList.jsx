import Button from './Button';
import { useFetchPhotosQuery } from '../store';
import Skeleton from './Skeleton';

const PhotosList = ({ album }) => {
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
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <p>Photos in {album.title}</p>
        <Button>+ Add Photo</Button>
      </div>
      <div className='m-2 flex flex-row items-center justify-between'>
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
