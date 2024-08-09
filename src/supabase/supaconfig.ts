import { createClient } from "@supabase/supabase-js";
import { Database } from '../supabase'

let appURL = import.meta.env.VITE_CLIENT_URL
let appKey = import.meta.env.VITE_API_KEY

let supaClient = createClient<Database>(appURL, appKey)
export default supaClient

supaClient.channel("cartUpdates").on('postgres_changes', 
    {event: "*", schema: "public", table:"data_bank"}, (payload) => {
        console.log(payload)
    }).subscribe()