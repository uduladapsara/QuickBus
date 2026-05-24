// frontend/src/pages/Admin/AdminUsers.jsx
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { FaTrash } from 'react-icons/fa'

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data } = await api.get('/admin/users')
    setUsers(data)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await api.delete(`/admin/users/${id}`)
      fetchUsers()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100"><tr><th className="p-3">Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.name}</td><td>{user.email}</td><td>{user.phone}</td><td>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td><button onClick={() => handleDelete(user._id)} className="text-red-600"><FaTrash /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers