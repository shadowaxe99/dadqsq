import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import CapTable from './CapTable';
import ShareholderList from './ShareholderList';
import EquityGrants from './EquityGrants';
import Settings from './Settings';
import './styles/main.css';

function Dashboard() {
  const [currentView, setCurrentView] = useState('capTable');
  const [capTableData, setCapTableData] = useState([]);
  const [shareholders, setShareholders] = useState([]);
  const [equityGrants, setEquityGrants] = useState([]);

  useEffect(() => {
    fetchCapTable();
    fetchShareholders();
    fetchEquityGrants();
  }, []);

  const fetchCapTable = async () => {
    try {
      const response = await apiService.get('/api/captable');
      setCapTableData(response.data);
    } catch (error) {
      console.error('Error fetching cap table data:', error);
    }
  };

  const fetchShareholders = async () => {
    try {
      const response = await apiService.get('/api/shareholders');
      setShareholders(response.data);
    } catch (error) {
      console.error('Error fetching shareholders:', error);
    }
  };

  const fetchEquityGrants = async () => {
    try {
      const response = await apiService.get('/api/equitygrants');
      setEquityGrants(response.data);
    } catch (error) {
      console.error('Error fetching equity grants:', error);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="dashboard-page">
      <nav>
        <ul>
          <li className={currentView === 'capTable' ? 'active' : ''} onClick={() => handleViewChange('capTable')}>Cap Table</li>
          <li className={currentView === 'shareholders' ? 'active' : ''} onClick={() => handleViewChange('shareholders')}>Shareholders</li>
          <li className={currentView === 'equityGrants' ? 'active' : ''} onClick={() => handleViewChange('equityGrants')}>Equity Grants</li>
          <li className={currentView === 'settings' ? 'active' : ''} onClick={() => handleViewChange('settings')}>Settings</li>
        </ul>
      </nav>
      <div id="dashboard-container">
        {currentView === 'capTable' && <CapTable data={capTableData} />}
        {currentView === 'shareholders' && <ShareholderList shareholders={shareholders} />}
        {currentView === 'equityGrants' && <EquityGrants equityGrants={equityGrants} />}
        {currentView === 'settings' && <Settings />}
      </div>
    </div>
  );
}

export default Dashboard;