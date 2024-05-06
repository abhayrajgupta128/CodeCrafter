import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import {CourseDetailsPage,CourseListingPage,StudentDashboardPage,} from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CourseListingPage />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />
          <Route path="/dashboard" element={<StudentDashboardPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
