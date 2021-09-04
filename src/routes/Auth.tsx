import React, { useState } from 'react';
import authService, { auth } from 'fbase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        // create new Account
        data = await authService.createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      console.log('auth data : ', data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <form>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <button onClick={handleSubmit}>
          {newAccount ? 'Create Accountaa' : 'Log In'}
        </button>
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
          <span
            onClick={toggleAccount}
            style={{
              border: '1px solid black',
              padding: '5px',
              cursor: 'pointer',
            }}
          >
            {newAccount ? 'Sign In' : 'Create Account'}
          </span>
        </div>
        <div>{error}</div>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
