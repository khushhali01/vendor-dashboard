import { supabase } from './supabaseClient';

export const api = {
    getCounts: async () => {
        try {
            const [vendors, customers, cards, recentVendors] = await Promise.all([
                supabase.from('vendors').select('*', { count: 'exact', head: true }),
                supabase.from('customers').select('*', { count: 'exact', head: true }),
                supabase.from('prepaid_cards').select('*', { count: 'exact', head: true, filter: 'status=eq.active' }),
                supabase.from('vendors').select('*').order('created_at', { ascending: false }).limit(5)
            ]);

            return {
                vendors: vendors.count || 0,
                customers: customers.count || 0,
                activeCards: cards.count || 0,
                recentVendors: recentVendors.data || []
            };
        } catch (error) {
            console.error('Error fetching counts:', error);
            throw error;
        }
    },

    getVendors: async ({ page = 1, limit = 10, search = '' }) => {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('vendors')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (search) {
            query = query.ilike('name', `%${search}%`);
        }

        const { data, count, error } = await query;
        if (error) throw error;
        return { data, count };
    },

    getVendorById: async (id) => {
        const { data, error } = await supabase
            .from('vendors')
            .select(`
        *,
        customers (*),
        prepaid_cards (*)
      `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }
};
