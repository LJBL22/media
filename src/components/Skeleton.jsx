const Skeleton = ({ times }) => {
  // 注意解構取 prop
  const renderBoxes = Array(times) //建構數量x的空陣列
    .fill(0) //填滿值 0
    .map((_, i) => {
      // _ 表不在乎其內容
      return <div key={i} />;
    });
  return renderBoxes;
};

export default Skeleton;
