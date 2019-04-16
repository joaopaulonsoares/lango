/**
 *
 * ProfilePicture
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Storage } from 'aws-amplify';
import Image from 'react-graceful-image';

export class ProfilePicture extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = { picURL: "" };
    this.updatePicture = this.updatePicture.bind(this);
  }

  componentDidMount() {
    this.updatePicture(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.updatePicture(nextProps.id);
  }

  updatePicture(id) {
    Storage.get(`picture_${id}`, { download: true })
    .then(result => {
      const blob = new Blob([new Uint8Array(result.Body)], { type: 'image/jpeg' });
      this.setState({ picURL: URL.createObjectURL(blob) });
    })
    .catch(() => {
      this.setState({ picURL: '/icon-512x512.png' });
    }
    );
  }

  render() {
    return (
      <div>
        <Image
          alt="profilepicture"
          src={this.state.picURL}
          style={{ borderRadius: '50%', boxShadow: '0 3px 3px 0 rgba(0,0,0,0.3)', margin: '0 0 0 0' }}
          width="110"
          height="110"
        />
      </div>
    );
  }
}

ProfilePicture.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(ProfilePicture);
