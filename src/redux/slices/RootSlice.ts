import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
        project: "Project",
        description: "Description",
        date_created: "Date Created",
    },
    reducers: {
        // Took this from class still need to fully underatand what it does haha
        // action is submitted elsewhere - written to state.name
        chooseProject: (state, action) => { state.project = action.payload }, 
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseDate_created: (state, action) => { state.date_created = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseProject, chooseDescription, chooseDate_created } = rootSlice.actions