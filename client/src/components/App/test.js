import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const TestComp = () => {
  const _token = useSelector(state => state.authReducer);

  useEffect(() => {
    fetch('https://api.github.com/repos/glebersh/countries_wiki/branches', {
      method: 'GET',
      headers: {
        'Authorization': _token,
      }
    }).then(result => result.json())
      .then(log => console.log(log));
  });

  return (
    <div>
      <h1>Data</h1>
    </div>
  )
};

export default TestComp;