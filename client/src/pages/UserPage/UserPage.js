import { Alert } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserGeneral from '../../components/UserGeneral';
import UserRepos from '../../components/UserRepos';
import { userError, userLoading, userSelector } from '../../store/selectors';
import { getUser, getUserRepos } from '../../store/slices/userSlice';

const UserPage = () => {
  const userLogin = useParams();
  const dispatch = useDispatch();

  const loadingStatus = useSelector(state => state.userReducer.loading);
  const errorStatus = useSelector(state => state.userReducer.error);

  const errorObject = {
    error: true, title: 'ERROR',
    description: 'Checkout your response from server!'
  }

  useEffect(() => {
    dispatch(getUser(userLogin));
    dispatch(getUserRepos(userLogin));
  }, [userLogin]);

  return (
    <>
      {loadingStatus && <LoadingSpinner />}
      {errorStatus && <Alert status={errorObject} />}

      {
        (errorStatus === false && loadingStatus === false) ?
          <>
            <UserGeneral />
            <UserRepos />
          </>
          : null
      }
    </>
  )
};

export default UserPage;