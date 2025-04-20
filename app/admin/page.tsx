'use client';

import { useEffect, useState, useMemo } from 'react';
import { getAllRegistrations, supabase } from '@/lib/supabase';
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
  FiCalendar,
  FiSend,
  FiPaperclip,
  FiClock,
  FiUndo,
  FiAlertCircle
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

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: string[];
  onSend: (subject: string, body: string) => Promise<void>;
}

function EmailModal({ isOpen, onClose, recipients, onSend }: EmailModalProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSending(true);
      setError(null);
      await onSend(subject, body);
      setSubject('');
      setBody('');
      onClose();
    } catch (err) {
      setError('Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Send Email</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                {recipients.join(', ')}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter email subject"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your message"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

interface ActionHistory {
  id: string;
  type: 'delete' | 'markPaid' | 'markPending' | 'email';
  data: any;
  timestamp: string;
  canUndo: boolean;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiAlertCircle className="text-yellow-500 text-2xl" />
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function HistoryModal({ isOpen, onClose, history }: { isOpen: boolean; onClose: () => void; history: ActionHistory[] }) {
  if (!isOpen) return null;

  const getActionIcon = (type: ActionHistory['type']) => {
    switch (type) {
      case 'delete':
        return <FiTrash2 className="text-red-500" />;
      case 'markPaid':
        return <FiCheck className="text-green-500" />;
      case 'markPending':
        return <FiDollarSign className="text-yellow-500" />;
      case 'email':
        return <FiMail className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getActionDetails = (action: ActionHistory) => {
    switch (action.type) {
      case 'delete':
        return (
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Deleted Registrations:</p>
            <ul className="list-disc list-inside mt-1">
              {Array.isArray(action.data) ? action.data.map((reg: any) => (
                <li key={reg.id}>
                  {reg.fullName} ({reg.email})
                </li>
              )) : (
                <li>
                  {action.data.fullName} ({action.data.email})
                </li>
              )}
            </ul>
          </div>
        );
      case 'markPaid':
      case 'markPending':
        return (
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Updated Registrations:</p>
            <ul className="list-disc list-inside mt-1">
              {Array.isArray(action.data.registrations) ? action.data.registrations.map((reg: any) => (
                <li key={reg.id}>
                  {reg.fullName} ({reg.email})
                </li>
              )) : (
                <li>
                  {action.data.registration.fullName} ({action.data.registration.email})
                </li>
              )}
            </ul>
          </div>
        );
      case 'email':
        return (
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Email Details:</p>
            <div className="mt-1 space-y-1">
              <p><span className="font-medium">To:</span> {action.data.to.join(', ')}</p>
              <p><span className="font-medium">Subject:</span> {action.data.subject}</p>
              <p><span className="font-medium">Content:</span> {action.data.body}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Action History</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No actions recorded yet
              </div>
            ) : (
              history.map((action) => (
                <div key={action.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getActionIcon(action.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {action.type === 'delete' && 'Deleted Registration'}
                            {action.type === 'markPaid' && 'Marked as Paid'}
                            {action.type === 'markPending' && 'Marked as Pending'}
                            {action.type === 'email' && 'Sent Email'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(action.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {action.canUndo && (
                          <button
                            onClick={() => {
                              // Implement undo functionality
                              console.log('Undo action:', action);
                            }}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                          >
                            <FiUndo size={16} />
                            Undo
                          </button>
                        )}
                      </div>
                      {getActionDetails(action)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [actionHistory, setActionHistory] = useState<ActionHistory[]>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<{
    type: 'delete' | 'markPaid' | 'markPending';
    ids: string[];
    data?: any;
  } | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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

  const addToHistory = (type: ActionHistory['type'], data: any, canUndo = true) => {
    setActionHistory(prev => [{
      id: Date.now().toString(),
      type,
      data,
      timestamp: new Date().toISOString(),
      canUndo
    }, ...prev]);
  };

  const handleBulkAction = async (action: 'delete' | 'markPaid' | 'markPending') => {
    if (selectedRows.length === 0) return;

    if (action === 'delete') {
      setConfirmationAction({
        type: 'delete',
        ids: selectedRows,
        data: filteredRegistrations.filter(reg => selectedRows.includes(reg.id))
      });
      setIsConfirmationOpen(true);
      return;
    }

    try {
      setLoading(true);
      let error = null;

      switch (action) {
        case 'markPaid':
          const { error: paidError } = await supabase
            .from('simple_registrations')
            .update({ payment_status: 'completed' })
            .in('id', selectedRows);
          error = paidError;
          break;

        case 'markPending':
          const { error: pendingError } = await supabase
            .from('simple_registrations')
            .update({ payment_status: 'pending' })
            .in('id', selectedRows);
          error = pendingError;
          break;
      }

      if (error) {
        throw error;
      }

      addToHistory(action, {
        ids: selectedRows,
        registrations: filteredRegistrations.filter(reg => selectedRows.includes(reg.id))
      });

      await fetchRegistrations();
      setSelectedRows([]);
      setShowBulkActions(false);
    } catch (err) {
      console.error('Error performing bulk action:', err);
      setError(`Failed to ${action} registrations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSingleAction = async (id: string, action: 'delete' | 'markPaid' | 'markPending') => {
    if (action === 'delete') {
      setConfirmationAction({
        type: 'delete',
        ids: [id],
        data: filteredRegistrations.find(reg => reg.id === id)
      });
      setIsConfirmationOpen(true);
      return;
    }

    try {
      setLoading(true);
      let error = null;

      switch (action) {
        case 'markPaid':
          const { error: paidError } = await supabase
            .from('simple_registrations')
            .update({ payment_status: 'completed' })
            .eq('id', id);
          error = paidError;
          break;

        case 'markPending':
          const { error: pendingError } = await supabase
            .from('simple_registrations')
            .update({ payment_status: 'pending' })
            .eq('id', id);
          error = pendingError;
          break;
      }

      if (error) {
        throw error;
      }

      addToHistory(action, {
        id,
        registration: filteredRegistrations.find(reg => reg.id === id)
      });

      await fetchRegistrations();
    } catch (err) {
      console.error('Error performing action:', err);
      setError(`Failed to ${action} registration: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!confirmationAction) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('simple_registrations')
        .delete()
        .in('id', confirmationAction.ids);

      if (error) {
        throw error;
      }

      addToHistory('delete', confirmationAction.data, false);
      await fetchRegistrations();
      setSelectedRows([]);
    } catch (err) {
      console.error('Error deleting registrations:', err);
      setError(`Failed to delete registrations: ${err.message}`);
    } finally {
      setLoading(false);
      setIsConfirmationOpen(false);
      setConfirmationAction(null);
    }
  };

  const handleSendEmail = async (subject: string, body: string) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedEmails,
          subject,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      addToHistory('email', {
        to: selectedEmails,
        subject,
        body,
        timestamp: new Date().toISOString()
      });

      alert('Email sent successfully!');
    } catch (err) {
      console.error('Error sending email:', err);
      throw err;
    }
  };

  const handleEmailClick = (email: string) => {
    setSelectedEmails([email]);
    setIsEmailModalOpen(true);
  };

  const handleBulkEmail = () => {
    const emails = filteredRegistrations
      .filter(reg => selectedRows.includes(reg.id))
      .map(reg => reg.email);
    setSelectedEmails(emails);
    setIsEmailModalOpen(true);
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
                    onClick={handleBulkEmail}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiMail />
                    Send Email
                  </button>
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
                  <button
                    onClick={() => setIsHistoryOpen(true)}
                    className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FiClock />
                    History
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
                            onClick={() => handleEmailClick(reg.email)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Send Email"
                          >
                            <FiMail />
                          </button>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleSingleAction(reg.id, 'markPaid')}
                              className="text-green-600 hover:text-green-800"
                              title="Mark as Paid"
                            >
                              <FiCheck />
                            </button>
                            <button
                              onClick={() => handleSingleAction(reg.id, 'markPending')}
                              className="text-yellow-600 hover:text-yellow-800"
                              title="Mark as Pending"
                            >
                              <FiDollarSign />
                            </button>
                            <button
                              onClick={() => handleSingleAction(reg.id, 'delete')}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
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

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => {
          setIsEmailModalOpen(false);
          setSelectedEmails([]);
        }}
        recipients={selectedEmails}
        onSend={handleSendEmail}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => {
          setIsConfirmationOpen(false);
          setConfirmationAction(null);
        }}
        onConfirm={handleConfirmAction}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${confirmationAction?.ids.length} registration${confirmationAction?.ids.length !== 1 ? 's' : ''}? This action cannot be undone.`}
        confirmText="Delete"
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={actionHistory}
      />
    </div>
  );
} 