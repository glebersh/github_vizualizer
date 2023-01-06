import React from 'react';
import './ResultCard.css';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert/Alert';
import LoadingSpinner from '../LoadingSpinner';
import { Link } from 'react-router-dom';

const ResultCard = () => {
  const resultData = useSelector(state => state.searchReducer.searchData.items);
  const loadingStatus = useSelector(state => state.searchReducer.loading);
  const errorStatus = useSelector(state => state.searchReducer.error);
  const searchCategory = useSelector(state => state.searchReducer.renderedContentType);

  const errorObject = { error: true, title: 'ERROR', description: 'Checkout your response from server!' };
  const emptyDataAlert = { error: true, title: 'Oops', description: 'Nothing finded :(' };
  console.log(resultData);
  return (
    resultData.length === 0 ?
      <Alert status={emptyDataAlert} /> :
      <div className='grid mt'>
        {
          searchCategory === 'repositories' &&
          <>
            {loadingStatus && <LoadingSpinner />}
            {errorStatus && <Alert status={errorObject} />}
            {
              !loadingStatus && !errorStatus &&
              resultData?.map(
                item => (
                  <div key={item.id} className='result-card'>
                    <p className='result-card-text'>{item?.full_name}</p>
                    <p className='result-card-text'>{item?.private}</p>
                    <p className='result-card-text'>{item?.language}</p>
                    <p className='result-card-text'>{item?.stargazers_count}</p>
                  </div>
                ))
            }
          </>
        }
        {
          searchCategory === 'users' &&
          <>
            {loadingStatus && <LoadingSpinner />}
            {errorStatus && <Alert status={errorObject} />}
            {
              !loadingStatus && !errorStatus &&
              resultData?.map(
                item => (
                  <div key={item.id} className='result-card'>
                    <Link to={`user/${item.login}`} className='result-card-text'>{item?.login}</Link>
                    <img src={item?.avatar_url} className='result-card-img' />
                  </div>
                ))
            }
          </>
        }
      </div>
  )
};

export default ResultCard;