/**
*
* LanguageBox
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// import ListItem from 'components/ListItem';
// import List from 'components/List';
// import LanguageItem from './LanguageItem';

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const RowWrapper2 = styled.div`
  margin: 1em;
`;

const LanguageColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5em;
`;

const HorizontalDivider = styled.div`
  height: 2px;
  background: linear-gradient(to right, #ffffff 0%, #DADAD6 50%, #FFFFFF 100%);
  width: 100%;
`;

const StyledH4 = styled.h4`
  margin: 0;
`;

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

class LanguageBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const ListLanguages = ({ languages }) => (
      <StyledUl>
        {languages ? languages.map(language => <li key={Math.random()} >{language !== 'EMPTY' && language} </li>) : 'Error'}
      </StyledUl>
  );

    return (
      <div>
        <RowWrapper>
          <HorizontalDivider />
        </RowWrapper>
        <RowWrapper>
          <RowWrapper2>
            <StyledH4> Haluan oppia </StyledH4>
            <LanguageColumnWrapper>
              {this.props.learning !== null && <ListLanguages languages={this.props.learning} />}
            </LanguageColumnWrapper>
          </RowWrapper2>
          <RowWrapper2>
            <StyledH4> Osaan puhua </StyledH4>
            <LanguageColumnWrapper>
              {this.props.spoken !== null && <ListLanguages languages={this.props.spoken} /> }
            </LanguageColumnWrapper>
          </RowWrapper2>
        </RowWrapper>
        <RowWrapper>
          <HorizontalDivider />
        </RowWrapper>
      </div>
    );
  }
}

LanguageBox.propTypes = {
  spoken: PropTypes.any,
  learning: PropTypes.any,
};

export default LanguageBox;
