import classNames from 'classnames';

const Skeleton = ({ times, className }) => {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5',
    className //to give a height & width
  );
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full', // 左至右 importance of '-' => 沒寫完全不會動
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );
  // 注意解構取 prop
  const renderBoxes = Array(times) //建構數量x的空陣列
    .fill(0) //填滿值 0
    .map((_, i) => {
      // _ 表不在乎其內容
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });
  return renderBoxes;
};

export default Skeleton;
