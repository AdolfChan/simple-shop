"use client";
import { useState } from "react";
import ProfileChanger from "./profileChanger";
export type profileData = {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  comments:
    | {
        id: string;
        userId: string;
        date: Date;
        content: string;
        rating: number;
        wouldRecommend: boolean;
      }[]
    | undefined;
  description: string | null | undefined;
};
export default function ProfileClientWrapper({
  children,
  profileData,
}: {
  profileData: profileData;
  children: React.ReactNode;
}) {
  const [edit, setEdit] = useState(false);
  if (edit) {
    return (
      <>
        <ProfileChanger
          profileData={profileData}
          onCancel={() => {
            setEdit(false);
            try {
              // setTimeout(() => window.location.reload(), 500);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </>
    );
  }

  return (
    <>
      {children}
      <button
        className="px-6 py-2 rounded bg-[#6489da] text-white font-semibold hover:bg-[#4a6bb3] transition mb-2"
        onClick={() => setEdit(true)}
      >
        Change profile info
      </button>
    </>
  );
}
