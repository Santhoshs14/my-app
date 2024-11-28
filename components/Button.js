export default function Button({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
        >
            {label}
        </button>
    );
}
