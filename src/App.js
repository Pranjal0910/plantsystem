import React, { useState, useEffect } from 'react';
import './App.css';
import MessageWindow from './MessageWindow'; // Import the MessageWindow component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [latestPests, setLatestPests] = useState([]);
  const [latestDiseases, setLatestDiseases] = useState([]);

  useEffect(() => {
    const usersFromStorage = localStorage.getItem('registeredUsers');
    if (usersFromStorage) {
      setRegisteredUsers(JSON.parse(usersFromStorage));
    }
  }, []);

  const isRegisteredUser = (email, password) => {
    return registeredUsers.some(user => user.email === email && user.password === password);
  };

  useEffect(() => {
    if (loggedIn) {
      fetch('/latest-pests')
        .then(response => response.json())
        .then(data => {
          setLatestPests(data);
        })
        .catch(error => console.error('Error fetching latest pests:', error));

      fetch('/latest-diseases')
        .then(response => response.json())
        .then(data => {
          setLatestDiseases(data);
        })
        .catch(error => console.error('Error fetching latest diseases:', error));
    }
  }, [loggedIn]);

  const handleLogin = () => {
    if (email && password) {
      if (isRegisteredUser(email, password)) {
        setLoggedIn(true);
        setMessage('Welcome! You are now logged in.');
      } else {
        setError('User not registered. Please sign up.');
      }
    } else {
      setError('Please provide valid email and password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail('');
    setPassword('');
    setError('');
    setMessage('');
  };

  const handleRegister = () => {
    const newUser = { email, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
    setIsRegistering(false);
    setError('');
  };

  const toggleRegisterMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Edhas Krushak</h1>
        <div className="AuthOptions">
          {!loggedIn ? (
            <>
              {isRegistering ? (
                <>
                  <h2>Register</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={handleRegister}>Register</button>
                  <p>{error}</p>
                  <p>Already have an account? <button onClick={toggleRegisterMode}>Login</button></p>
                </>
              ) : (
                <>
                  <h2>Login</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={handleLogin}>Login</button>
                  <p>{error}</p>
                  <p>New user? <button onClick={toggleRegisterMode}>Register</button></p>
                </>
              )}
              {/* Display information */}
              <div className="Content">
                <h2>Welcome to Edhas Krushak</h2>
                <p>
                  Edhas Krushak is a sustainable farming solutions provider focused on empowering farmers with innovative technologies.
                </p>
                <p>
                  Our mission is to revolutionize farming practices by leveraging machine learning, IoT, and scientific advancements.
                </p>
                <p>
                  Using state-of-the-art machine learning algorithms and artificial intelligence, we have developed an innovative platform that analyzes the topography of your land to offer personalized and sustainable farming recommendations.
                </p>
                <p>
                  By dividing your land into blocks, we help you optimize resource allocation, reduce wastage, and maximize your yields.
                </p>
                <h3>Follow the following steps to use our services:</h3>
                <ol>
                  <li>Register or Sign In</li>
                  <li>Go through the necessary information</li>
                </ol>
              </div>
            </>
          ) : (
            <>
              {/* Render the MessageWindow component after login */}
              <div className="MessageWindow">
                <h2>Messages for You</h2>
                <MessageWindow message={message} />
              </div>
              <button onClick={handleLogout}>Logout</button>
              {/* Display latest detected pests */}
              <div>
                <h2>Latest Detected Pests</h2>
                <ul>
                  {latestPests.map((pest, index) => (
                    <li key={index}>{pest.name}</li>
                  ))}
                </ul>
              </div>
              {/* Display latest detected diseases */}
              <div>
                <h2>Latest Detected Diseases</h2>
                <ul>
                  {latestDiseases.map((disease, index) => (
                    <li key={index}>{disease.name}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
