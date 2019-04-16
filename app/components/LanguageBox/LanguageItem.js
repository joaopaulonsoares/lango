import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import Item from './Item';
// import Wrapper from './Wrapper';

const Wrapper = styled.div``;

function LanguageItem(props) {
  return (
    <Wrapper>
      {props.item.name}
    </Wrapper>
  );
}

LanguageItem.propTypes = {
  item: PropTypes.any,
};

export default LanguageItem;
