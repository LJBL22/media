import { useFetchAlbumsQuery } from '../store';
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';

const AlbumsList = ({ user }) => {
  // 直接命名並印出 result 以看出帶有多少資訊
  // const result = useFetchAlbumsQuery(user); // arg: user, specify the user
  // console.log(result);

  const { data, error, isLoading } = useFetchAlbumsQuery(user); // arg: user, specify the user

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
      <div>Albums For {user.name}</div>
      {content}
    </div>
  );
};

export default AlbumsList;
