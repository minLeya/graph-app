import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, TextField, Button } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import { authAPI } from '../data/database';

const supabase = createClient("https://zgwznptlltnofmscznav.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnd3pucHRsbHRub2Ztc2N6bmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NjE1NjUsImV4cCI6MjA1NjQzNzU2NX0.YwIxpl321rvIDhGBqgX_WlEWW2rrvgLZPRQ-BZWzrFY");

const SignUpIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else if (data.user) {
      const { error: profileError } = await supabase.from('auth.users').insert({
        user_id: data.user.id,
        email,
      });
      setMessage(profileError ? profileError.message : 'Регистрация успешна! Проверьте почту.');
    }
  };

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else if (data.session) {
      // Проверяем, является ли пользователь администратором
      const isAdmin = await authAPI.isAdmin();
      if (isAdmin) {
        navigate('/admin-page');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSignUp}>
            Зарегистрироваться
          </Button>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleSignIn}>
            Войти
          </Button>
          {message && <div style={{ marginTop: '1rem', color: 'red' }}>{message}</div>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUpIn;
