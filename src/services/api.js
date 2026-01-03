// MOCK BACKEND (temporary)

const mockProjects = [
  {
    _id: "1",
    name: "AI Project Manager",
    activeTasks: 3,
  },
];

const mockTasks = {
  "1": [
    { _id: "101", title: "Setup GitHub OAuth", status: "Todo", assignee: "Dev A" },
    { _id: "102", title: "Webhook listener", status: "In Progress", assignee: "Dev B" },
    { _id: "103", title: "Commit-to-task mapping", status: "In Progress", assignee: "Dev C" },
    { _id: "104", title: "Sprint dashboard UI", status: "Done", assignee: "Dev A" },
  ],
};

setTimeout(() => {
  mockTasks["1"][1].status = "Done"; // webhook listener → Done
}, 8000);


const api = {
  get: (url) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (url === "/projects") {
          resolve({ data: mockProjects });
        }

        if (url.startsWith("/projects/")) {
          const projectId = url.split("/")[2];
          resolve({ data: mockTasks[projectId] || [] });
        }
      }, 500); // simulate network delay
    }),
};

export default api;
