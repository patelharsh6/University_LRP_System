// src/components/Layout/Sidebar.jsx
import React from 'react';
import './Layout.css';
import { menuConfig } from './menuConfig';

const Sidebar = ({ isOpen, userRole, toggleSidebar }) => {
  const menus = menuConfig[userRole];

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        ADANI ERP
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu">
        {menus.map((group, index) => (
          <div key={index}>
            {/* Category Label (e.g. ACADEMICS) */}
            <div className="menu-category">{group.category}</div>
            
            {/* Items in that category */}
            {group.items.map((item, idx) => (
              <a 
                href={item.path} 
                className={`menu-item ${idx === 0 && index === 0 ? 'active' : ''}`} // Demo active state
                key={idx}
                onClick={toggleSidebar} // Close on mobile when clicked
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
