export default function Spinner() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center" >
        <div className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded-lg shadow-md border border-gray-300" >
          <p>Loading products...</p>
        </div>
      </div>
    </>
  );
}