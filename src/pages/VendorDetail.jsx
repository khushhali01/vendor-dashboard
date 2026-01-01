import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { format } from 'date-fns';
import { ArrowLeft, User, CreditCard } from 'lucide-react';

export const VendorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('customers');

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const data = await api.getVendorById(id);
                setVendor(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVendor();
    }, [id]);

    if (loading) return <div className="p-6">Loading details...</div>;
    if (!vendor) return <div className="p-6">Vendor not found</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn btn-outline mb-4" style={{ marginBottom: '1rem' }}>
                <ArrowLeft size={16} /> Back
            </button>

            <div className="flex justify-between items-start" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '2rem' }}>{vendor.name}</h1>
                    <p className="text-muted">{vendor.email}</p>
                </div>
                <span style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: vendor.status === 'active' ? '#dcfce7' : '#fee2e2',
                    color: vendor.status === 'active' ? '#166534' : '#991b1b',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem'
                }}>
                    {vendor.status}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {/* Info Card */}
                <div className="card">
                    <h3 className="text-lg font-bold mb-4" style={{ marginBottom: '1rem' }}>Vendor Information</h3>
                    <div className="flex flex-col gap-2">
                        <div>
                            <span className="text-sm text-muted block">Phone</span>
                            <span>{vendor.phone || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-sm text-muted block">Joined Date</span>
                            <span>{format(new Date(vendor.created_at), 'PPP')}</span>
                        </div>
                        <div>
                            <span className="text-sm text-muted block">Total Customers</span>
                            <span>{vendor.customers?.length || 0}</span>
                        </div>
                        <div>
                            <span className="text-sm text-muted block">Total Cards</span>
                            <span>{vendor.prepaid_cards?.length || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Relations Tabs */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="flex border-b" style={{ borderBottom: '1px solid var(--color-divider)', marginBottom: '1rem', gap: '1rem' }}>
                        <button
                            className={`pb-2 ${activeTab === 'customers' ? 'border-b-2 border-primary' : 'text-muted'}`}
                            style={{
                                paddingBottom: '0.5rem',
                                borderBottom: activeTab === 'customers' ? '2px solid var(--color-primary)' : '2px solid transparent',
                                fontWeight: activeTab === 'customers' ? 600 : 400
                            }}
                            onClick={() => setActiveTab('customers')}
                        >
                            Customers ({vendor.customers?.length})
                        </button>
                        <button
                            className={`pb-2 ${activeTab === 'cards' ? 'border-b-2 border-primary' : 'text-muted'}`}
                            style={{
                                paddingBottom: '0.5rem',
                                borderBottom: activeTab === 'cards' ? '2px solid var(--color-primary)' : '2px solid transparent',
                                fontWeight: activeTab === 'cards' ? 600 : 400
                            }}
                            onClick={() => setActiveTab('cards')}
                        >
                            Prepaid Cards ({vendor.prepaid_cards?.length})
                        </button>
                    </div>

                    {activeTab === 'customers' && (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendor.customers?.map(c => (
                                        <tr key={c.id}>
                                            <td>{c.name}</td>
                                            <td>{c.email}</td>
                                            <td>{format(new Date(c.created_at), 'MMM d, yyyy')}</td>
                                        </tr>
                                    ))}
                                    {(!vendor.customers || vendor.customers.length === 0) && (
                                        <tr><td colSpan="3" className="text-center text-muted">No customers found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'cards' && (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Card Number</th>
                                        <th>Balance</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendor.prepaid_cards?.map(c => (
                                        <tr key={c.id}>
                                            <td className="font-mono">{c.card_number}</td>
                                            <td className="font-bold">${c.balance}</td>
                                            <td>
                                                <span style={{
                                                    padding: '0.1rem 0.4rem',
                                                    borderRadius: '4px',
                                                    background: c.status === 'active' ? '#dcfce7' : '#f3f4f6',
                                                    color: c.status === 'active' ? '#166534' : '#374151',
                                                    fontSize: '0.75rem'
                                                }}>
                                                    {c.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!vendor.prepaid_cards || vendor.prepaid_cards.length === 0) && (
                                        <tr><td colSpan="3" className="text-center text-muted">No cards found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
