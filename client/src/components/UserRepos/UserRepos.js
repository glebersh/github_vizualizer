import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userError, userLoading, userSelector } from '../../store/selectors';
import './UserRepos.css';

const UserRepos = () => {
  const userRepos = useSelector(state => state?.userReducer?.userRepos);
  const loadingStatus = useSelector(userLoading);
  const errorStatus = useSelector(userError);
  const [copiedRepoLink, setRepoLink] = useState('');

  const gitLinkRef = useRef([]);
  const linkRegexp = /https:\/\/.+\.git/gmi;

  const copyToClipboard = (index, url) => {
    navigator.clipboard.writeText(url)
      .then(() => setRepoLink(url))
      .catch(err => {
        gitLinkRef[index].textContent = `Something went wrong ${err}`;
      });
  };

  return (
    (!loadingStatus && !errorStatus) ?
      <div>
        {userRepos?.map((item, index) =>
        (
          <div key={item?.id} className='repo-card'>

            <span className='repo-tag'>{item?.name}</span>
            <span className='repo-tag'>Language: {item?.language}</span>
            <span className='repo-tag'>{item?.visibility === 'public' ? 'Public' : 'Private'}</span>
            <span className='repo-tag'>License: {item?.license?.name}</span>
            <span className='repo-tag'>{item?.allow_forking ? 'Forking allowed' : 'Forking not allowed'}</span>

            <div>
              <p>Created {item?.updated_at.slice(0, 10)}</p>
            </div>
            <p>Clone repostiroty {item?.clone_url}
              <i className={copiedRepoLink === gitLinkRef[index]?.parentNode?.textContent.match(linkRegexp)[0]
                ? 'bi bi-clipboard-check' : 'bi bi-clipboard'}

                ref={(item) => gitLinkRef[index] = item}
                onClick={() => copyToClipboard(index, item.clone_url)}>
              </i>
              <span>{copiedRepoLink === gitLinkRef[index]?.parentNode?.textContent.match(linkRegexp)[0]
                ? 'Copied!' : 'Copy to clipboard'}</span>
            </p>

            <div>
              {
                item?.topics !== [] ?
                  <ul className='default-list'>
                    {item?.topics?.map(topic => (<li key={topic}>{topic}</li>))}
                  </ul>
                  : null
              }
            </div>
            <Link to={`repo/${item?.name}`} className='repo-link'>Watch latest commits</Link>
          </div>
        )
        )}
      </div> : null
  )
};

export default UserRepos;