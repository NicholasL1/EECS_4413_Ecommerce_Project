export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen m-0 p-0">
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-custom-red font-signika-negative text-4xl mb-4">
          ❌ Access Denied ❌
        </h1>
        <p className="mb-2 text-custom-black">
          We're sorry, but you do not have the required permissions to access
          this page.
        </p>
        <p className="text-custom-black">
          Click{" "}
          <a className="text-blue-500 underline" href="/">
            here
          </a>{" "}
          to go back
        </p>
      </div>
    </div>
  );
}
