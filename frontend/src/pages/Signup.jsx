import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const roles = [
    { name: "Doctor", path: "/stepform" },
    { name: "Patient", path: "/stepformPatient" },
    { name: "Shopkeeper", path: "/stepformShopkeeper" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Create your account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Choose how you want to continue
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {roles.map((role) => (
            <div
              key={role.name}
              onClick={() => navigate(role.path)}
              className="cursor-pointer border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-primary">
                {role.name}
              </h2>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}