import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import React, { Dispatch } from "react";

export const MdEditor = ({
  content,
  setContent,
}: {
  content: string | undefined;
  setContent: Dispatch<string | undefined>;
}) => {
  return <MDEditor value={content} onChange={setContent} height={400} />;
};
