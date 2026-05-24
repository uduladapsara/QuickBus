// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import busReducer from './slices/busSlice'
import bookingReducer from './slices/bookingSlice'
import hireReducer from './slices/hireSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bus: busReducer,
    booking: bookingReducer,
    hire: hireReducer
  }
})