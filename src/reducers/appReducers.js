import { createSlice } from '@reduxjs/toolkit'

async function getCompanies () {
  const json = await fetch('/api/users/companies')
  const data = await json.json()
  return data;
}

// async function getUser () {
//   const json = await fetch('/api/users/1')
//   const data = await json.json()
//   return data
// }

const initialState = {
//   company: await getCompanies()
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    POST_COMPANY: (state, action) => {
      state.company.push(action.payload)
    },
    // DELETE_APPLICATION: (state, action) => {
    //   for (let i = 0; i < state.applications.length; i++) {
    //     if (state.applications[i].application_id === action.payload) {
    //       state.applications.splice(i, 1)
    //     }
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder
      .addDefaultCase((state, action) => state)
  }
})

export const { POST_COMPANY, DELETE_APPLICATION } = appSlice.actions

export default appSlice.reducer;
