/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import {
  S3Client,
  ListObjectsCommand,
} from "https://deno.land/x/aws_sdk@v3.32.0-1/client-s3/mod.ts";
import Videos from "../islands/Videos.tsx";

export interface S3Object {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: string;
  Owner: Owner;
  url?: string;
  setVid?: () => void;
}

export interface Owner {
  DisplayName: string;
  ID: string;
}

export const handler: Handlers = {
  async GET(_, ctx) {
    await Promise.resolve();
    const { SECRET_ACCESS_KEY, ACCESS_KEY_ID } = config();
    if (!SECRET_ACCESS_KEY || !ACCESS_KEY_ID) return ctx.render(null);
    try {
      const s3 = new S3Client({
        region: "us-west-2",
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
      });

      const command = new ListObjectsCommand({
        Bucket: "fsf-pt-03-2022-recordings",
      });
      const items = await s3.send(command);
      return ctx.render({ items: items.Contents });
    } catch (err) {
      console.log(err);
      return ctx.render(null);
    }
  },
};
export default function Home(props: PageProps) {
  return (
    <div class={tw`bg-[#2a2640]`}>
      <div
        class={tw`font-extrabold text-transparent p-8 text-6xl text-center bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600`}
      >
        2022 UCI Bootcamp Class Recordings
      </div>
      <div class={tw`p-4 mx-auto max-w-screen-lg`}>
        <p class={tw`my-2 text-center text-white p-4 mx-auto text-2xl`}>
          Welcome back children!
        </p>
        <p class={tw`my-2 text-center text-white p-4 mx-auto text-sm`}>
          Here are the recordings from the 2022 UCI Bootcamp. Click on a video
          to watch and/or download
        </p>
        <Videos data={props.data.items} />
      </div>
      <a href="https://github.com/Chadtao206/fresh-deno-fun" class={tw`fixed bottom-4 left-4`} target="_blank">
        <button
          class={tw`p-1 rounded-2xl bg-white hover:bg-gray-300 shadow-lg`}
        >
          <svg
            stroke-width="0"
            viewBox="0 0 480 512"
            height="2.5em"
            width="2.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"></path>
          </svg>
        </button>
      </a>
    </div>
  );
}
