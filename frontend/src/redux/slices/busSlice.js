// frontend/src/redux/slices/busSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const searchBuses = createAsyncThunk('bus/search', async ({ source, destination, date }) => {
  const { data } = await api.get(`/buses/search?source=${source}&destination=${destination}&date=${date}`)
  return data
})

export const fetchSeatLayout = createAsyncThunk('bus/seatLayout', async ({ busId, date }) => {
  const { data } = await api.get(`/buses/seat-layout?busId=${busId}&date=${date}`)
  return data
})

const loadJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch (error) {
    return fallback
  }
}

const initialState = {
  buses: [],
  searchParams: { source: '', destination: '', date: '' },
  seatLayout: [],
  schedule: null,
  selectedBus: loadJson('selectedBus', null),
  selectedSeats: loadJson('selectedSeats', []),
  loading: false,
  error: null
}

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload
    },
    selectSeats: (state, action) => {
      state.selectedSeats = action.payload.seats
      state.selectedBus = {
        busId: action.payload.busId,
        date: action.payload.date,
        fare: action.payload.fare,
        operator: action.payload.operator,
        busType: action.payload.busType
      }
      localStorage.setItem('selectedSeats', JSON.stringify(state.selectedSeats))
      localStorage.setItem('selectedBus', JSON.stringify(state.selectedBus))
    },
    clearSelection: (state) => {
      state.selectedSeats = []
      state.selectedBus = null
      localStorage.removeItem('selectedSeats')
      localStorage.removeItem('selectedBus')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBuses.pending, (state) => { state.loading = true })
      .addCase(searchBuses.fulfilled, (state, action) => { state.loading = false; state.buses = action.payload })
      .addCase(searchBuses.rejected, (state) => { state.loading = false })
      .addCase(fetchSeatLayout.pending, (state) => { state.loading = true })
      .addCase(fetchSeatLayout.fulfilled, (state, action) => { 
        state.loading = false
        state.seatLayout = action.payload.seatsLayout
        state.schedule = action.payload.schedule
      })
      .addCase(fetchSeatLayout.rejected, (state) => { state.loading = false })
  }
})

export const { setSearchParams, selectSeats, clearSelection } = busSlice.actions
export default busSlice.reducer