import Image from "next/image";
import { getUserProfileData } from "../../../lib/actions/userData";
import { ProfileReviewList } from "@/components/reviewList/profileReview/profileReview";
import ProfileClientWrapper from "@/components/profile/profileClientWrapper";

export default async function Profile() {
  const profileData = await getUserProfileData();
  const totalPages = profileData.comments ? profileData.comments.length : 0;
  return (
    <>
      <div className="max-w-2/3 mx-auto p-4 sm:p-8">
        <ProfileClientWrapper profileData={profileData}>
          <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm p-8 mb-8 gap-8">
            <div className="flex flex-col items-center bg-white rounded-xl  p-8 mb-8 w-1/2">
              <div className="w-32 h-32 mb-4 relative">
                {profileData.image ? (
                  <Image
                    src={profileData.image}
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
              </div>
              <h2 className="text-2xl font-bold mb-1 text-[#6489da]">
                {profileData.name}
              </h2>
              <p className="text-gray-600 mb-4">{profileData.email}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 w-1/2">
              <h3 className="text-lg font-semibold mb-2 text-[#6489da]">
                About me
              </h3>
              <p className="text-gray-700">
                {!profileData.description
                  ? "No description yet"
                  : profileData.description}
              </p>
            </div>
          </div>
        </ProfileClientWrapper>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2 text-[#6489da]">
            My reviews
          </h3>
          <div className="text-gray-700">
            {totalPages !== 0 ? (
              <ProfileReviewList totalPages={Math.ceil(totalPages / 6)} />
            ) : (
              "No Reviews yet"
            )}
          </div>
        </div>
      </div>
    </>
  );
}
