/**
*
* EditAudio
*
*/

import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import AudioBox from 'components/AudioBox/Loadable';

const Wrapper = styled.div`
  padding: 1rem 0;
`;

class EditAudio extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <AudioBox allowEdit id={this.props.id} forNewOrEditUser />
      </Wrapper>
    );
  }
}

EditAudio.propTypes = {
  id: propTypes.string,
};

export default EditAudio;
