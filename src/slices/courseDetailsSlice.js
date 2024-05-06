import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: null,
  isLoading: false,
  isExpanded: false,
};

const courseDetailSlice = createSlice({
  name: "courseDetail",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsExpanded: (state, action) => {
      state.isExpanded = action.payload;
    },
  },
});

export const { setCourse, setLoading, setIsExpanded } = courseDetailSlice.actions;

export const selectCourse = (state) => state.courseDetail.course;

export default courseDetailSlice.reducer;
