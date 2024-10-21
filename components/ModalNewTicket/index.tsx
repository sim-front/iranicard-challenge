import {
  apiMedia,
  apiMediaKey,
  apiNewTicket,
  apiNewTicketKey,
} from "@/helpers/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../_shared/Button";
import { useAppContext } from "@/helpers/_AppContext";
import { fileURLToPath } from "url";

type Props = {
  pop: () => void;
};

const ModelNewTicket = (p: Props) => {
  const { refetchTicket } = useAppContext();

  const [valSubject, setValSubject] = useState("");
  const [valContent, setValContent] = useState("");
  const [valImage, setValImage] = useState<File | undefined>(undefined);
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string | undefined>();

  const refImageId = useRef<string | undefined>();
  const elInputImage = useRef<HTMLInputElement>(null);

  const { refetch: refetchNewTicket, isLoading: isNewTicketLoading } = useQuery(
    {
      queryKey: [apiNewTicketKey],
      queryFn: () => apiNewTicket(valSubject, valContent, refImageId.current),
      enabled: false,
    }
  );

  const { refetch: refetchNewMedia, isLoading: isNewMediaLoading } = useQuery({
    queryKey: [apiMediaKey],
    queryFn: () => apiMedia([valImage as File]),
    enabled: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (valImage) {
        await refetchNewMedia().then((res: any) => {
          console.log(11111, res.data?.data?.data);
          refImageId.current = res.data?.data?.data?.[0]?._id;
        });

        await refetchNewTicket().then(() => {
          refetchTicket();
          p.pop();
        });
      }
    } catch (e: any) {
      console.error(e);

      // TODO improve error handling
    }
  };

  useEffect(() => {
    if (valImage) {
      setImgPreviewUrl(URL.createObjectURL(valImage));
    }
  }, [valImage]);

  return (
    <div
      className={`fixed inset-0 bg-slate-800/50 flex items-center justify-end
                    pointer-events-all`}
    >
      <div className="w-full max-w-sm mx-auto bg-slate-800 rounded-xl p-4 border border-solid border-slate-700">
        <form onSubmit={handleSubmit}>
          <p className={`text-2xl mb-12 text-center`}>تیکت جدید</p>

          <input
            ref={elInputImage}
            className="mb-4 hidden"
            accept="image/*"
            type="file"
            onChange={(e) => setValImage(e.target.files?.[0])}
          />

          <div
            onClick={() => elInputImage.current?.click()}
            className={`w-full h-40 mb-8 p-2 rounded bg-slate-700 flex overflow-hidden 
                items-center justify-center pointer cursor-pointer hover:bg-slate-600 
                transition ease duration-200`}
          >
            <p className="flex-1 text-center">
              برای
              {imgPreviewUrl ? " تغییر " : " انتخاب تصویر "}
              کلیک کنید
            </p>
            <img
              className={`h-full aspect-square bg-slate-900 rounded-xl overflow-hidden ${
                !imgPreviewUrl && "hidden"
              }`}
              src={imgPreviewUrl}
            />
          </div>

          <p className="w-full mb-2">موضوع</p>
          <input
            className="w-full h-10 rounded bg-slate-800 px-2 border border-slate-600"
            placeholder="موضوع را وارد کنید"
            value={valSubject}
            onChange={(e) => setValSubject(e.target.value)}
          />

          <p className="w-full mb-2 mt-4">متن</p>
          <textarea
            className="w-full h-20 rounded bg-slate-800 px-2 border border-slate-600"
            placeholder="متن را وارد کنید"
            value={valContent}
            onChange={(e) => setValContent(e.target.value)}
          />

          <div className="flex w-full">
            <Button
              className="flex-1 me-2"
              onClick={() => {
                refetchNewTicket();
              }}
              disabled={isNewTicketLoading || isNewMediaLoading}
            >
              {isNewTicketLoading || isNewMediaLoading ? "🤚" : " ثبت"}
            </Button>
            <Button
              className="min-w-20"
              onClick={() => {
                p.pop();
              }}
              disabled={isNewTicketLoading || isNewMediaLoading}
            >
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelNewTicket;
