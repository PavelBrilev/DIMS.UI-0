import React from 'react';

const ThemeContext = React.createContext();

const ThemeProvider = ({ children, color }) => {
  return (
    <ThemeContext.Provider value={color}>{children}</ThemeContext.Provider>
  );
};

const ThemeConsumer = () => <ThemeContext.Consumer> </ThemeContext.Consumer>;

export { ThemeContext, ThemeProvider, ThemeConsumer };
