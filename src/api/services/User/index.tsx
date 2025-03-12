import React, { createContext, useContext } from 'react';

import User from './store';

/* 
CONTEXT / PROVIDER INIT
*/

const UserStoreContext = createContext<User | null>(null);

export const StoreProvider: React.FC = (props) => {
    const { children } = props;

    return <UserStoreContext.Provider value={new User()}>{children}</UserStoreContext.Provider>;
};

/* 
HOOK DEFINITION
*/

export const useUserStore = () => useContext(UserStoreContext);

/*
EXPORTS
*/

export default User;
