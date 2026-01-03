import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/projects").then((res) => {
      setProjects(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

          {/* Loading state */}
          {loading && (
            <p className="text-sm text-gray-500">Loading projects...</p>
          )}

          {/* Empty state (Step 10.2) */}
          {!loading && projects.length === 0 && (
            <p className="text-sm text-gray-500">
              No projects found. Connect a repository to get started.
            </p>
          )}

          {/* Projects list */}
          {!loading &&
            projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
                className="cursor-pointer p-4 border rounded-lg hover:bg-gray-50 transition mb-3"
              >
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-500">
                  {project.activeTasks} tasks in progress
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
