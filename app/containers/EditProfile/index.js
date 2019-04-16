/**
 *
 * EditProfile
 *
 *  The userProfile store is automatically modified when the input boxes are changed
 *  Changes only get applied when the save button is pressed
 */

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import EditContactMethods from 'containers/EditContactMethods';
import ProfilePicture from 'containers/ProfilePicture';

import GenderCheckbox from 'components/GenderCheckbox/Loadable';

import EditProfileSection, {
  EditProfileSectionWhite,
} from 'components/EditProfileSection';
import EditLocation from 'components/EditLocation/Loadable';
import EditProfileEmail from 'components/EditProfileEmail/Loadable';
import EditProfileTitle from 'components/EditProfileTitle/Loadable';
import EditBio from 'components/EditBio/Loadable';

import EditLanguages from 'components/EditLanguages/Loadable';
import EditAudio from 'components/EditAudio/Loadable';

import SaveProfileButton from 'components/SaveProfileButton/Loadable';
import DeleteProfileButton from 'components/DeleteProfileButton/Loadable';

import RequiredAsterisk from 'components/RequiredAsterisk';


import { makeSelectUserData } from 'containers/App/selectors';
import { makeSelectUserDataChanges } from './selectors';

import {
  changeFirstName,
  changeSecondName,
  changeEmail,
  changeGender,
  changeLocation,
  saveUser,
  deleteUser,
  changeLanguages,
  changeDescription,
  changeContactMethods,
} from './actions';

import reducer from './reducer';
import saga from './saga';

import FormField from './FormField';

// A hackish way to fix expanding of outside the app container to get the background and the border to take the whole page width
const EditProfilePage = styled.div`
  margin: -10px -25px;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
`;

const NameAndBirthdayBox = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const ProfilePictureWrapper = styled.div`
  margin-bottom: 1rem;
`;

export class EditProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = { deletingInProgress: false };

    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    if (!this.props.userData.id) {
      this.props.logIn();
    }
  }

  onSubmit = event => {
    event.preventDefault();
    this.form.reportValidity();
    if (this.form.checkValidity()) {
      this.props.onSaveUser();
      return true;
    }

    return false;
  }

  onDelete() {
    this.setState({ deletingInProgress: true });
    this.props.onDeleteUser();
  }

  setFormElement(element) {
    this.form = element;
  }

  render() {
    const userData = _.merge(this.props.userData, this.props.editedUserData);
    return (
      <EditProfilePage>
        <Helmet>
          <title>EditProfile</title>
          <meta name="description" content="" />
        </Helmet>

        <form ref={e => this.setFormElement(e)} onSubmit={e => e.preventDefault()}>
          <EditProfileSection>
            <RowWrapper>
              <ProfilePictureWrapper>
                <ProfilePicture id={userData.id} />
              </ProfilePictureWrapper>
              <NameAndBirthdayBox>
                <EditProfileTitle
                  value={userData.firstName ? userData.firstName : ""}
                  onChange={this.props.onChangeFirstName}
                />
              </NameAndBirthdayBox>
            </RowWrapper>
            <EditProfileEmail
              value={userData.email ? userData.email : ""}
              onChange={this.props.onChangeEmail}
            />
            <FormField>
              <GenderCheckbox
                gender={userData.gender ? userData.gender : ""}
                onClick={this.props.onChangeGender}
              />
            </FormField>
          </EditProfileSection>
          <EditProfileSectionWhite>
            <FormField>
              <EditLocation
                location={userData.location ? userData.location : ""}
                onSelect={this.props.onChangeLocation}
              />
            </FormField>
          </EditProfileSectionWhite>
          <EditProfileSection>
            <FormField>
              <EditBio
                description={userData.description ? userData.description : ""}
                onChange={this.props.onChangeDescription}
              />
            </FormField>
            <FormField>
              <EditAudio id={userData.id} />
            </FormField>
          </EditProfileSection>
          <EditProfileSectionWhite>
            <EditLanguages
              spoken={userData.spoken ? userData.spoken : []}
              learning={userData.learning ? userData.learning : []}
              onChange={this.props.onChangeLanguages}
            />
          </EditProfileSectionWhite>
          <EditProfileSection>
            <FormField>
              <EditContactMethods
                onEdit={this.props.onChangeContactMethods}
                contactMethods={userData.contactMethods}
              />
            </FormField>
            <small><RequiredAsterisk /> merkityt kentät ovat pakollisia kenttiä</small>
            <SaveProfileButton type="submit" onClick={this.onSubmit} />
            <DeleteProfileButton
              onDeleteUser={this.onDelete}
              deletingInProgress={this.state.deletingInProgress}
            />
          </EditProfileSection>
        </form>
      </EditProfilePage>
    );
  }
}

EditProfile.propTypes = {
  userData: PropTypes.object.isRequired,
  editedUserData: PropTypes.object,
  onChangeFirstName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangeGender: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onSaveUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onChangeLocation: PropTypes.func.isRequired,
  onChangeLanguages: PropTypes.func.isRequired,
  onChangeContactMethods: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  editedUserData: makeSelectUserDataChanges(),
});

function mapDispatchToProps(dispatch) {
  return {
    logIn: () => dispatch({ type: 'LOG_IN' }),
    onSaveUser: () => dispatch(saveUser()),
    onDeleteUser: () =>
      dispatch(deleteUser()),
    onChangeFirstName: evt => dispatch(changeFirstName(evt.target.value)),
    onChangeSecondName: evt => dispatch(changeSecondName(evt.target.value)),
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangeGender: evt => dispatch(changeGender(evt.target.id)),
    onChangeDescription: evt => dispatch(changeDescription(evt.target.value)),
    onChangeLocation: evt => dispatch(changeLocation(evt.target.value)),
    onChangeLanguages: languages => dispatch(changeLanguages(languages)),
    onChangeContactMethods: contactMethods =>
      dispatch(changeContactMethods(contactMethods)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "editProfile", reducer });
const withSaga = injectSaga({ key: "editProfile", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(EditProfile);
