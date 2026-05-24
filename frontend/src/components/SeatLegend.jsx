// frontend/src/components/SeatLegend.jsx
const SeatLegend = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Seat Legend</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-quickbus-teal rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded"></div>
          <span>Booked (Not Available)</span>
        </div>
      </div>
    </div>
  )
}

export default SeatLegend