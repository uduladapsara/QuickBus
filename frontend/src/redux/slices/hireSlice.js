// frontend/src/redux/slices/hireSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchHireVehicles = createAsyncThunk('hire/fetchVehicles', async (params) => {
  const { data } = await api.get('/hire/vehicles', { params })
  return data
})

export const createHireBooking = createAsyncThunk('hire/createBooking', async (bookingData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/hire/bookings', bookingData)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message)
  }
})

export const fetchUserHireBookings = createAsyncThunk('hire/myBookings', async () => {
  const { data } = await api.get('/hire/my-bookings')
  return data
})

const initialState = {
  vehicles: [],
  selectedHireVehicle: null,
  journeyType: '',
  pickupLocation: '',
  dropLocation: '',
  pickupDate: '',
  returnDate: '',
  passengerCount: 1,
  hireBookings: [],
  loading: false,
  error: null
}

const hireSlice = createSlice({
  name: 'hire',
  initialState,
  reducers: {
    selectHireVehicle: (state, action) => {
      state.selectedHireVehicle = action.payload.vehicle
      state.journeyType = action.payload.journeyType
      state.pickupLocation = action.payload.pickup
      state.dropLocation = action.payload.drop
      state.pickupDate = action.payload.pickupDate
      state.returnDate = action.payload.returnDate
      state.passengerCount = action.payload.passengerCount
    },
    clearHire: (state) => {
      state.selectedHireVehicle = null
      state.hireBookings = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHireVehicles.pending, (state) => { state.loading = true })
      .addCase(fetchHireVehicles.fulfilled, (state, action) => { state.loading = false; state.vehicles = action.payload })
      .addCase(fetchHireVehicles.rejected, (state) => { state.loading = false })
      .addCase(createHireBooking.pending, (state) => { state.loading = true })
      .addCase(createHireBooking.fulfilled, (state, action) => { state.loading = false; state.hireBookings.push(action.payload) })
      .addCase(createHireBooking.rejected, (state) => { state.loading = false })
      .addCase(fetchUserHireBookings.pending, (state) => { state.loading = true })
      .addCase(fetchUserHireBookings.fulfilled, (state, action) => { state.loading = false; state.hireBookings = action.payload })
      .addCase(fetchUserHireBookings.rejected, (state) => { state.loading = false })
  }
})

export const { selectHireVehicle, clearHire } = hireSlice.actions
export default hireSlice.reducer