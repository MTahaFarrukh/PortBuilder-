import React, { createContext, useContext, useState } from 'react';

interface TabsContextProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const Tabs: React.FC<{
  children: React.ReactNode;
  activeTab?: number;
  onChange?: (index: number) => void;
}> = ({ children, activeTab = 0, onChange }) => {
  const [active, setActive] = useState(activeTab);

  const handleChange = (index: number) => {
    setActive(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <TabsContext.Provider
      value={{
        activeTab: onChange ? activeTab : active,
        setActiveTab: handleChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div role="tablist" className={`flex ${className}`}>
      {children}
    </div>
  );
};

export const Tab: React.FC<{
  children: React.ReactNode;
  className?: string;
  index: number;
}> = ({ children, className = '', index }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;

  return (
    <button
      role="tab"
      aria-selected={activeTab === index}
      className={className}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<{
  children: React.ReactNode;
  className?: string;
  index: number;
}> = ({ children, className = '', index }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;

  if (activeTab !== index) return null;

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
};