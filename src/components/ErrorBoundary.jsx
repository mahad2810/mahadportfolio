import React from 'react';
import FallbackVisual from './FallbackVisual';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Show the beautiful fallback visual instead of a simple error message
      return <FallbackVisual />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
