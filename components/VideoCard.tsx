/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "twind";
import { S3Object } from "../routes/index.tsx";

export default function VideoCard(data: S3Object) {
  //function that converts number of bytes to human readable format
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleClick = () => {
    const { setVid } = data;
    console.log(setVid);
    setVid && setVid();
  };

  return (
    <Fragment>
      <div
        class={tw`bg-[#734656] p-4 m-2 rounded-lg shadow cursor-pointer text-gray-300 text-center`}
      >
        <div class={tw`font-semibold`}>{data.Key}</div>
        <small>{formatBytes(data.Size)}</small>
        <div class={tw`flex mt-2 justify-evenly`}>
          <button onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              class={tw`w-8 h-8 shadow hover:text-[#2a2640] hover:scale-[1.1] text-[#734656] transition rounded-lg p-1 bg-[#f29544]`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
