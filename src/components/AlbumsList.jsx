import { useFetchAlbumsQuery } from '../store';

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); // arg: user, specify the user
  console.log(data, error, isLoading);
  return <div>Albums For {user.name}</div>;
};

export default AlbumsList;
