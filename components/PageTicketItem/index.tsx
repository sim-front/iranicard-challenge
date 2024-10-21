import {
  apiAnswerTicket,
  apiAnswerTicketKey,
  apiMedia,
  apiMediaKey,
  apiTicketX,
  apiTicketXKey,
} from "@/helpers/apiRoutes";
import { ModelTicket } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Button from "../_shared/Button";
import { getTicketStatus } from "@/helpers/ticketTools";
import { IoSend } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import { HEADER_HEIGHT } from "../Header";
import Message from "./Message";
import ToUploadImage from "./ToUploadImage";

type Props = {};

const PageTicketItem = (p: Props) => {
  const router = useRouter();
  const { ticketId } = router.query;

  const [valContent, setValContent] = useState("");
  const [valImage, setValImage] = useState<File[]>([]);
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string[]>([]);

  const refUploadedImageId = useRef<string[]>([]);
  const elInputImage = useRef<HTMLInputElement>(null);

  const {
    data: dataTicket,
    error: errorTicket,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: [apiTicketXKey],
    queryFn: () => apiTicketX(ticketId as string),
    enabled: false,
  });

  const {
    error: errorAnswer, // TODO handle errors
    refetch: refetchAnswer,
  } = useQuery({
    queryKey: [apiAnswerTicketKey],
    queryFn: () =>
      apiAnswerTicket(
        ticketId as string,
        valContent,
        refUploadedImageId.current
      ),
    enabled: false,
  });

  const { refetch: refetchNewMedia } = useQuery({
    queryKey: [apiMediaKey],
    queryFn: () => apiMedia(valImage),
    enabled: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!valContent) return; // TODO show visual indication

    if (valImage.length)
      refetchNewMedia().then((res) => {
        refUploadedImageId.current = res.data?.data?.data?.map(
          (i: any) => i._id
        );
        sendMessage();
      });
    else sendMessage();
  };

  const sendMessage = () => {
    refetchAnswer().then(() => {
      setValContent("");
      setImgPreviewUrl([]);
      setValImage([]);
      refUploadedImageId.current = [];

      refetchTicket();
    });
  };

  const pushImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    files.map((file) => {
      {
        setValImage((prev) => [...prev, file]);
        setImgPreviewUrl((prev) => [...prev, URL.createObjectURL(file)]);
      }
    });
  };

  const removeImage = (index: number) => {
    setValImage((prev) => prev.filter((_, i) => i !== index));
    setImgPreviewUrl((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (ticketId) refetchTicket();
  }, [ticketId]);

  return (
    <div
      className={`w-full flex flex-col max-w-[1000px] mx-auto
                items-center justify-center px-4`}
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
    >
      {!dataTicket && !errorTicket ? (
        // * Loading

        <p className="text-xl text-center">در حال دریافت...</p>
      ) : dataTicket ? (
        // * Success

        <div className="w-full h-full flex flex-col items-center">
          {
            // * Top info
          }
          <div className="w-full p-4">
            <p className="text-sm opacity-80 mb-2">{dataTicket.department}</p>
            <p className="text-2xl">
              <span className="text-sm opacity-70">عنوان: </span>
              {dataTicket.subject}
            </p>
            <p>
              <span className="text-sm opacity-70">وضعیت: </span>
              {getTicketStatus(dataTicket.status)}
            </p>
          </div>

          {
            // * Messages
          }
          <div
            className="w-full p-4 flex flex-col gap-4 border border-solid border-slate-900 
                        rounded-2xl bg-slate-800/50 flex-1 overflow-y-auto"
          >
            {dataTicket.messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>

          {
            // * Prompt bar
          }
          <div className=" w-full mt-4 mb-2 flex">
            <div className="p-3 flex flex-col items-center">
              <IoSend
                onClick={handleSubmit}
                className="text-3xl cursor-pointer"
              />
              <BiImageAdd
                onClick={() => elInputImage.current?.click()}
                className="text-3xl mt-4 cursor-pointer"
              />
              <input
                ref={elInputImage}
                type="file"
                accept="image/*"
                multiple
                onChange={pushImages}
                className="hidden"
              />
            </div>

            <textarea
              className="flex-1 p-4 border border-solid border-slate-900 
                        rounded-2xl bg-slate-800 max-h-60 min-h-20"
              placeholder="پیام خود را اینجا بنویسید..."
              value={valContent}
              onChange={(e) => setValContent(e.target.value)}
            />
          </div>

          {
            // * Images
          }
          <div className="w-full gap-4 flex ">
            {imgPreviewUrl.map((url, index) => (
              <ToUploadImage url={url} index={index} onPop={removeImage} />
            ))}
          </div>
        </div>
      ) : (
        // * Error

        <div className="flex flex-col items-center ">
          <p className="text-xl text-center">خطایی رخ داده است</p>
          <Button onClick={() => refetchTicket()}>تلاش دوباره</Button>
        </div>
      )}
    </div>
  );
};

export default PageTicketItem;
