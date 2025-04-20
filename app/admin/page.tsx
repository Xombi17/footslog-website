'use client';

import { useEffect, useState, useMemo } from 'react';
import { getAllRegistrations } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiRefreshCw, 
  FiLogOut, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiCheck, 
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiTrash2,
  FiMail,
  FiUserCheck,
  FiDollarSign,
  FiCalendar
} from 'react-icons/fi';

interface Registration {
  id: string;
  email: string;
  fullName: string;
  paymentStatus: string;
  ticketId: string;
  registeredAt: string;
  updatedAt: string;
  [key: string]: any;
}

type SortField = 'fullName' | 'email' | 'paymentStatus' | 'registeredAt';
type SortDirection = 'asc' | 'desc';

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('registeredAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    today: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (registrations.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      setStats({
        total: registrations.length,
        completed: registrations.filter(r => r.paymentStatus === 'completed').length,
        pending: registrations.filter(r => r.paymentStatus === 'pending').length,
        today: registrations.filter(r => r.registeredAt.startsWith(today)).length
      });
    }
  }, [registrations]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const data = await getAllRegistrations();
      setRegistrations(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch registrations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey === process.env.NEXT_PUBLIC_ADMIN_API_KEY) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid API key');
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredRegistrations.map(r => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleBulkAction = async (action: 'delete' | 'markPaid' | 'markPending') => {
    if (selectedRows.length === 0) return;

    try {
      setLoading(true);
      // Here you would implement the actual bulk actions
      // For now, we'll just show a success message
      alert(`Bulk action "${action}" would be performed on ${selectedRows.length} registrations`);
      setSelectedRows([]);
      setShowBulkActions(false);
    } catch (err) {
      setError('Failed to perform bulk action');
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = useMemo(() => {
    let result = registrations.filter(reg => 
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.ticketId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (paymentFilter !== 'all') {
      result = result.filter(reg => reg.paymentStatus === paymentFilter);
    }

    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;

      if (sortField === 'registeredAt') {
        return (new Date(aValue).getTime() - new Date(bValue).getTime()) * direction;
      }

      return aValue.localeCompare(bValue) * direction;
    });

    return result;
  }, [registrations, searchTerm, paymentFilter, sortField, sortDirection]);

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Payment Status', 'Ticket ID', 'Registration Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        reg.fullName,
        reg.email,
        reg.paymentStatus,
        reg.ticketId,
        new Date(reg.registeredAt).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter API key"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Login
            </button>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 mt-4 text-center"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-green-800">Trek Registrations</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={fetchRegistrations}
              className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors shadow-sm"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors shadow-sm"
            >
              <FiDownload />
              Export CSV
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiUserCheck className="text-green-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Registrations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiDollarSign className="text-blue-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiDollarSign className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiCalendar className="text-purple-600 text-2xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Registrations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or ticket ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Payments</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {selectedRows.length > 0 && (
            <div className="bg-green-50 p-4 border-b border-green-200">
              <div className="flex items-center justify-between">
                <p className="text-green-800">
                  {selectedRows.length} registration{selectedRows.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('markPaid')}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FiCheck />
                    Mark as Paid
                  </button>
                  <button
                    onClick={() => handleBulkAction('markPending')}
                    className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <FiDollarSign />
                    Mark as Pending
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading registrations...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === filteredRegistrations.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('fullName')}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortField === 'fullName' && (
                          sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center gap-1">
                        Email
                        {sortField === 'email' && (
                          sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('paymentStatus')}
                    >
                      <div className="flex items-center gap-1">
                        Payment Status
                        {sortField === 'paymentStatus' && (
                          sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('registeredAt')}
                    >
                      <div className="flex items-center gap-1">
                        Registered At
                        {sortField === 'registeredAt' && (
                          sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRegistrations.map((reg) => (
                    <motion.tr 
                      key={reg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(reg.id)}
                          onChange={(e) => handleSelectRow(reg.id, e.target.checked)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{reg.fullName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{reg.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            reg.paymentStatus === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {reg.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(reg.registeredAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedRegistration(reg);
                              setIsModalOpen(true);
                            }}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              // Implement email sending
                              alert(`Would send email to ${reg.email}`);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FiMail />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Registration Details</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="mt-1 text-gray-900">{selectedRegistration.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-gray-900">{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
                    <p className="mt-1">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedRegistration.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {selectedRegistration.paymentStatus}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ticket ID</h3>
                    <p className="mt-1 text-gray-900">{selectedRegistration.ticketId}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(selectedRegistration.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 