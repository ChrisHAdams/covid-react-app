import React from 'react';

import '../css/page-layout.css';

function PageLayout(props) {
  return (
    <div className="flex-grid-container">

      <div className="flex-grid-body">

        <div className="flex-grid-content">
          {props.children}
        </div>

        <div className="flex-grid-left">

        </div>

        <div className="flex-grid-right">

        </div>

      </div>

    </div>
  );
}

export default PageLayout;
