import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../slices/coursesSlice";
import studentReducer from "../slices/studentSlice"
import courseDetailReducer from "../slices/courseDetailsSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    student: studentReducer,
    courseDetail: courseDetailReducer,
  },
});
