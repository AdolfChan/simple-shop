import { getUser } from "../../../../lib/actions/review";
import LeaveReview from "./leaveReview";
import Image from "next/image";

export async function SetReview() {
  try {
    const user = await getUser();

    return (
      <div className="w-full flex justify-center py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-start">
          <div className="flex flex-row items-center w-full px-0 py-2">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ? user.name : "A"}
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-[#6489da] shadow"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#6489da] to-[#4f6db3] flex items-center justify-center text-white font-bold text-2xl shadow">
                {user.name ? user.name[0] : "A"}
              </div>
            )}
            <div className="flex flex-col justify-center ml-4">
              <span className="font-semibold text-gray-800 text-lg">
                {user.name}
              </span>
            </div>
          </div>
          <LeaveReview />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div></div>;
  }
}
