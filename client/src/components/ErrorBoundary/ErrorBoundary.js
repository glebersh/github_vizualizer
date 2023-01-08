import React, { Component } from 'react'
import Alert from '../Alert/Alert';

export default class ErrorBoundary extends Component {

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }
  render() {
    if (this.state.hasError) {
      return <Alert status={{ error: true, title: 'Something went wrong!', description: 'Try again later' }} />
    }
    return this.props.children
  };
};