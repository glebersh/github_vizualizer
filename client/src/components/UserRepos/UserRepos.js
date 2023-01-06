import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userError, userLoading } from '../../store/selectors';
import './UserRepos.css';

const UserRepos = () => {
  const userRepos = useSelector(state => state?.userReducer?.userRepos);
  const loadingStatus = useSelector(userLoading);
  const errorStatus = useSelector(userError);


  return (
    !loadingStatus && !errorStatus ?
      <div>
        <h2>List of repositories</h2>
        {userRepos?.map(item =>
        (
          <div key={item?.id} className='repo-card'>

            <span>{item?.name}</span>
            <span>Language: {item?.language}</span>
            <span>{item?.visibility === 'public' ? 'Public' : 'Private'}</span>
            <span>License: {item?.license?.name}</span>
            <span>{item?.allow_forking ? 'Forking allowed' : 'Forking not allowed'}</span>

            <div>
              <p>Created {item?.updated_at.slice(0, 10)}</p>
            </div>
            <p>Clone repostiroty {item?.clone_url}</p>

            <div>
              {
                item?.topics !== [] ?
                  <ul>
                    {item?.topics?.map(topic => (<li>{topic}</li>))}
                  </ul>
                  : null
              }
            </div>
            <Link to={`repo/${item?.name}`}>Watch latest commits</Link>
          </div>
        )
        )}
      </div> : null
  )
};

export default UserRepos;