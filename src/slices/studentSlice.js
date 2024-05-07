import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],
  currentUser: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setEnrolledCourses(state, action) {
      state.enrolledCourses = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    markCourseAsCompleted(state, action) {
      const courseId = action.payload;
      state.enrolledCourses = state.enrolledCourses.map((course) => {
        if (course.id === courseId) {
          return { ...course, completed: !course.completed };
        }
        return course;
      });
    },
  },
});

export const { setEnrolledCourses, setCurrentUser, markCourseAsCompleted } =
  studentSlice.actions;

export default studentSlice.reducer;
