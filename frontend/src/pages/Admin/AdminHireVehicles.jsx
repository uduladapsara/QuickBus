// frontend/src/pages/Admin/AdminHireVehicles.jsx
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

const AdminHireVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '', type: 'Sedan', capacity: 4, pricePerKm: 15, basePrice: 500, minKm: 50, amenities: [], available: true
  })

  useEffect(() => { fetchVehicles() }, [])

  const fetchVehicles = async () => {
    const { data } = await api.get('/admin/hire-vehicles')
    setVehicles(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/admin/hire-vehicles/${editing._id}`, formData)
      } else {
        await api.post('/admin/hire-vehicles', formData)
      }
      fetchVehicles()
      setShowModal(false)
      resetForm()
    } catch (error) { alert('Error saving vehicle') }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) { await api.delete(`/admin/hire-vehicles/${id}`); fetchVehicles() }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({ name: '', type: 'Sedan', capacity: 4, pricePerKm: 15, basePrice: 500, minKm: 50, amenities: [], available: true })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Hire Vehicles</h1>
        <button onClick={() => { resetForm(); setShowModal(true) }} className="bg-quickbus-teal text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaPlus /> Add Vehicle
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100"><tr><th className="p-3">Name</th><th>Type</th><th>Capacity</th><th>Price/km</th><th>Base Price</th><th>Actions</th></tr></thead>
          <tbody>
            {vehicles.map(v => (
              <tr key={v._id} className="border-t">
                <td className="p-3">{v.name}</td><td>{v.type}</td><td>{v.capacity}</td><td>₹{v.pricePerKm}</td><td>₹{v.basePrice}</td>
                <td className="flex gap-2">
                  <button onClick={() => { setEditing(v); setFormData(v); setShowModal(true) }} className="text-blue-600"><FaEdit /></button>
                  <button onClick={() => handleDelete(v._id)} className="text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{editing ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" required />
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-2 border rounded">
                <option>Sedan</option><option>SUV</option><option>Tempo</option><option>Mini Bus</option><option>Coach</option>
              </select>
              <input type="number" placeholder="Capacity" value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} className="w-full p-2 border rounded" />
              <input type="number" placeholder="Price per KM" value={formData.pricePerKm} onChange={e => setFormData({...formData, pricePerKm: parseFloat(e.target.value)})} className="w-full p-2 border rounded" />
              <input type="number" placeholder="Base Price" value={formData.basePrice} onChange={e => setFormData({...formData, basePrice: parseFloat(e.target.value)})} className="w-full p-2 border rounded" />
              <input type="number" placeholder="Min KM" value={formData.minKm} onChange={e => setFormData({...formData, minKm: parseInt(e.target.value)})} className="w-full p-2 border rounded" />
              <label><input type="checkbox" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} /> Available</label>
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

export default AdminHireVehicles