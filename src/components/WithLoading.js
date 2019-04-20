import React from 'react';
import { loading} from '../loading.gif';

function WithLoading(Component) {
  return function WihLoadingComponent({ isLoading, isnull, ...props }) {
    if (!isLoading&&!isnull) return (<Component {...props} />);
    else if (isnull) return (<p>Enter filters and press 'Submit' to retrieve market information</p>);
    return (<p>Loading Data...</p>);
  }
}

export default WithLoading;