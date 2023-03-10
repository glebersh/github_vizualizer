import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../store/slices/authSlice';
import './AccountInfo.css';


const AccountInfo = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducer.user);
  const { login, avatar_url, name } = currentUser;

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className='flex account-info-container'>
      <div className='flex flex-col'>
        <span className='user-info-text'>{name}</span>
        <Link to={`user/${login}`} className='user-info-text'>{login}</Link>
      </div>
      <img src={avatar_url} className='user-avatar' />
    </div >
  )
};

export default AccountInfo;