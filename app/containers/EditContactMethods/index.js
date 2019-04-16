/**
 *
 * EditContactMethods
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CheckBox from "components/CheckBox";
import Title from "components/Title";

import { makeSelectContactMethods } from 'containers/App/selectors';
import { changeContactMethods } from 'containers/EditProfile/actions';

import styled from 'styled-components';

import { strMapToObj, objToStrMap } from 'utils/utilFuncs';

import injectReducer from 'utils/injectReducer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import checkboxes from './checkboxes';
import reducer from './reducer';

const IconsWrapper = styled.div`
  margin: 2rem 0;
`;

const IconAndCheckBoxWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  color: #000;
  margin-right: .4rem;
`;

const CheckBoxWrapper = styled.div`
  flex: 1;
`;

export class EditContactMethods extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    library.add(fab, fas);

    if (this.props.contactMethods === null || this.props.contactMethods) {
      this.state = {
        checkedItems: new Map(),
      };
    }
    this.state = {
      checkedItems: objToStrMap(this.props.contactMethods),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.contactMethods === null || newProps.contactMethods) {
      this.setState({
        checkedItems: new Map(),
      });
    }
    this.setState({
      checkedItems: objToStrMap(newProps.contactMethods),
    });
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => {
      const newCheckedItems = prevState.checkedItems.set(item, isChecked);
      this.props.dispatch(changeContactMethods(strMapToObj(newCheckedItems)));
      if (this.props.onEdit) { this.props.onEdit(strMapToObj(newCheckedItems)); }
      return { checkedItems: newCheckedItems };
    });
  }

  render() {
    return (
      <div>
        <Title>Yhteydenottotavat</Title>
        <IconsWrapper>
          {
          checkboxes.map(item => (
            <IconAndCheckBoxWrapper key={item.key}>
              {
                <IconWrapper>
                  <FontAwesomeIcon icon={item.icon} size="2x" />
                </IconWrapper>
              }
              <CheckBoxWrapper>
                <CheckBox
                  name={item.name}
                  checked={this.state.checkedItems.get(item.name)}
                  label={item.name}
                  onChange={this.handleChange}
                />
              </CheckBoxWrapper>
            </IconAndCheckBoxWrapper>
          ))
        }
        </IconsWrapper>
      </div>
    );
  }
}

EditContactMethods.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contactMethods: PropTypes.object,
  onEdit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  contactMethods: makeSelectContactMethods(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editContactMethods', reducer });

export default compose(
  withReducer,
  withConnect,
)(EditContactMethods);
