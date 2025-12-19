import { useState } from 'react'
import { supabase } from '../lib/supabase'
import {useNavigate } from 'react-router-dom'
import Form from '../components/Form'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Call Supabase to login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      navigate('/')
      console.log('Logged in user:', data.user)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-blue-600 text-center my-2">News Summarizer</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Form onSubmit={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} message={message}>Login</Form>

        <p className="mt-4 text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login