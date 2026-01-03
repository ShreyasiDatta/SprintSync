import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import StandupCard from "../components/StandupCard";
import SprintCharts from "../components/SprintCharts";
import ProjectQuery from "../components/ProjectQuery";
import LoadingSkeleton from "../components/LoadingSkeleton";
import api from "../services/api";

const columns = ["Todo", "In Progress", "Done"];

function Project() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchTasks = () => {
      api.get(`/projects/${id}/tasks`).then((res) => {
        setTasks(res.data);
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
      });
    };

    // Initial fetch
    fetchTasks();

    // Poll every 5 seconds
    const interval = setInterval(fetchTasks, 5000);

    // Cleanup on unmount / project change
    return () => clearInterval(interval);
  }, [id]);

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  // 🧠 AI Standup Summary Logic
  const generateStandupSummary = () => {
    const done = tasks.filter((t) => t.status === "Done");
    const inProgress = tasks.filter((t) => t.status === "In Progress");
    const todo = tasks.filter((t) => t.status === "Todo");

    return {
      yesterday:
        done.length > 0
          ? `${done.length} task(s) completed: ${done
              .map((t) => t.title)
              .join(", ")}`
          : "No tasks completed yesterday.",

      today:
        inProgress.length > 0
          ? `${inProgress.length} task(s) in progress: ${inProgress
              .map((t) => t.title)
              .join(", ")}`
          : "No tasks currently in progress.",

      blockers:
        todo.length > 0
          ? `${todo.length} task(s) not started yet.`
          : "No blockers 🎉",
    };
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-2">Project #{id}</h2>

          {lastUpdated && (
            <p className="text-xs text-gray-500 mb-4">
              Last updated: {lastUpdated}
            </p>
          )}

          {/* Loading Skeleton */}
          {loading && <LoadingSkeleton />}

          {!loading && tasks.length > 0 && (
            <>
              {/* 🧠 AI Standup Summary */}
              <StandupCard summary={generateStandupSummary()} />

              {/* 📊 Sprint Charts & Risk Indicator */}
              <SprintCharts tasks={tasks} />

              {/* 💬 Natural Language Project Query */}
              <ProjectQuery tasks={tasks} />

              {/* 🗂️ Sprint Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {columns.map((status) => {
                  const filteredTasks = getTasksByStatus(status);

                  return (
                    <div key={status} className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold mb-4">{status}</h3>

                      {filteredTasks.length === 0 && (
                        <p className="text-sm text-gray-400">No tasks</p>
                      )}

                      {filteredTasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;




