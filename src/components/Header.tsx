import React from 'react';
import {
  AccountDispatch,
  AccountState,
  AccountType,
} from '../contexts/AccountContext';
import logo from '../assets/images/bee.jpg';

export type HeaderProps = AccountState & {
  dispatch: AccountDispatch;
};

export const Header: React.FC<HeaderProps> = ({ accountType, dispatch }) => {
  const handleAccountType = (accountType: AccountType) => {
    dispatch({
      type: 'setAccountType',
      payload: {
        accountType,
      },
    });
  };

  return (
    <div className='header'>
      <div>
        <img className='sidebar-logo' src={logo} alt='logo' />
      </div>
      <div className='context-list'>
        <ul>
          <li
            className={
              accountType === 'DEFAULT' ? 'activeContext' : 'otherContext'
            }
          >
            <span
              className='context-item'
              onClick={() => handleAccountType('DEFAULT')}
            >
              App mode
            </span>
          </li>
          <li
            className={
              accountType === 'ADMIN' ? 'activeContext' : 'otherContext'
            }
          >
            <span
              className='context-item'
              onClick={() => handleAccountType('ADMIN')}
            >
              Admin mode
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
