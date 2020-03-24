import React from 'react';
import { Spinner } from 'reactstrap';

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, isnull, ...props }) {
    if (!isLoading&&!isnull) return (<Component {...props} />);
    else if (isnull) return (<p>Enter filters and press 'Submit' to retrieve information</p>);
    return (
      <div>
        <p>Loading Data... </p>
        <Spinner color="primary"/>
      </div>
    
    );
  }
}

export default WithLoading;