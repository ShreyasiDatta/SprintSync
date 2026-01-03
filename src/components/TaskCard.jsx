function TaskCard({ task }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border mb-3 hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-sm">{task.title}</h4>
      <p className="text-xs text-gray-500 mt-1">
        #{task._id} • {task.assignee}
      </p>
    </div>
  );
}

export default TaskCard;

