/**
*
* AudioBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Storage } from 'aws-amplify';

import Recorder from 'react-recorder';
import styled from 'styled-components';

const RowWrapper = styled.div`
`;

const RowWrapper2 = styled.div`
  margin-top: 1em;
`;

const WarningMessage = styled.div`
  padding: 1em;
  font-style: italic;
`;

class AudioBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = { command: 'none', message: ' Nauhoita ääninäyte ', audio: undefined };
    this.saveTos3 = this.saveTos3.bind(this);
    this.flipState = this.flipState.bind(this);
    this.getRecording = this.getRecording.bind(this);
    this.onMissingAPIs = this.onMissingAPIs.bind(this);
  }

  componentDidMount() {
    this.getRecording(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.forNewOrEditUser) {
      this.getRecording(nextProps.id);
    }
  }

  onMissingAPIs() {
    // console.error("missing APIs");
  }

  getRecording(id) {
    Storage.get(`audio_${id}`, { download: true })
      .then(result => {
        const blob = new Blob([new Uint8Array(result.Body)], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio();
        audio.src = url;
        this.setState({ audio });
      })
      .catch(() => {
        this.setState({ audio: undefined });
      });
  }

  saveTos3(e) {
    Storage.put(`audio_${this.props.id}`, e, { download: true })
    .then(() => this.getRecording(this.props.id));
    // .catch(err => console.error("Following error occured when saving to S3: ", err));
  }

  flipState = () => this.state.command === "start"
                    ? this.setState({ command: 'stop', message: ' Nauhoita ääninäyte ' })
                    : this.setState({ command: 'start', message: ' Lopeta nauhoitus ' });
  render() {
    return (
      <div>
        <RowWrapper>
          {this.state.audio &&
          <div>
            <Button
              onClick={() => {
                this.state.audio.load();
                this.state.audio.play();
                return 0;
              }}
            > Kuuntele ääninäyte </Button>
          </div>}

          <RowWrapper2>
            {this.props.allowEdit && (
            <div>
              <Recorder command={this.state.command} onStop={this.saveTos3} onMissingAPIs={this.onMissingAPIs} />
              <Button onClick={this.flipState}> {this.state.message} </Button>
              <WarningMessage>Nauhoittaminen ja kuuntelu ei toimi kaikilla selaimilla</WarningMessage>
            </div>)}
          </RowWrapper2>
        </RowWrapper>
      </div>
    );
  }
}

AudioBox.propTypes = {
  id: PropTypes.string,
  allowEdit: PropTypes.bool,
  forNewOrEditUser: PropTypes.bool,
};

export default AudioBox;
