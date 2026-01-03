import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-56 bg-gray-100 min-h-screen p-4">
      <h2 className="font-semibold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li
          className="cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>
        <li className="cursor-pointer hover:text-blue-600 transition-colors">
          Projects
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

