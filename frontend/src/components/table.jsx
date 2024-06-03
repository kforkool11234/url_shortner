import React, { useState, useEffect } from "react";
import axios from "axios";

function Table() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          "https://url-shortner-opxv.onrender.com/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData1(response.data.shurl1);
        setData2(response.data.shurl2);
      } catch (err) {
        setError('no data to fetch');
        console.log("Error", err);
      }
    };

    fetchData();
  }, []);

  async function scam(e) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://url-shortner-opxv.onrender.com/scam/${e.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("scam reported");
    }
  }

  async function del(e) {
    const token = localStorage.getItem('token');
    await axios.get(`https://url-shortner-opxv.onrender.com/del/${e.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((item) => (
            <tr key={item._id}>
              <td>
                <a target="_blank" href={item.full} rel="noopener noreferrer" style={{ color: item.scam > 10 ? "red" : null }}>
                  {item.full}
                </a>
              </td>
              <td>
                <a target="_blank" rel="noopener noreferrer" href={`https://url-shortner-opxv.onrender.com/${item.short}`} style={{ color: item.scam > 10 ? "red" : null }}>
                  {item.short}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoggedIn ? (
        data2.length === 0 ? (
          <p>Nothing to show</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data2.map((item) => (
                <tr key={item._id}>
                  <td>
                    <a target="_blank" href={item.full} rel="noopener noreferrer">
                      {item.full}
                    </a>
                  </td>
                  <td>
                    <a target="_blank" rel="noopener noreferrer" href={`https://url-shortner-opxv.onrender.com/${item.short}`}>
                      {item.short}
                    </a>
                  </td>
                  <td>{item.clicks}</td>
                  <td>
                    <button value={item._id} onClick={del}>delete</button>
                  </td>
                  <td>
                    <button value={item.short} onClick={scam} disabled={item.report}>report scam</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <p>Login to see permanent links</p>
      )}
    </div>
  );
}

export default Table;
