import React from 'react';
import './CommitInfo.css';

const CommitInfo = (props) => {
  const {
    sha,
    authorName,
    autorEmail,
    authorDate,
    committerName,
    committerEmail,
    commiterDate,
    message } = props;

  return (
    <div className='commit-info-container'>
      <span className='commit-id'>ID: {sha.slice(0, 4)}</span>

      <div className='commit-info-category'>
        <h4>Author</h4>
        <p>{authorName}</p>
        <p>{autorEmail}</p>
        <p>{authorDate.slice(0, 10)}</p>
      </div>

      <div className='commit-info-category'>
        <h4>Committer</h4>
        <p>{committerName}</p>
        <p>{committerEmail}</p>
        <p>{commiterDate.slice(0, 10)}</p>
        <p>{message}</p>
      </div>
    </div>
  )
};

export default CommitInfo;