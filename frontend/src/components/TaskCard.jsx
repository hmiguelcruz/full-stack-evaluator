import { useState } from 'react';
import { TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from './ConfirmationModal';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <div className={`p-4 rounded-lg shadow-md transition-all ${task.isDone ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-blue-500'}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${task.isDone ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <span className="text-xs text-gray-400">ID: {task.id}</span>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onUpdate({ ...task, isDone: !task.isDone })}
              className={`p-2 rounded-full cursor-pointer transition-colors ${task.isDone ? 'text-green-600' : 'text-gray-400'}`}
              title="Toggle Status"
            >
             {task.isDone ? (
                <CheckCircleIcon className="w-6 h-6" />
             ) : (
                <div className="w-6 h-6 rounded-full border-2 border-current" />
             )}
            </button>

            <button
                onClick={() => setShowConfirmModal(true)}
                className="p-2 text-red-400 cursor-pointer rounded-full transition-colors"
                title="Delete"
            >
                <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => onDelete(task.id)}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
      />
    </>
  );
}
