import { useFetchAlbumsQuery } from '../store';

const AlbumsList = ({ user }) => {
  // 直接命名並印出 result 以看出帶有多少資訊
  const result = useFetchAlbumsQuery(user); // arg: user, specify the user
  console.log(result);

  // const { data, error, isLoading } = useFetchAlbumsQuery(user); // arg: user, specify the user

  return <div>Albums For {user.name}</div>;
};

export default AlbumsList;
