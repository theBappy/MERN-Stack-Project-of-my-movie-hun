import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: [],
    },
    filteredMovies: [],
    movieYears: [],
    uniqueYear: [],
  },

  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },

    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },

    setMoviesYears: (state, action) => {
      state.movieYears = action.payload;
    },

    setUniqueYears: (state, action) => {
      state.uniqueYear = action.payload;
    },
  },
});


export const {
    setMoviesFilter,
    setFilteredMovies,
    setMoviesYears,
    setUniqueYears,
} = movieSlice.actions;

export default movieSlice.reducer;