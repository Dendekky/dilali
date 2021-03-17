import React from 'react';

const DefaultAccountTypePayload = {
  accountType: 'DEFAULT',
} as const;

type AdminAccountTypePayload = {
  accountType: 'ADMIN';
};

type Action = {
  type: 'setAccountType';
  payload: typeof DefaultAccountTypePayload | AdminAccountTypePayload;
};

export type AccountType = 'DEFAULT' | 'ADMIN';
export type AccountDispatch = (action: Action) => void;
export type AccountState = {
  accountType: AccountType;
};

export const AccountStateContext = React.createContext<
  AccountState | undefined
>(undefined);
export const AccountDispatchContext = React.createContext<
  AccountDispatch | undefined
>(undefined);

export type AccountContextType = {
  accountType: AccountType;
};

const AccountTypeReducer = (state: AccountState, action: Action) => {
  const { accountType } = action.payload;
  switch (action.type) {
    case 'setAccountType':
      localStorage.setItem(
        'accountContext',
          JSON.stringify(accountType),
      );

      return {
        ...state,
        accountType: action.payload.accountType
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AccountContextProvider: React.FC = ({ children }) => {
  let accountContext = localStorage.getItem('accountContext');

  const [state, dispatch] = React.useReducer(
    AccountTypeReducer,
    accountContext ? JSON.parse(accountContext) : DefaultAccountTypePayload
  );

  return (
    <AccountStateContext.Provider value={state}>
      <AccountDispatchContext.Provider value={dispatch}>
        {children}
      </AccountDispatchContext.Provider>
    </AccountStateContext.Provider>
  );
};

type ContextConsumerProps = {
  children: (
    state: AccountState,
    dispatch: AccountDispatch
  ) => React.ReactElement;
};

const AccountContextConsumer: React.FC<ContextConsumerProps> = ({
  children,
}) => {
  return (
    <AccountStateContext.Consumer>
      {state => {
        if (state === undefined) {
          throw new Error(
            'AccountStateConsumer must be used within a AccountStateContextProvider'
          );
        }
        return (
          <AccountDispatchContext.Consumer>
            {dispatch => {
              if (dispatch === undefined) {
                throw new Error(
                  'AccountDispatchConsumer must be used within a AccountDispatchContextProvider'
                );
              }
              return children?.(state, dispatch);
            }}
          </AccountDispatchContext.Consumer>
        );
      }}
    </AccountStateContext.Consumer>
  );
};

const useAccountState = () => {
  const context = React.useContext(AccountStateContext);

  if (context === undefined) {
    throw new Error(
      'Account state context must be used within an AccountState Provider'
    );
  }

  return context;
};

const useAccountDispatch = () => {
  const context = React.useContext(AccountDispatchContext);

  if (context === undefined) {
    throw new Error(
      'Account state context must be used within an AccountDispatch Provider'
    );
  }

  return context;
};

export {
  useAccountState,
  useAccountDispatch,
  AccountContextConsumer,
  AccountContextProvider,
};
