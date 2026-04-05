export default function DeleteModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="card w-full max-w-sm text-center">

        <h2 className="text-lg font-semibold mb-3">
          Are you sure?
        </h2>

        <p className="text-gray-500 mb-4">
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="btn bg-red-500 w-full"
          >
            Delete
          </button>

          <button
            onClick={onCancel}
            className="btn bg-gray-400 w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}