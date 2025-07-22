import { useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case "/":
        return {
          title: "Dashboard",
          description: "Welcome to your ClientFlow workspace",
          icon: "Home"
        };
      case "/clients":
        return {
          title: "Clients",
          description: "Manage your client relationships",
          icon: "Users"
        };
      case "/projects":
        return {
          title: "Projects",
          description: "Track your active projects",
          icon: "Briefcase"
        };
      case "/tasks":
        return {
          title: "Tasks",
          description: "Manage your project tasks",
          icon: "CheckSquare"
        };
      default:
        return {
          title: "ClientFlow",
          description: "Freelancer Client Tracker",
          icon: "Zap"
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="bg-white shadow-card border-b border-gray-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <ApperIcon name={pageInfo.icon} className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{pageInfo.title}</h1>
              <p className="text-sm text-gray-600">{pageInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-3 py-2 rounded-lg">
              <p className="text-xs text-gray-600 font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric"
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;