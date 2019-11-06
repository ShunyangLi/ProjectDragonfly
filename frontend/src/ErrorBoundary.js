import React from 'react';

class ErrorBoundary extends React.Component {
  state = { errorCount: 0 };
  //constructor(props) {
  //  super(props);
  //   this.state = { hasError: false };
 // }
  //static getDerivedStateFromError(error) {
  //  // Update state so the next render will show the fallback UI.
  //  return { hasError: true };
  //}
  componentDidCatch(){
    this.setState((state) => ({ errorCount: state.errorCount + 1 }))
  }
  render() {
    //if (this.state.hasError) {
    //
    //}
    return (
        <React.Fragment key={this.state.errorCount}>
            {this.props.children}
        </React.Fragment>
    )
  }
}

export default ErrorBoundary;
