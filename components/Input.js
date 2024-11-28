export default function Input({ label, ...props }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                {...props}
            />
        </div>
    );
}
