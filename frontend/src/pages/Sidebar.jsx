import { Link, NavLink } from 'react-router-dom';
import profilePic from '../assets/profilepic.jpg'; 
import { 
  AcademicCapIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClipboardDocumentIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ setSidebarOpen }) => {
  const navLinks = [
    { name: 'Learning Hub', to: '/dashboard', icon: AcademicCapIcon, badge: null },
    { name: 'Courses', to: '/dashboard/courses', icon: BookOpenIcon, badge: 'New' },
    { name: 'Students', to: '/dashboard/students', icon: UserGroupIcon, badge: null },
    { name: 'Assignments', to: '/dashboard/assignments', icon: ClipboardDocumentIcon, badge: '3' },
    { name: 'Analytics', to: '/dashboard/analytics', icon: ChartBarIcon, badge: null },
    { name: 'Schedule', to: '/dashboard/schedule', icon: CalendarDaysIcon, badge: null },
    { name: 'Community', to: '/dashboard/community', icon: ChatBubbleLeftRightIcon, badge: null },
  ];
  

  return (
    <div className="h-full flex flex-col bg-blue-950">
      {/* Logo Section */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-blue-800/50">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <AcademicCapIcon className="h-5 w-5 text-indigo-900" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Oasis<span className="font-light">Innovation</span>
          </span>
        </Link>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-blue-200 hover:text-white"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) => {
                const activeClass = isActive 
                  ? 'bg-white/10 text-white shadow-md' 
                  : 'text-blue-100 hover:bg-white/5 hover:text-white';
                
                return `group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeClass}`;
              }}
              onClick={() => setSidebarOpen(false)}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center">
                    <item.icon
                      className={`flex-shrink-0 h-5 w-5 mr-3 ${
                        isActive ? 'text-white' : 'text-blue-300 group-hover:text-blue-200'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isActive 
                        ? 'bg-white text-blue-800' 
                        : 'bg-blue-800/50 text-blue-100'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Profile & Settings */}
      <div className="p-4 border-t border-blue-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <img
                className="h-10 w-10 rounded-full border-2 border-white/20"
                src={profilePic}
                alt="Professor profile"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-blue-900" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Abdiaziz Haredh</p>
              <p className="text-xs font-medium text-blue-200">Technical Mentor OIC</p>
            </div>
          </div>
          <button className="text-blue-200 hover:text-white">
            <Cog6ToothIcon className="h-5 w-5" />
          </button>
        </div>
        <button className="mt-4 w-full flex items-center justify-center space-x-2 text-sm text-blue-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;