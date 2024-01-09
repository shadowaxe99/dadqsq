import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import './styles/CapTable.css';

const CapTable = () => {
  const [capTableData, setCapTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCapTable = async () => {
      try {
        const response = await apiService.get('/api/captable');
        setCapTableData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCapTable();
  }, []);

  if (loading) return <div>Loading cap table...</div>;
  if (error) return <div>Error loading cap table: {error}</div>;

  return (
    <div className="cap-table-container">
      <h1>Cap Table</h1>
      <table className="cap-table">
        <thead>
          <tr>
            <th>Shareholder</th>
            <th>Shares Owned</th>
            <th>Percentage Ownership</th>
          </tr>
        </thead>
        <tbody>
          {capTableData.map((shareholder) => (
            <tr key={shareholder._id}>
              <td>{shareholder.name}</td>
              <td>{shareholder.sharesOwned}</td>
              <td>{(shareholder.sharesOwned / capTableData.totalShares * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapTable;