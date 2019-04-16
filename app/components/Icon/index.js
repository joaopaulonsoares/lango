/**
*
* Icon
*
*/

import React from 'react';
// import styled from 'styled-components';

import PropTypes from 'prop-types';

const IconManual = (props) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
      overflow: 'visible',
    },
    path: {
      fill: props.color,
    },
  };

  return (
    <svg
      style={styles.svg}
      width={`${props.height}`}
      height={`${props.width}`}
      viewBox="0 0 36 28"
    >
      <path
        style={styles.path}
        d={props.icon}
      ></path>
    </svg>
  );
};

IconManual.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

IconManual.defaultProps = {
  height: '100%',
  width: '100%',
};

export default IconManual;
