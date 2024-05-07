import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SingleCourse, Search } from "../components";
import {
  setCourses,
  setSearch,
  selectCourses,
  selectSearch,
} from "../slices/coursesSlice";

const CourseListingPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const search = useSelector(selectSearch);

  useEffect(() => {
    axios
      .get("https://abhayrajgupta128.github.io/jsonapi/db.json")
      .then((res) => dispatch(setCourses(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleSearch = (ev) => {
    dispatch(setSearch(ev.target.value));
  };

  const courseModel = courses.courseModel ?? [];
  const filteredCourses = courseModel.filter((course) => {
    if (!course || typeof course !== "object") {
      return false;
    }

    const name = course.name ?? "";
    const instructor = course.instructor ?? "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      instructor.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="text-white mt-4">
      <div className="flex justify-between ">
        <div className="flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h- lg:w-10 lg:h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
          <h1 className="hidden sm:block text-4xl font-bold">All courses</h1>
        </div>
        <Search search={search} handleSearch={handleSearch} />
      </div>

      <div className="grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {filteredCourses.map((course) => (
          <div key={course.id} className="flex justify-center">
            <SingleCourse course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseListingPage;
