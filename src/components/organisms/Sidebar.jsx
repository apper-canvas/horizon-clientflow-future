import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "Home"
    },
    {
      name: "Clients",
      path: "/clients",
      icon: "Users"
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "Briefcase"
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: "CheckSquare"
    }
  ];

  const NavItem = ({ item, onClick = () => {} }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent transition-all duration-200 rounded-lg ${
          isActive ? "text-primary-600 bg-gradient-to-r from-primary-50 to-transparent border-r-2 border-primary-500" : ""
        }`
      }
    >
      <ApperIcon name={item.icon} className="h-5 w-5 mr-3" />
      <span className="font-medium">{item.name}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-card"
      >
        <ApperIcon name={isOpen ? "X" : "Menu"} className="h-6 w-6 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white shadow-card h-screen">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <ApperIcon name="Zap" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ClientFlow
                </h1>
                <p className="text-xs text-gray-500">Freelancer Tracker</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-primary p-2 rounded-full">
                  <ApperIcon name="Star" className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Premium Features</p>
                  <p className="text-xs text-gray-600">Upgrade for more tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed left-0 top-0 w-64 bg-white shadow-premium h-screen z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <ApperIcon name="Zap" className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    ClientFlow
                  </h1>
                  <p className="text-xs text-gray-500">Freelancer Tracker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavItem 
                  key={item.path} 
                  item={item} 
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-primary p-2 rounded-full">
                  <ApperIcon name="Star" className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Premium Features</p>
                  <p className="text-xs text-gray-600">Upgrade for more tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;