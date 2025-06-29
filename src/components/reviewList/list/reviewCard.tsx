import { renderStars } from "../stars";
import Image from "next/image";

type ReviewType = {
  id: string;
  date: Date;
  content: string;
  rating: number;
  user: {
    name: string;
    image: string | null;
  };
};

export default function ReviewCard(props: ReviewType) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ">
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6489da] to-[#4f6db3] flex items-center justify-center text-white font-semibold text-lg">
          {props.user.image ? (
            <Image
              src={props.user.image}
              alt="Avatar"
              width={12}
              height={12}
              className="w-12 h-12 rounded-full object-cover shadow"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6489da] to-[#4f6db3] flex items-center justify-center text-white font-semibold text-lg">
              A
            </div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <h4 className="font-semibold text-gray-800">{props.user.name}</h4>
          <p className="text-gray-500 text-sm">
            {new Date(props.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="mb-4">{renderStars(props.rating)}</div>
      <p className="text-gray-600 leading-relaxed line-clamp-3">
        {props.content}
      </p>
    </div>
  );
}
