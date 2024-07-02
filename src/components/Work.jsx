import React, { useEffect, useState } from 'react';
import { dataRef } from './Firebases';
import "../Styles/Work.css";

function Work() {
  const [allValue, setAllValue] = useState([]);

  useEffect(() => {
    dataRef.ref().child("all").on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const getData = Object.values(data).reverse(); // Reverse to get recent jobs first
        setAllValue(getData);
      }
    });
  }, []);

  return (
    <div className="work-container">
      
      <div className="all-data">
      
        {allValue.length > 0 ? (
          allValue.map((item, index) => (
            <div key={index} className="data-item">
              <h3>{item.title}</h3>
              <p><strong>Skills:</strong> {item.skills}</p>
              <p><strong>Period:</strong> {item.period}</p>
              <p><strong>Stipend:</strong> {item.stipend}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <button type="button" className="apply-btn">Apply Now</button>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Work;
