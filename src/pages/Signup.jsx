import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Form from '../components/Form'

function Signup() {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  
  const handleSignup = async (e) => {
    e.preventDefault() 
    
   
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage('Success! Check your email to confirm.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-blue-600 text-center my-2">News Summarizer</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
       <Form onSubmit={handleSignup} email={email} setEmail={setEmail} password={password} setPassword={setPassword} message={message}>Sign Up</Form> 

      </div>
    </div>
  )
}

export default Signup