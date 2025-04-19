import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Registration {
  id: string
  fullName: string
  email: string
  phone: string
  age: string
  gender: string
  trekExperience: string
  tShirtSize: string
  registeredAt: string
  paymentStatus: 'pending' | 'completed' | 'failed'
  ticketId?: string
}

export default function RegistrationsAdmin() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [apiKey, setApiKey] = useState('')
  
  const router = useRouter()
  
  // Get base URL based on environment
  function getBaseUrl() {
    return window.location.origin;
  }
  
  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim() === 'footslog-admin-key') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthenticated', 'true')
      fetchRegistrations()
    } else {
      setError('Invalid API key')
    }
  }
  
  // Check if already authenticated
  useEffect(() => {
    const authenticated = localStorage.getItem('adminAuthenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])
  
  // Fetch registrations from the API
  const fetchRegistrations = async () => {
    setIsLoading(true)
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/api/registrations?apiKey=footslog-admin-key`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch registrations')
      }
      
      const data = await response.json()
      setRegistrations(data)
      setError('')
    } catch (err) {
      setError('Failed to load registrations. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Load registrations when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations()
    }
  }, [isAuthenticated])
  
  // Filter registrations by payment status
  const filteredRegistrations = registrations.filter(reg => {
    if (filter === 'all') return true
    return reg.paymentStatus === filter
  })
  
  // Search functionality
  const searchedRegistrations = filteredRegistrations.filter(reg => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      reg.fullName.toLowerCase().includes(term) ||
      reg.email.toLowerCase().includes(term) ||
      reg.phone.includes(term)
    )
  })
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Update payment status
  const updatePaymentStatus = async (id: string, status: string) => {
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/api/registrations`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'footslog-admin-key'
        },
        body: JSON.stringify({
          id,
          paymentStatus: status,
          ticketId: status === 'completed' ? `FTSLG-${Date.now().toString(36)}` : undefined
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update status')
      }
      
      // Refresh registrations
      fetchRegistrations()
    } catch (err) {
      setError('Failed to update payment status')
      console.error(err)
    }
  }
  
  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
    router.reload()
  }
  
  return (
    <>
      <Head>
        <title>Footslog Admin - Trek Registrations</title>
        <meta name="description" content="Admin dashboard for managing trek registrations" />
      </Head>
      
      <div className="min-h-screen bg-[#1A2614] text-[#E5E1D6]">
        {!isAuthenticated ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg border border-[#4A6D33] bg-[#243420] p-8 shadow-lg">
              <h1 className="mb-6 text-center text-2xl font-bold text-[#D4A72C]">Footslog Admin Login</h1>
              
              {error && (
                <div className="mb-4 rounded-md bg-red-500/20 p-3 text-red-200">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label htmlFor="apiKey" className="mb-1 block text-sm font-medium">
                    Admin API Key
                  </label>
                  <input
                    type="password"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full rounded-md border border-[#4A6D33] bg-[#1A2614] p-2 focus:border-[#D4A72C] focus:outline-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#D4A72C] py-2 px-4 text-[#0F1A0A] transition-colors hover:bg-[#C69A28]"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-[#D4A72C]">Trek Registrations</h1>
              
              <button
                onClick={handleLogout}
                className="rounded-md bg-[#4A6D33] py-2 px-4 text-[#E5E1D6] transition-colors hover:bg-[#3A5D23]"
              >
                Logout
              </button>
            </div>
            
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="filter" className="mb-1 block text-sm font-medium">
                  Filter by Status
                </label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full rounded-md border border-[#4A6D33] bg-[#1A2614] p-2 focus:border-[#D4A72C] focus:outline-none"
                >
                  <option value="all">All Registrations</option>
                  <option value="pending">Pending Payment</option>
                  <option value="completed">Payment Completed</option>
                  <option value="failed">Payment Failed</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="search" className="mb-1 block text-sm font-medium">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email or phone"
                  className="w-full rounded-md border border-[#4A6D33] bg-[#1A2614] p-2 focus:border-[#D4A72C] focus:outline-none"
                />
              </div>
            </div>
            
            <div className="mb-4 rounded-md bg-[#243420] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-medium">Total Registrations: </span>
                  <span className="text-[#D4A72C]">{registrations.length}</span>
                </div>
                
                <div className="flex space-x-6">
                  <div>
                    <span className="font-medium">Pending: </span>
                    <span className="text-yellow-400">
                      {registrations.filter(r => r.paymentStatus === 'pending').length}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Completed: </span>
                    <span className="text-green-400">
                      {registrations.filter(r => r.paymentStatus === 'completed').length}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Failed: </span>
                    <span className="text-red-400">
                      {registrations.filter(r => r.paymentStatus === 'failed').length}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={fetchRegistrations}
                  className="rounded-md bg-[#4A6D33] py-1 px-3 text-sm text-[#E5E1D6] transition-colors hover:bg-[#3A5D23]"
                >
                  Refresh
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4A6D33] border-t-[#D4A72C]"></div>
              </div>
            ) : error ? (
              <div className="rounded-md bg-red-500/20 p-4 text-center text-red-200">
                {error}
              </div>
            ) : searchedRegistrations.length === 0 ? (
              <div className="rounded-md bg-[#243420] p-8 text-center">
                <p className="text-lg">No registrations found</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[#4A6D33]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#2A3B22]">
                      <th className="border-b border-[#4A6D33] p-3 text-left font-medium">Name</th>
                      <th className="border-b border-[#4A6D33] p-3 text-left font-medium">Contact</th>
                      <th className="border-b border-[#4A6D33] p-3 text-left font-medium">Details</th>
                      <th className="border-b border-[#4A6D33] p-3 text-left font-medium">Registration Time</th>
                      <th className="border-b border-[#4A6D33] p-3 text-left font-medium">Status</th>
                      <th className="border-b border-[#4A6D33] p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedRegistrations.map((reg) => (
                      <tr key={reg.id} className="border-b border-[#4A6D33] hover:bg-[#2A3B22]/50">
                        <td className="p-3">
                          <div className="font-medium">{reg.fullName}</div>
                          <div className="text-sm text-[#8B9D7D]">Age: {reg.age}</div>
                        </td>
                        <td className="p-3">
                          <div>{reg.email}</div>
                          <div className="text-sm">{reg.phone}</div>
                        </td>
                        <td className="p-3">
                          <div>Experience: {reg.trekExperience}</div>
                          <div>T-shirt: {reg.tShirtSize}</div>
                        </td>
                        <td className="p-3">{formatDate(reg.registeredAt)}</td>
                        <td className="p-3">
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                              reg.paymentStatus === 'completed'
                                ? 'bg-green-900/50 text-green-300'
                                : reg.paymentStatus === 'failed'
                                ? 'bg-red-900/50 text-red-300'
                                : 'bg-yellow-900/50 text-yellow-300'
                            }`}
                          >
                            {reg.paymentStatus.charAt(0).toUpperCase() + reg.paymentStatus.slice(1)}
                          </span>
                          {reg.ticketId && (
                            <div className="mt-1 text-xs text-[#8B9D7D]">Ticket: {reg.ticketId}</div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            {reg.paymentStatus !== 'completed' && (
                              <button
                                onClick={() => updatePaymentStatus(reg.id, 'completed')}
                                className="rounded bg-green-900/30 px-2 py-1 text-xs text-green-300 hover:bg-green-900/50"
                              >
                                Mark Paid
                              </button>
                            )}
                            {reg.paymentStatus !== 'failed' && (
                              <button
                                onClick={() => updatePaymentStatus(reg.id, 'failed')}
                                className="rounded bg-red-900/30 px-2 py-1 text-xs text-red-300 hover:bg-red-900/50"
                              >
                                Mark Failed
                              </button>
                            )}
                            {reg.paymentStatus !== 'pending' && (
                              <button
                                onClick={() => updatePaymentStatus(reg.id, 'pending')}
                                className="rounded bg-yellow-900/30 px-2 py-1 text-xs text-yellow-300 hover:bg-yellow-900/50"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
} 