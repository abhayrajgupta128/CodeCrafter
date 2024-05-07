import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setEnrolledCourses,
  setCurrentUser,
  markCourseAsCompleted,
} from "../slices/studentSlice";

const StudentDashboardPage = () => {
  const enrolledCourses = useSelector((state) => state.student.enrolledCourses);
  const currentUser = useSelector((state) => state.student.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(
          "https://abhayrajgupta128.github.io/jsonapi/db.json"
        );
        const courses = res.data;
        const courseModel = courses.courseModel ?? [];
        const userCourses = courseModel.filter((course) =>
          course.students.some((student) => student.id === 105)
        );
        dispatch(setEnrolledCourses(userCourses));

        // We can create user model by we don't have to put user's ID manually but you don't give that in the tasks.
        // Assuming the current user's id is 105
        // You can check by entering id from 101 to 109

        const currentUserData = userCourses[0]?.students.find(
          (student) => student.id === 105
        );
        dispatch(setCurrentUser(currentUserData));
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      }
    };

    fetchEnrolledCourses();
  }, [dispatch]);

  const handleMarkAsCompleted = (courseId) => {
    dispatch(markCourseAsCompleted(courseId));
  };

  const calculateProgress = (currentWeek, totalWeeks) => {
    return (currentWeek / totalWeeks) * 100;
  };

  return (
    <div className="mt-4 text-white ">
      <div className="box p-8 rounded-3xl ">
        <div className="flex gap-2">
          <h1 className="text-3xl">
            <strong>Welcome back, {currentUser?.name.split(" ")[0]}</strong>
            <span role="img" aria-label="waving hand" className="text-3xl">
              👋
            </span>
          </h1>
        </div>
        <p className="mt-4">
          You've learned <span className="font-bold">80%</span> of your goal
          this week! <br />
          keep it up and improve your progress!
        </p>
      </div>
      <div className="mt-6">
        <h1 className="text-2xl mb-6">Your Courses</h1>
        <div className="grid gap-14 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-10">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="flex justify-center">
              <div>
                <img
                  className="rounded-t-2xl w-auto h-64 object-cover"
                  src={course.thumbnail}
                  alt="image"
                />
                <div className="course rounded-b-2xl w-auto p-4 h-38">
                  <h2 className="font-bold h-12">{course.name}</h2>
                  <h3 className="text-sm text-gray-300">{course.instructor}</h3>
                  <h3 className="mt-4 mr-4">Due Date: {course.dueDate}</h3>
                  <label className="inline-flex items-center">
                    <span className="mr-2 mt-1">Mark as Completed</span>
                    <input
                      className="course h-5 w-5 mt-1 bg-black"
                      type="checkbox"
                      checked={!!course.completed}
                      onChange={() => handleMarkAsCompleted(course.id)}
                    />
                  </label>
                  <div className="mt-4">
                    <progress
                      className="w-full"
                      value={
                        course.completed
                          ? 100
                          : calculateProgress(
                              course.currentWeek,
                              course.totalWeeks
                            )
                      }
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
