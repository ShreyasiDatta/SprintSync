import { useState } from "react";

function ProjectQuery({ tasks }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = () => {
    if (!question.trim()) return;

    const done = tasks.filter((t) => t.status === "Done").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const todo = tasks.filter((t) => t.status === "Todo").length;

    const total = tasks.length || 1;
    const completion = Math.round((done / total) * 100);

    let risk = "on track";
    if (completion < 40) risk = "at risk";
    else if (completion < 70) risk = "needs attention";

    const response = `
Sprint is ${completion}% complete.
${done} task(s) completed, ${inProgress} in progress, ${todo} pending.
Overall status: ${risk}.
`;

    setAnswer(response);
    setQuestion("");
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">
        💬 Ask About This Project
      </h3>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="e.g. What is the real status of this sprint?"
          className="flex-1 border rounded px-3 py-2 text-sm"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleAsk}
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Ask
        </button>
      </div>

      {answer && (
        <div className="bg-gray-100 rounded p-3 text-sm text-gray-700 whitespace-pre-line">
          {answer}
        </div>
      )}
    </div>
  );
}

export default ProjectQuery;
