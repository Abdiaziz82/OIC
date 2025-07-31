import { Routes,Route } from 'react-router-dom'
import SignupForm from './components/SignupForm'
import LoginForm from './pages/LoginForm'
import DashboardHome from './pages/DashboardHome'
import DashboardLayout from './pages/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Students from './pages/Students'


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        
        <Route 
        path="/dashboard" 
      element={
       <ProtectedRoute>
        <DashboardLayout />
        </ProtectedRoute>

       
               }
          >
  
  <Route index element={<DashboardHome />} />
  
  {/*  nested routes */}
  <Route path="dashboardhome" element={<DashboardHome />} />
  <Route path='courses' element={<h1>Settings</h1>} />
  <Route path='students' element={<Students />} /> 
 
</Route>
      </Routes>
    </>
  )
}

export default App
