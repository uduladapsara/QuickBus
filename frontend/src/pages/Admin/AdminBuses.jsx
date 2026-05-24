// frontend/src/pages/Admin/AdminBuses.jsx
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

const AdminBuses = () => {
  const [buses, setBuses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingBus, setEditingBus] = useState(null)
  const [formData, setFormData] = useState({
    operatorName: '', busNumber: '', busType: 'Seater', totalSeats: 40,
    sourceCity: '', destinationCity: '', departureTime: '', arrivalTime: '',
    duration: '', fare: 500, liveTracking: false, reschedulable: false, redDeal: false, operatorRating: 4.0
  })

  useEffect(() => {
    fetchBuses()
  }, [])

  const fetchBuses = async () => {
    const { data } = await api.get('/admin/buses')
    setBuses(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingBus) {
        await api.put(`/admin/buses/${editingBus._id}`, formData)
      } else {
        await api.post('/admin/buses', formData)
      }
      fetchBuses()
      setShowModal(false)
      resetForm()
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving bus')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this bus?')) {
      await api.delete(`/admin/buses/${id}`)
      fetchBuses()
    }
  }

  const resetForm = () => {
    setEditingBus(null)
    setFormData({ operatorName: '', busNumber: '', busType: 'Seater', totalSeats: 40,
      sourceCity: '', destinationCity: '', departureTime: '', arrivalTime: '',
      duration: '', fare: 500, liveTracking: false, reschedulable: false, redDeal: false, operatorRating: 4.0 })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Buses</h1>
        <button onClick={() => { resetForm(); setShowModal(true) }} className="bg-quickbus-teal text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaPlus /> Add Bus
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr><th className="p-3">Operator</th><th>Bus No.</th><th>Route</th><th>Fare</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {buses.map(bus => (
              <tr key={bus._id} className="border-t">
                <td className="p-3">{bus.operatorName}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.sourceCity} → {bus.destinationCity}</td>
                <td>₹{bus.fare}</td>
                <td className="flex gap-2">
                  <button onClick={() => { setEditingBus(bus); setFormData(bus); setShowModal(true) }} className="text-blue-600"><FaEdit /></button>
                  <button onClick={() => handleDelete(bus._id)} className="text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-screen overflow-auto">
            <h2 className="text-xl font-bold mb-4">{editingBus ? 'Edit Bus' : 'Add Bus'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Operator Name" value={formData.operatorName} onChange={e => setFormData({...formData, operatorName: e.target.value})} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Bus Number" value={formData.busNumber} onChange={e => setFormData({...formData, busNumber: e.target.value})} className="w-full p-2 border rounded" required />
              <select value={formData.busType} onChange={e => setFormData({...formData, busType: e.target.value})} className="w-full p-2 border rounded">
                <option>Seater</option><option>A/C Seater</option><option>Non-A/C</option><option>Sleeper</option>
              </select>
              <input type="text" placeholder="Source City" value={formData.sourceCity} onChange={e => setFormData({...formData, sourceCity: e.target.value})} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Destination City" value={formData.destinationCity} onChange={e => setFormData({...formData, destinationCity: e.target.value})} className="w-full p-2 border rounded" required />
              <input type="time" value={formData.departureTime} onChange={e => setFormData({...formData, departureTime: e.target.value})} className="w-full p-2 border rounded" />
              <input type="time" value={formData.arrivalTime} onChange={e => setFormData({...formData, arrivalTime: e.target.value})} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Duration (e.g., 5h)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full p-2 border rounded" />
              <input type="number" placeholder="Fare" value={formData.fare} onChange={e => setFormData({...formData, fare: e.target.value})} className="w-full p-2 border rounded" />
              <div className="flex gap-4">
                <label><input type="checkbox" checked={formData.liveTracking} onChange={e => setFormData({...formData, liveTracking: e.target.checked})} /> Live Tracking</label>
                <label><input type="checkbox" checked={formData.reschedulable} onChange={e => setFormData({...formData, reschedulable: e.target.checked})} /> Reschedulable</label>
                <label><input type="checkbox" checked={formData.redDeal} onChange={e => setFormData({...formData, redDeal: e.target.checked})} /> RedDeal</label>
              </div>
              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 py-2 rounded">Cancel</button>
                <button type="submit" className="flex-1 bg-quickbus-orange text-white py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBuses