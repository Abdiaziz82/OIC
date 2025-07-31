import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/profilepic.jpg'; 
const Topbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message); 
        navigate('/login'); // redirect to login page
      } else {
        alert(result.error || 'Logout failed.');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Something went wrong while logging out.');
    }
  };

  return (
    <header className="bg-white shadow-sm z-40">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden text-gray-500 hover:text-gray-600"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-4 lg:mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="ml-4 flex-shrink-0 flex items-center gap-4">
            <img
              className="h-8 w-8 rounded-full"
              src={profilePic}
              alt="User profile"
            />
            {/* 🔘 Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
