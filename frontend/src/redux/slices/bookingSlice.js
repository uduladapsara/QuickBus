// frontend/src/redux/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const createBooking = createAsyncThunk('booking/create', async (bookingData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/bookings', bookingData)
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Booking failed')
  }
})

export const fetchMyBookings = createAsyncThunk('booking/myBookings', async () => {
  const { data } = await api.get('/bookings/my-bookings')
  return data
})

const initialState = {
  bookings: [],
  currentBooking: null,
  boardingPoint: '',
  droppingPoint: '',
  passengers: [],
  loading: false,
  error: null
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBoardingDropping: (state, action) => {
      state.boardingPoint = action.payload.boardingPoint
      state.droppingPoint = action.payload.droppingPoint
    },
    setPassengers: (state, action) => {
      state.passengers = action.payload
    },
    clearBooking: (state) => {
      state.boardingPoint = ''
      state.droppingPoint = ''
      state.passengers = []
      state.currentBooking = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => { state.loading = true })
      .addCase(createBooking.fulfilled, (state, action) => { state.loading = false; state.currentBooking = action.payload })
      .addCase(createBooking.rejected, (state) => { state.loading = false })
      .addCase(fetchMyBookings.pending, (state) => { state.loading = true })
      .addCase(fetchMyBookings.fulfilled, (state, action) => { state.loading = false; state.bookings = action.payload })
      .addCase(fetchMyBookings.rejected, (state) => { state.loading = false })
  }
})

export const { setBoardingDropping, setPassengers, clearBooking } = bookingSlice.actions
export default bookingSlice.reducer