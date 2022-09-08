/** @jsx h */
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { S3Object } from "../routes/index.tsx";
import VideoCard from "../components/VideoCard.tsx";

const baseUrl = "https://fsf-pt-03-2022-recordings.s3.us-west-2.amazonaws.com/";

export default function Videos(props: { data: S3Object[] }) {
  const [vid, setVid] = useState<string | undefined>();
  return (
    <Fragment>
      {<video class={tw`w-full`} controls src={vid} />}
      <div class={tw`flex justify-evenly flex-wrap mx-auto`}>
        {props.data
          .map((a: S3Object) => ({
            ...a,
            setVid: () => {
              console.log("SETTING VID TO ", `${baseUrl}${a.Key}`);
              setVid(`${baseUrl}${a.Key}`);
            },
          }))
          .map(VideoCard)}
      </div>
      ;
    </Fragment>
  );
}
