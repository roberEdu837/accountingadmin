import { createSlice } from "@reduxjs/toolkit";

export interface FilterState {
  month: number;
  year: number;
  search: string;
  status: boolean | undefined | string;
}

const initialState: FilterState = {
  month: 0,
  year: 0,
  search: "",
  status: false,
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setMonth, setYear, setSearch, resetFilters, setStatus } =
  filterSlice.actions;

export default filterSlice.reducer;

export const setmonth = (month: number) => {
  return (dispatch: any) => {
    localStorage.setItem("month", month.toString());
    dispatch(setMonth(month));
  };
};

export const setyear = (year: number) => {
  return (dispatch: any) => {
    localStorage.setItem("year", year.toString());
    dispatch(setYear(year));
  };
};

export const setsearch = (search: string) => {
  return (dispatch: any) => {
    localStorage.setItem("search", search);
    dispatch(setSearch(search));
  };
};

export const setstatus = (status: boolean | undefined | string) => {
  console.log(status, "statusslice");
  return (dispatch: any) => {
    if (status === undefined || status === null || status === "undefined") {
      localStorage.removeItem("status");
    } else {
      localStorage.setItem("status", JSON.stringify(status));
    }
    dispatch(setStatus(status));
  };
};
