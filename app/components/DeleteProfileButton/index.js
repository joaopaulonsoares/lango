/**
*
* DeleteProfileButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Rodal from 'rodal';

import 'rodal/lib/rodal.css';

const PulseLoader = require('halogen/PulseLoader');

const DeleteButton = styled.button`
  height: 60px;
  color: grey;
  border: 2px solid grey;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.15);
  width:100%;
`;

const DeleteModalWrapper = styled.div``;

const Title = styled.p`
  font-weight: bold;
`;

const Description = styled.p`
  margin-top: 3vh;
`;

const ButtonBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #F9F9F9;
  min-height: 10vh;
`;

const CancelButton = styled.button`
  margin: 1vh;
  position: absolute;
  top: 3vh;
  opacity: 0.4;
  color: #000000;
  font-weight: bold;
  font-family: "Open Sans";
  font-size: 16px;
`;

const AcceptButton = styled.button`
  width: 120px;
  height: 40px;
  color: white;
  font-weight: bold;
  background-color: #FA423B;
  border-radius: 8px;
  position: absolute;
  right: 5vw;
  top: 3vh;
`;

class DeleteProfileButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show(e) {
    e.preventDefault();
    this.setState({ visible: true });
  }

  hide(e) {
    e.preventDefault();
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        {this.props.deletingInProgress ?
          (<DeleteButton onClick={this.show} > <PulseLoader size={'30'} color={"grey"} /> </DeleteButton>) :
          (<DeleteButton onClick={this.show} > Profiilin poistaminen </DeleteButton>) }
        <Rodal
          width={300}
          height={300}
          visible={this.state.visible}
          onClose={this.hide}
          showCloseButton={false}
        >
          <DeleteModalWrapper>
            <Title> Profiilin poistaminen </Title>
            <Description>
              Poistat kaikki profiilitietosi mukaan lukien yhteydet ja kavereidesi lähettämät viestit.
            </Description>
            <ButtonBar>
              <CancelButton onClick={this.hide}> Peruuta </CancelButton>
              <AcceptButton onClick={this.props.onDeleteUser}> Jatka </AcceptButton>
            </ButtonBar>
          </DeleteModalWrapper>
        </Rodal>
      </div>
    );
  }
}

DeleteProfileButton.propTypes = {
  onDeleteUser: PropTypes.func.isRequired,
  deletingInProgress: PropTypes.bool,
};

export default DeleteProfileButton;
