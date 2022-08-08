// import { createSlice } from '@reduxjs/toolkit'

// async function getApplications () {
//   const json = await fetch('/api/users/applications/1')
//   const data = await json.json()
//   return data
// }

// async function getUser () {
//   const json = await fetch('/api/users/1')
//   const data = await json.json()
//   return data
// }

// const initialState = {
//   user: await getUser(),
//   applications: await getApplications()
// }

// export const appSlice = createSlice({
//   name: 'app',
//   initialState,
//   reducers: {
//     ADD_APPLICATION: (state, action) => {
//       state.applications.push(action.payload)
//     },
//     DELETE_APPLICATION: (state, action) => {
//       for (let i = 0; i < state.applications.length; i++) {
//         if (state.applications[i].application_id === action.payload) {
//           state.applications.splice(i, 1)
//         }
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addDefaultCase((state, action) => state)
//   }
// })

// export const { ADD_APPLICATION, DELETE_APPLICATION } = appSlice.actions

// export default appSlice.reducer
