import { 
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarIcon,
  DocumentCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const DashboardHome = () => {
  const [user, setUser] = useState("");
  
  const bootcampStats = [
    { 
      name: 'Active Learners', 
      value: '1,842', 
      change: '+14% from last term',
      icon: UserGroupIcon,
      color: 'text-indigo-600 bg-indigo-50'
    },
    { 
      name: 'Courses Running', 
      value: '28', 
      change: '3 new this month',
      icon: BookOpenIcon,
      color: 'text-emerald-600 bg-emerald-50'
    },
    { 
      name: 'Avg. Completion', 
      value: '87%', 
      change: '+5% improvement',
      icon: DocumentCheckIcon,
      color: 'text-amber-600 bg-amber-50'
    },
    { 
      name: 'Learning Hours', 
      value: '12,483', 
      change: 'Record high',
      icon: ClockIcon,
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Web Dev Bootcamp Orientation',
      date: 'May 15, 2023',
      time: '10:00 AM',
      instructor: 'Dr. Abdifatah Mohamed'
    },
    {
      id: 2,
      name: 'AI Workshop: TensorFlow',
      date: 'May 18, 2023',
      time: '2:00 PM',
      instructor: 'Prof. abdiaziz Haredh'
    },
    {
      id: 3,
      name: 'Career Prep Session',
      date: 'May 20, 2023',
      time: '11:00 AM',
      instructor: 'Mr. Mohamed Ali'
    }
  ];

  const recentAchievements = [
    {
      student: 'Khalid Ahmed',
      course: 'Advanced Python',
      achievement: 'Completed with distinction',
      date: '2 days ago'
    },
    {
      student: 'Abdiaziz ABdi',
      course: 'Data Science Fundamentals',
      achievement: 'Top of cohort',
      date: '3 days ago'
    },
    {
      student: 'Fatima Hassan',
      course: 'Cloud Architecture',
      achievement: 'Perfect project score',
      date: '5 days ago'
    }
  ];
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/get_current_user', {
          credentials: 'include' 
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Center Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back, <span className="font-medium text-blue-600">{user.fullname}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <CalendarIcon className="-ml-1 mr-2 h-5 w-5" />
            View Academic Calendar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {bootcampStats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-lg p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                  </dd>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <ArrowTrendingUpIcon className="-ml-0.5 mr-1 h-3 w-3" />
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 bg-white shadow rounded-xl border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
              Upcoming Events
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{event.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Instructor:</span> {event.instructor}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 text-center">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all events (12)
            </a>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white shadow rounded-xl border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <AcademicCapIcon className="h-5 w-5 text-gray-500 mr-2" />
              Student Highlights
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAchievements.map((item, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {item.student.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{item.student}</h3>
                    <p className="text-sm text-gray-500">{item.course}</p>
                    <p className="mt-1 text-sm font-medium text-blue-600">{item.achievement}</p>
                    <p className="mt-1 text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-white shadow rounded-xl border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <ChartBarIcon className="h-5 w-5 text-gray-500 mr-2" />
            Bootcamp Completion Progress
          </h2>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
            {/* Placeholder for chart - would be replaced with actual chart component */}
            <p className="text-gray-500">Learning progress visualization</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Beginner Track</p>
              <p className="text-2xl font-semibold text-gray-900">78%</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Intermediate</p>
              <p className="text-2xl font-semibold text-gray-900">65%</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Advanced</p>
              <p className="text-2xl font-semibold text-gray-900">42%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;