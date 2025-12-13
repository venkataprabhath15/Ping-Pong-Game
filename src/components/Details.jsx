import React, { useEffect, useState } from 'react';

const Details = (props) => {
  const [name, setName] = useState('Prabhath');

  useEffect(() => {
    if (name === 'Prabhath1') {
      setName('keertan');
    } else {
      setName('Bobs');
    }
  }, []); // runs only once

  return (
    <div>
      <div>{props.name}</div>
      <div>{props.age}</div>
      <div>{props.occupation}</div>

      <button onClick={() => setName('Prabhath1')}>Change Name</button>
      <button onClick={() => setName('Prabhath2')}>Change Name</button>

      <div>My name is {name}</div>
    </div>
  );
};

export default Details;
