import { ModelMessage } from "@/types/apiTypes";

type Props = {
  message: ModelMessage;
};

const Message = (p: Props) => {
  return (
    <div className="w-full flex flex-col">
      <div
        className={`${
          p.message.send_type === "user-to-operator" ? "self-start" : "self-end"
        } w-4/5 p-4 rounded-lg bg-slate-600/75`}
      >
        <p>{p.message.content}</p>

        <div className="flex flex-wrap my-4 gap-4">
          {p.message.medias.map((media) => {
            return (
              <img
                className="rounded-2xl max-h-48"
                src={media.url}
                alt="media"
              />
            );
          })}
        </div>

        <p className="text-xs text-slate-400 mt-2">{p.message.created_ago}</p>
      </div>
    </div>
  );
};

export default Message;
