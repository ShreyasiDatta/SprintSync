function StandupCard({ summary }) {
  return (
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">🧠 AI Standup Summary</h3>

      <div className="mb-3">
        <p className="font-medium">Yesterday</p>
        <p className="text-sm text-gray-600">{summary.yesterday}</p>
      </div>

      <div className="mb-3">
        <p className="font-medium">Today</p>
        <p className="text-sm text-gray-600">{summary.today}</p>
      </div>

      <div>
        <p className="font-medium">Blockers</p>
        <p className="text-sm text-gray-600">{summary.blockers}</p>
      </div>
    </div>
  );
}

export default StandupCard;
