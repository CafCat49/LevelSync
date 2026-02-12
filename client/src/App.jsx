import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function MyApp() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}