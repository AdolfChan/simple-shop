import { auth } from "../api/auth/auth";
import { cookies } from "next/headers";

export default async function TestAuth() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Auth Debug Info</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Environment Variables
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>AUTH_SECRET exists:</strong>{" "}
                {process.env.AUTH_SECRET ? "Yes" : "No"}
              </p>
              <p>
                <strong>NEXTAUTH_URL:</strong>{" "}
                {process.env.NEXTAUTH_URL || "Not set"}
              </p>
              <p>
                <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">All Cookies</h2>
            <div className="bg-gray-50 p-4 rounded">
              {allCookies.length > 0 ? (
                <ul className="space-y-1">
                  {allCookies.map((cookie, index) => (
                    <li key={index}>
                      <strong>{cookie.name}:</strong>{" "}
                      {cookie.value.substring(0, 50)}...
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No cookies found</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Session Info</h2>
            <div className="bg-gray-50 p-4 rounded">
              {session ? (
                <div>
                  <p>
                    <strong>Session exists:</strong> Yes
                  </p>
                  <p>
                    <strong>User ID:</strong> {session.user?.id || "Not set"}
                  </p>
                  <p>
                    <strong>Email:</strong> {session.user?.email || "Not set"}
                  </p>
                  <p>
                    <strong>Name:</strong> {session.user?.name || "Not set"}
                  </p>
                </div>
              ) : (
                <p>
                  <strong>Session exists:</strong> No
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
