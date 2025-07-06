import { configureStore } from "@reduxjs/toolkit";

import { filterSlice, userSlice } from "./slices";

const store = configureStore({
    reducer: {
        user: userSlice,
        filter: filterSlice
    },
})

export {store};