import { BrowserRouter, Routes, Route, Link, useParams, Outlet } from 'react-router-dom';
import './App.css';

// Simple pages
function Home() { return <h2>Home</h2>; }
function About() { return <h2>About</h2>; }
function Contact() { return <h2>Contact</h2>; }

// Page with parameter
function User() {
  const { id } = useParams<{ id: string }>();
  return <h2>User Profile: {id}</h2>;
}

// Dashboard with nested routes
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-nav">
        <Link to="stats">Stats</Link>
        <Link to="settings">Settings</Link>
      </div>
      <Outlet />
    </div>
  );
}

function Stats() {
  return <div className="dashboard-section">Dashboard statistics</div>;
}

function Settings() {
  return <div className="dashboard-section">Dashboard settings</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/user/Teste">User</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
