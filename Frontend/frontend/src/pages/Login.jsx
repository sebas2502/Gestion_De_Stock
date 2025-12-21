import FormLogin from "../components/auth/FormLogin";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
     <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
      <FormLogin />
     </div>
    </div>
  );
}
