// frontend/src/components/SeatMap.jsx
const SeatMap = ({ seatsLayout, bookedSeats, selectedSeats, onSeatClick }) => {
  const isSeatBooked = (seatNumber) => bookedSeats.includes(seatNumber)
  const isSeatSelected = (seatNumber) => selectedSeats.includes(seatNumber)

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="mb-4 text-center">
          <div className="w-16 h-8 bg-gray-300 mx-auto rounded-t-lg"></div>
          <p className="text-xs mt-1">Driver</p>
        </div>
        <div className="space-y-2">
          {seatsLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-3">
              {row.map((seat, colIndex) => (
                seat ? (
                  <button
                    key={seat}
                    onClick={() => !isSeatBooked(seat) && onSeatClick(seat)}
                    disabled={isSeatBooked(seat)}
                    className={`
                      w-12 h-12 rounded-lg font-semibold text-sm transition
                      ${isSeatBooked(seat) ? 'bg-red-500 text-white cursor-not-allowed' : ''}
                      ${isSeatSelected(seat) ? 'bg-quickbus-teal text-white' : 'bg-gray-200 hover:bg-gray-300'}
                      ${!isSeatBooked(seat) && !isSeatSelected(seat) ? 'cursor-pointer' : ''}
                    `}
                  >
                    {seat}
                  </button>
                ) : (
                  <div key={`empty-${rowIndex}-${colIndex}`} className="w-12 h-12"></div>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeatMap