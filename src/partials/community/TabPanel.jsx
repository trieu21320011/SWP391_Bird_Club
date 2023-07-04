import React, { useState } from 'react';

const TabPanel = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-buttons space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(index)}
          >
            <div class={"whitespace-nowrap py-4 px-1 font-medium text-sm text-teal-600 focus:outline-none " + (index === activeTab ? 'border-b-2 border-teal-600 ' : '')}>
              {tab.title}
            </div>
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
export default TabPanel;