import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: localStorage.getItem('UserInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    isLoading: false,
    error: false

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true
        },
        loginUser: (state, action) => {
            state.isLoading = false
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        logoutUser: (state) => {
            state.userInfo = null
            localStorage.removeItem("userInfo")
            // return initialState
        },
        loginFail: (state) => {
            state.isLoading = false
            state.error = true
        },
        changeProfile:(state,action)=>{
            state.userInfo.profilePicture = action.payload
        },
        following: (state, action) => {
            if (state.userInfo.following.includes(action.payload)) {
              state.userInfo.following.splice(
                state.userInfo.following.findIndex(
                  (followingId) => followingId === action.payload
                )
              );
            } else {
              state.userInfo.following.push(action.payload);
            }
          },
        //   following: (state, action) => {
        //     if (state.userInfo && state.userInfo.following) {
        //         if (state.userInfo.following.includes(action.payload)) {
        //             const index = state.userInfo.following.findIndex(
        //                 (followingId) => followingId === action.payload
        //             );
        //             if (index !== -1) {
        //                 state.userInfo.following.splice(index, 1);
        //             }
        //         } else {
        //             state.userInfo.following.push(action.payload);
        //         }
        //     }
        // }

    }
})

export const { loginStart, loginUser, logoutUser, loginFail,changeProfile,following } = userSlice.actions

export default userSlice.reducer