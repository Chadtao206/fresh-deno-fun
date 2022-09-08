/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Playa({ url }: { url: string }) {
  return (
    <embed
      src={
        url ||
        "https://zoom.us/rec/play/sMMzJWg7tchvv2eO6Cs__pAv6kKty3m7FiXum3YLMx9T0lZQTZYMOaN1GU1Sq2Kyl3s-n24gk4EUzDy0.OW8iOgiLT6iIdXVo?continueMode=true"
      }
      class={tw`w-full`}
    />
  );
}
