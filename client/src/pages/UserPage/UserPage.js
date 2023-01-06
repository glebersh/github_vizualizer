import { Alert } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { userError, userLoading } from '../../store/selectors';
import { getUser } from '../../store/slices/userSlice';

const UserPage = () => {
  const userLogin = useParams();
  const dispatch = useDispatch();

  const loadingStatus = useSelector(userLoading);
  const errorStatus = useSelector(userError);

  const errorObject = {
    error: true, title: 'ERROR',
    description: 'Checkout your response from server!'
  }

  useEffect(() => {
    dispatch(getUser(userLogin));
  }, [userLogin]);

  return (
    <>
      {loadingStatus && <LoadingSpinner />}
      {errorStatus && <Alert status={errorObject} />}
      {
        !errorStatus && !loadingStatus &&
        <>
        </>
      }
    </>
  )
};

export default UserPage;