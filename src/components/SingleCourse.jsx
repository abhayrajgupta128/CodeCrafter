import React from "react";
import { Link } from "react-router-dom";

const SingleCourse = ({ course }) => {
  return (
    <Link to={"/course/" + course.id}>
      <div>
        <img
          className="rounded-t-2xl w-auto h-96 object-cover"
          src={course.thumbnail}
          alt="image"
        />
      </div>
      <div className="course rounded-b-2xl p-4 w-auto h-48">
        <h2 className="font-bold">{course.name}</h2>
        <h3 className="text-sm text-gray-300">{course.instructor}</h3>
        <p className="mt-4 h-10">
          <span className="font-bold">Skills you'll gain: </span>
          {course.skills.join(", ")}
        </p>
        <h3 className="mt-6 mr-4 ">{course.level}</h3>
      </div>
    </Link>
  );
};

export default SingleCourse;
