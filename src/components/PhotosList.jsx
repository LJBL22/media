import Button from './Button';
import { useAddPhotoMutation, useFetchPhotosQuery } from '../store';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

const PhotosList = ({ album }) => {
  const { isFetching, error, data } = useFetchPhotosQuery(album);

  // return elements when RUN hook "()"
  const [addPhoto, addPhotoResults] = useAddPhotoMutation(); // 找到 BUG! 少了執行 () => Uncaught TypeError: useAddPhotoMutation is not iterable at PhotosList...
  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton times={1} className='h-8 w-8' />;
  } else if (error) {
    content = `<div>Error:${error}</div>`;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem photo={photo} key={photo.id} />;
    });
  }

  return (
    <div>
      <div className='m-2 flex flex-row items-center justify-between'>
        <h3>Photos in {album.title}</h3>
        <Button onClick={handleAddPhoto} loading={addPhotoResults.isLoading}>
          + Add Photo
        </Button>
      </div>
      <div className='mx-8 flex flex-row flex-wrap justify-center'>
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
