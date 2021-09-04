import React, { useState } from 'react';
import authService, { auth } from 'fbase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

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

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('작동은 함');

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
      console.log(error);
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
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
