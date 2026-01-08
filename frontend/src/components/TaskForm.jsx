import { useState } from 'react';

export default function TaskForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSubmit({ title });
    setTitle('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-100">
        <h3 className="text-lg font-bold mb-4 text-gray-800">✨ Add New Task</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setError('') }}
                    placeholder="What needs to be done?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
            </div>
            <div className="flex justify-end gap-3">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                    Add Task
                </button>
            </div>
        </form>
    </div>
  );
}
