import { auth } from "../api/auth/auth";
import { cookies } from "next/headers";

export default async function DebugAuth() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const session = await auth();

  // Получаем все возможные варианты session token
  const sessionToken = cookieStore.get("next-auth.session-token");
  const secureSessionToken = cookieStore.get(
    "__Secure-next-auth.session-token"
  );
  const hostSessionToken = cookieStore.get("__Host-next-auth.session-token");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Auth Debug (No Middleware)</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Environment Variables
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>AUTH_SECRET exists:</strong>{" "}
                {process.env.NEXTAUTH_SECRET ? "Yes" : "No"}
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
                    <li key={index} className="text-sm">
                      <strong>{cookie.name}:</strong>{" "}
                      {cookie.value.substring(0, 100)}...
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No cookies found</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Session Token Cookies
            </h2>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>next-auth.session-token:</strong>{" "}
                {sessionToken ? "Exists" : "Not found"}
              </p>
              <p>
                <strong>__Secure-next-auth.session-token:</strong>{" "}
                {secureSessionToken ? "Exists" : "Not found"}
              </p>
              <p>
                <strong>__Host-next-auth.session-token:</strong>{" "}
                {hostSessionToken ? "Exists" : "Not found"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Session Info (auth())
            </h2>
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

          <div>
            <h2 className="text-lg font-semibold mb-2">Test Links</h2>
            <div className="bg-gray-50 p-4 rounded space-y-2">
              <a
                href="/profile"
                className="block text-blue-600 hover:text-blue-800 underline"
              >
                Try to access /profile (with middleware)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
