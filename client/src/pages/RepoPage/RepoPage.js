import Alert from '../../components/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommitInfo from '../../components/CommitInfo/CommitInfo';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner';
import { initializeRepos, getBranchCommits } from '../../store/slices/repoSlice';
import './RepoPage.css';

const RepoPage = () => {
  const repoInfo = useParams();
  const dispatch = useDispatch();
  const [currentBranchIndex, setCurrentBranchIndex] = useState(1);

  const errorObject = { error: true, title: 'ERROR', description: 'Checkout your response from server!' };

  const branches = useSelector(state => state.repoReducer.branches);
  const loadingStatus = useSelector(state => state.repoReducer.loading);
  const errorStatus = useSelector(state => state.repoReducer.error);
  const currentBranch = useSelector(state => state.repoReducer.currentBranch);

  useEffect(() => {
    dispatch(initializeRepos(repoInfo));
  }, []);

  return (
    <ErrorBoundary>
      {errorStatus && <Alert status={errorObject} />}
      {loadingStatus && <LoadingSpinner />}

      {
        errorStatus === false && loadingStatus === false ?
          <div className='flex'>
            <i className={currentBranchIndex === 1 ? 'bi bi-caret-left-fill disabled' : 'bi bi-caret-left-fill'}
              onClick={() => setCurrentBranchIndex(currentBranchIndex - 1)}
            ></i>
            <div className='branch-card'>
              <h3>Branch {currentBranchIndex} / {branches.length}</h3>
              <h3>Branch name: {branches[currentBranchIndex - 1]?.name}</h3>
              {currentBranch?.map(item => {
                return (
                  <CommitInfo
                    key={item?.sha}
                    sha={item?.sha}
                    authorName={item?.commit?.author?.name}
                    autorEmail={item?.commit?.author?.email}
                    authorDate={item?.commit?.author?.date}
                    committerName={item?.commit?.committer?.name}
                    committerEmail={item?.commit?.committer?.email}
                    commiterDate={item?.commit?.committer?.date}
                    message={item?.commit?.message}
                  />
                )
              })}
            </div>
            <i className={currentBranchIndex === branches.length ? 'bi bi-caret-right-fill disabled' : 'bi bi-caret-right-fill'}
              onClick={() => setCurrentBranchIndex(currentBranchIndex + 1)}
            ></i>
          </div> : null
      }
    </ErrorBoundary>
  )
};

export default RepoPage;