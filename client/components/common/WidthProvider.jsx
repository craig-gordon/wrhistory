import React from 'react';

const WidthContext = React.createContext();

const WidthProvider = ({ children }) => (
  <WidthContext.Provider value={window.widthType}>
    {children}
  </WidthContext.Provider>
);

export default WidthProvider;
