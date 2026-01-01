import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Users, Store, CreditCard } from 'lucide-react';


export const Dashboard = () => {
    const [stats, setStats] = useState({ vendors: 0, customers: 0, activeCards: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await api.getCounts();
                setStats(data);
            } catch (err) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="p-6">Loading stats...</div>;
    if (error) return <div className="p-6" style={{ color: 'var(--color-danger)' }}>{error}</div>;

    const StatCard = ({ title, count, icon: Icon, color }) => (
        <div className="card flex flex-col justify-between" style={{ borderLeft: `4px solid ${color}` }}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm text-muted font-bold uppercase tracking-wider">{title}</h3>
                    <p className="text-2xl font-bold mt-2">{count}</p>
                </div>
                <div style={{ padding: '0.5rem', background: `${color}20`, borderRadius: '50%', color: color }}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 className="page-title">Overview</h1>
                <button className="btn btn-primary">Download Report</button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <StatCard
                    title="Total Vendors"
                    count={stats.vendors}
                    icon={Store}
                    color="var(--color-primary)"
                />
                <StatCard
                    title="Total Customers"
                    count={stats.customers}
                    icon={Users}
                    color="var(--color-success)"
                />
                <StatCard
                    title="Active Prepaid Cards"
                    count={stats.activeCards}
                    icon={CreditCard}
                    color="var(--color-warning)"
                />
            </div>

            <div className="card">
                <h3 className="text-lg font-bold" style={{ marginBottom: 'var(--spacing-md)',}}>Recent Vendors</h3>
                {stats.recentVendors?.length === 0 ? (
                    <p className="text-muted">No recent vendors.</p>
                ) : (
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
                                {stats.recentVendors?.map(v => (
                                    <tr key={v.id}>
                                        <td>{v.name}</td>
                                        <td>{v.email}</td>
                                        <td>{v.created_at ? new Date(v.created_at).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
