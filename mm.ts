// import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// const corsHeaders = {
//  'Access-Control-Allow-Origin': '*',
//  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// }

// serve(async (req) => {
//  if (req.method === 'OPTIONS') {
//   return new Response('ok', { headers: corsHeaders })
//  }

//  try {
//   const authHeader = req.headers.get('Authorization')
//   const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
//   const url = Deno.env.get('SUPABASE_URL') ?? ''

//   let user = null
//   let isAuthenticated = false
  
//   if (authHeader && authHeader !== `Bearer ${anonKey}`) {
//     const supabaseClient = createClient(url, anonKey ?? '')
//     try {
//       const token = authHeader.replace('Bearer ', '')
//       const { data, error } = await supabaseClient.auth.getUser(token)
//       if (!error && data?.user) {
//         user = data.user
//         isAuthenticated = true
//       }
//     } catch (e) { console.log('Auth check failed:', e.message) }
//   }

//   const RATE_LIMITS = {
//     anonymous: { max: 2, window: 24 * 60 * 60 * 1000 }, 
//     authenticated: { max: 10, window: 24 * 60 * 60 * 1000 },
//   }

//   const limit = isAuthenticated ? RATE_LIMITS.authenticated : RATE_LIMITS.anonymous
//   const identifier = user?.id || req.headers.get('x-forwarded-for') || 'unknown'

//   const supabaseClient = createClient(url, anonKey ?? '')

//   const { data: rateLimitData } = await supabaseClient
//     .from('rate_limits')
//     .select('count, last_reset')
//     .eq('identifier', identifier)
//     .maybeSingle()

//   const now = Date.now()
//   let count = 0
//   let lastReset = now

//   if (rateLimitData) {
//     const timeSinceReset = now - new Date(rateLimitData.last_reset).getTime()
//     if (timeSinceReset < limit.window) {
//       count = rateLimitData.count
//       lastReset = new Date(rateLimitData.last_reset).getTime()
//       if (count >= limit.max) {
//         return new Response(JSON.stringify({ error: `Rate limit reached.`, limit: limit.max }), {
//           status: 429,
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         })
//       }
//     }
//   }

//   // --- START OPENAI SPECIFIC CODE ---
//   const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') // Ensure you set this secret in Supabase
//   if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not configured')

//   const { articleUrl, articleTitle, articleDescription } = await req.json()
  
//   // (Article Fetching & Parsing logic remains the same...)
//   let articleContent = articleDescription || 'No content'
//   try {
//     const articleResponse = await fetch(articleUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }})
//     if (articleResponse.ok) {
//       const html = await articleResponse.text()
//       const doc = new DOMParser().parseFromString(html, 'text/html')
//       if (doc) {
//         const paragraphs = doc.querySelectorAll('p')
//         articleContent = Array.from(paragraphs).map(p => p.textContent).join('\n').substring(0, 12000)
//       }
//     }
//   } catch (e) { console.error('Fetch error:', e) }

//   // OpenAI API Call
//   const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${OPENAI_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       model: 'gpt-4o-mini', // Most cost-effective model for summaries
//       messages: [
//         { 
//           role: "system", 
//           content: "You are a helpful news assistant. Summarize the provided article in 6-8 detailed sentences." 
//         },
//         { 
//           role: "user", 
//           content: `Title: ${articleTitle}\n\nContent: ${articleContent}` 
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 600,
//     }),
//   })

//   if (!openAIResponse.ok) {
//     const errorData = await openAIResponse.json()
//     throw new Error(errorData.error?.message || 'OpenAI API failed')
//   }

//   const aiData = await openAIResponse.json()
//   const summary = aiData.choices[0].message.content
//   // --- END OPENAI SPECIFIC CODE ---

//   await supabaseClient.from('rate_limits').upsert({
//     identifier,
//     count: count + 1,
//     last_reset: count === 0 ? new Date().toISOString() : new Date(lastReset).toISOString(),
//     is_authenticated: isAuthenticated,
//   })

//   return new Response(JSON.stringify({ summary, remaining: limit.max - (count + 1), isAuthenticated }), {
//     headers: { ...corsHeaders, 'Content-Type': 'application/json' }
//   })

//  } catch (error) {
//   return new Response(JSON.stringify({ error: error.message }), {
//     status: 500,
//     headers: { ...corsHeaders, 'Content-Type': 'application/json' }
//   })
//  }
// })