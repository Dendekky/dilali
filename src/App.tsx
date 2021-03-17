import React from 'react';
import './App.css';
import { AccountState, AccountDispatch } from './contexts/AccountContext';
import { Sidebar } from './components/Sidebar';
import Header from './components/Header';

type AppProps = {
  accountState: AccountState;
  accountDispatch: AccountDispatch;
};

const App: React.FC<AppProps> = ({
  accountState: { accountType },
  accountDispatch,
}) => {
  return (
    <div className='App'>
      <Header accountType={accountType} dispatch={accountDispatch} />
      <Sidebar />
    </div>
  );
};

export default App;
