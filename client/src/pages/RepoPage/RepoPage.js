import Alert from '../../components/Alert';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CommitInfo from '../../components/CommitInfo/CommitInfo';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner';
import { initializeRepos, getBranchCommits, setBranches, setCurrentBranch } from '../../store/slices/repoSlice';
import './RepoPage.css';
import * as d3 from 'd3';
import isEmpty from 'lodash.isempty';

const RepoPage = () => {
  const repoInfo = useParams();
  const dispatch = useDispatch();
  const [currentBranchIndex, setCurrentBranchIndex] = useState(1);

  const errorObject = { error: true, title: 'ERROR', description: 'Checkout your response from server!' };

  const branches = useSelector(state => state.repoReducer.branches);
  const loadingStatus = useSelector(state => state.repoReducer.loading);
  const errorStatus = useSelector(state => state.repoReducer.error);
  const currentBranch = useSelector(state => state.repoReducer.currentBranch);

  const createGraphTree = () => {
    let graphData = {};

    if (branches.length && currentBranch.length) {
      const repositoryName = repoInfo?.repoName;
      const branch = branches[currentBranchIndex - 1];
      graphData = {
        repositoryName: repositoryName,
        "children": [
          {
            branchName: branch.name,
            children: currentBranch.map(item => item.sha.slice(0, 4))
          }]
      }
    }
    return graphData;
  };

  function dGraph(element) {
    const data = createGraphTree();
    if (element?.innerHTML == false && !isEmpty(data)) {
      const width = window.innerWidth * 0.7;
      const height = 400

      // append the svg object to the body of the page
      const svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(40,0)");  // bit of margin on the left = 40

      // Create the cluster layout:
      const cluster = d3.cluster()
        .size([height, width - 100]);  // 100 is the margin I will have on the right side

      // Give the data to this cluster layout:
      const root = d3.hierarchy(data, function (d) {
        return d.children;
      });
      cluster(root);

      // Add the links between nodes:
      svg.selectAll('path')
        .data(root.descendants().slice(1))
        .join('path')
        .attr("d", function (d) {
          return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 50) + "," + d.x
            + " " + (d.parent.y + 150) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
            + " " + d.parent.y + "," + d.parent.x;
        })
        .style("fill", 'none')
        .attr("stroke", '#aaa')

      // Add a circle for each node.
      svg.selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", function (d) {
          return `translate(${d.y},${d.x})`
        })
        .append("circle")
        .attr("r", 10)
        .style("fill", "var(--accent-color)")
        .attr("stroke", "#6F6F6F")
        .style("stroke-width", 3)
    }
  };


  useEffect(() => {
    if (branches.length === 0) {
      dispatch(initializeRepos(repoInfo));
    }

    if (currentBranch.length !== 0) {
      dispatch(getBranchCommits({ repoInfo, currentBranchIndex }));
    }

  }, [currentBranchIndex]);


  return (
    <ErrorBoundary>
      {errorStatus && <Alert status={errorObject} />}
      {loadingStatus && <LoadingSpinner />}

      {
        errorStatus === false && loadingStatus === false ?
          <>
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
            </div>
            <div ref={(element) => dGraph(element)}
              id='graph-container'></div>
          </>
          : null
      }
    </ErrorBoundary >
  )
};

export default RepoPage;