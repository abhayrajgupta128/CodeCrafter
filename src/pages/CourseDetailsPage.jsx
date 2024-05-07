import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  selectCourse,
  setCourse,
  setLoading,
  setIsExpanded,
} from "../slices/courseDetailsSlice";

const CourseDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector(selectCourse);
  const isLoading = useSelector((state) => state.courseDetail.isLoading);
  const isExpanded = useSelector((state) => state.courseDetail.isExpanded);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(
          `https://abhayrajgupta128.github.io/jsonapi/db.json`
        );
        const courseModel = res.data.courseModel ?? [];

        const selectedCourse = courseModel.find(
          (course) => String(course.id) === id
        );
        if (selectedCourse) {
          dispatch(setCourse(selectedCourse));
        } else {
          console.error("Error fetching course: Course not found");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCourse();
  }, [dispatch, id]);

  const toggleSyllabus = () => {
    dispatch(setIsExpanded(!isExpanded));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="grow flex items-center justify-center">
      <div className="box text-white p-8 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {course.name}
        </h2>
        <div className="mb-4 flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>

          <p className="text-xl">{course.description}</p>
        </div>
        <div className="mb-4 text-lg">
          <p className="text-lg">
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p>
            <strong>Enrollment Status:</strong> {course.enrollmentStatus}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration}
          </p>
          <p>
            <strong>Schedule:</strong> {course.schedule}
          </p>
          <p>
            <strong>Location:</strong> {course.location}
          </p>
          <p>
            <strong>Pre-requisites:</strong> .
            {/* {course.prerequisites.join(", ")} */}
          </p>
        </div>
        <div>
          <div className="flex gap-2" onClick={toggleSyllabus}>
            <h3 className="text-xl font-semibold mb-2 cursor-pointer">
              Syllabus
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                clipRule="evenodd"
              />
              <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
            </svg>
          </div>

          {isExpanded && (
            <ul>
              {course.syllabus.map((item) => (
                <li key={item.week} className="mb-2">
                  <strong>Week {item.week}:</strong> {item.topic} -{" "}
                  {item.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
