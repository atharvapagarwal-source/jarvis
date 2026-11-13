import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test database connection
async function testConnection() {
    const { data, error } = await supabase
        .from('energy_readings')
        .select('id, building_id, timestamp_utc')
        .limit(5);

    if (error) {
        console.error('Supabase connection failed:', error.message);
    } else {
        console.log('Supabase connected successfully!');
        console.log('Sample records:', data);
    }
}

testConnection();