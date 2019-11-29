import React from 'react';

const RoleContext = React.createContext();

const RoleProvider = ({ children, role }) => {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};

const RoleConsumer = () => <RoleContext.Consumer> </RoleContext.Consumer>;

export { RoleContext, RoleProvider, RoleConsumer };
