import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { format } from 'date-fns';

export const VendorList = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const limit = 10;

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const fetchVendors = async () => {
            setLoading(true);
            try {
                const { data, count } = await api.getVendors({ page, limit, search: debouncedSearch });
                setVendors(data);
                setTotal(count);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, [page, debouncedSearch]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h1 className="page-title">Vendors</h1>
                <div className="flex items-center gap-2" style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search vendors..."
                        className="input"
                        style={{ paddingLeft: '36px', width: '250px' }}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // Reset to first page on search
                        }}
                    />
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Vendor Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-4">Loading vendors...</td>
                                </tr>
                            ) : vendors.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-muted">No vendors found.</td>
                                </tr>
                            ) : (
                                vendors.map((vendor) => (
                                    <tr key={vendor.id}>
                                        <td className="font-bold">{vendor.name}</td>
                                        <td className="text-muted">{vendor.email}</td>
                                        <td>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                background: vendor.status === 'active' ? '#dcfce7' : '#fee2e2',
                                                color: vendor.status === 'active' ? '#166534' : '#991b1b',
                                                textTransform: 'capitalize'
                                            }}>
                                                {vendor.status}
                                            </span>
                                        </td>
                                        <td className="text-muted text-sm">
                                            {format(new Date(vendor.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td>
                                            <Link to={`/vendors/${vendor.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                                                <Eye size={16} /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && total > 0 && (
                    <div className="flex justify-between items-center" style={{ padding: 'var(--spacing-md)', borderTop: '1px solid var(--color-divider)' }}>
                        <span className="text-sm text-muted">
                            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} results
                        </span>
                        <div className="flex gap-2">
                            <button
                                className="btn btn-outline"
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                className="btn btn-outline"
                                disabled={page === totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
