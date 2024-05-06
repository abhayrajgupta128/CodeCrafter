import { createSlice } from "@reduxjs/toolkit";

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    search: "",
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCourses, setSearch } = coursesSlice.actions;

export const selectCourses = (state) => state.courses.courses;
export const selectSearch = (state) => state.courses.search;

export default coursesSlice.reducer;
