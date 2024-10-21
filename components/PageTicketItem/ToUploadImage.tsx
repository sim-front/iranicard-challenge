type Props = {
  url: string;
  index: number;
  onPop: (index: number) => void;
};

const ToUploadImage = (p: Props) => {
  return (
    <div className="h-20 bg-red-800 rounded-xl">
      <img
        onClick={() => p.onPop(p.index)}
        src={p.url}
        alt=""
        className="rounded-xl h-full hover:opacity-75 cursor-pointer"
      />
    </div>
  );
};

export default ToUploadImage;
