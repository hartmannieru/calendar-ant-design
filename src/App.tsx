import { Layout } from 'antd';
import React, { FC, useEffect } from 'react'
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import './App.css';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';


const App:FC = () => {
  const {setUser, setAuth} = useActions();

  useEffect(() => {  
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username' || '')} as IUser);
      setAuth(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  )
}

export default App;