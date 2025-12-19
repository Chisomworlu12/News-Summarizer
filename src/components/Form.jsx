function Form({onSubmit, email, setEmail, password, setPassword, message,children}) {
    return (
        <>
          <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {children}
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}   
        </>
    )
}

export default Form
