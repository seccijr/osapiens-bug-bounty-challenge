import React, { createContext, useContext } from 'react';

import UserStore from './store';

/* 
CONTEXT / PROVIDER INIT
*/

const UserStoreContext = createContext<UserStore | null>(null);

export const StoreProvider: React.FC = (props) => {
    const { children } = props;

    return <UserStoreContext.Provider value={new UserStore()}>{children}</UserStoreContext.Provider>;
};

/* 
HOOK DEFINITION
*/
export const useUserStoreContext = () => useContext(UserStoreContext);

/*
EXPORTS
*/
export default UserStore;
