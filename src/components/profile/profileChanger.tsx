"use client";
import Image from "next/image";
import { profileData } from "./profileClientWrapper";
import { useState, useRef } from "react";

export default function ProfileChanger({
  profileData,
  onCancel,
}: {
  profileData: profileData;
  onCancel: () => void;
}) {
  const [name, setName] = useState(profileData.name || "");
  const [email, setEmail] = useState(profileData.email || "");
  const [description, setDescription] = useState(profileData.description || "");
  const [avatar, setAvatar] = useState<string | null>(
    profileData.image || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const send = async () => {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: name,
          description: description,
          avatar: avatar,
        }),
      });
      if (!res.ok) {
        console.error("Ошибка сервера:", res.status);
        return;
      }
    };
    send();
    onCancel();
  };

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm p-8 mb-8 gap-8"
    >
      {/* Левая часть */}
      <div className="flex flex-col items-center sm:items-start w-1/2">
        <div className="w-32 h-32 mb-4 relative">
          {avatar ? (
            <Image
              src={avatar}
              alt="Avatar"
              fill
              className="rounded-full object-cover w-full h-full border-4 border-[#6489da] shadow"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#6489da] flex items-center justify-center border-4 border-[#6489da] shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        </div>
        <button
          type="button"
          className="mt-2 px-4 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
          onClick={() => fileInputRef.current?.click()}
        >
          Change photo
        </button>
        <label className="w-full mb-2">
          <span className="block text-gray-700 mb-1">Username</span>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="w-full mb-2">
          <span className="block text-gray-700 mb-1">Email</span>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      {/* Правая часть */}
      <div className="flex-1 flex flex-col justify-center w-1/2">
        <label className="w-full mb-2">
          <span className="block text-gray-700 mb-1">About me</span>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px] resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 rounded bg-[#6489da] text-white font-semibold hover:bg-[#4a6bb3] transition"
          >
            Сохранить
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Отмена
          </button>
        </div>
      </div>
    </form>
  );
}
