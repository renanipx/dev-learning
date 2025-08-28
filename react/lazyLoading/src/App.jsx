import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>React Router + Lazy Loading (JS)</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/about" style={{ marginRight: "15px" }}>About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <Suspense fallback={<p>Loading page...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
