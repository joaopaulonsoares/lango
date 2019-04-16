/**
 *
 * NewUser
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import styled from "styled-components";

import EditContactMethods from "containers/EditContactMethods";

import EditProfileSection, {
  EditProfileSectionWhite,
} from "components/EditProfileSection";

import EditBio from "components/EditBio/Loadable";
import EditLanguages from "components/EditLanguages/Loadable";
import EditProfileEmail from "components/EditProfileEmail/Loadable";
import EditProfileTitle from "components/EditProfileTitle/Loadable";
import EditLocation from "components/EditLocation/Loadable";
import GenderCheckbox from "components/GenderCheckbox/Loadable";
import SaveProfileButton from "components/SaveProfileButton/Loadable";
import RequiredAsterisk from "components/RequiredAsterisk";
import FormField from "containers/EditProfile/FormField";
import AudioBox from 'components/AudioBox/Loadable';
import Image from 'react-graceful-image';

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectNewUser from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

const PictureWrapper = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const FixedWidthWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const EditProfilePage = styled.div`
  padding: 0 1em;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1em;
`;

const NameAndBirthdayBox = styled.div`
  flex: 1;
`;

const Header = styled.div`
  align-items: center;
  background: #3c8fde;
  display: flex;
  height: 60px;
  justify-content:center;
  width: 100%;
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 3em;
  color: white;
`;

export class NewUser extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /* eslint react/no-did-mount-set-state: 0 */  // --> ON
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      email: "",
      gender: "male",
      description: "",
      location: "Pääkaupunkiseutu",
      contactMethods: [],
      languages: { spoken: [], learning: [] },
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleContact = this.handleContact.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.setFormElement = this.setFormElement.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    const newUser = JSON.parse(window.localStorage.getItem('newUser'));

    this.setState({
      firstName: newUser.first_name,
      email: newUser.email,
      accessToken: newUser.accessToken,
      expiresIn: newUser.expiresIn,
      picture: newUser.picture,
      url: newUser.picture.data.url,
      id: newUser.id,
      amplifyId: newUser.amplifyId,
      isLoading: false,
    });
  }

  setFormElement(element) {
    this.form = element;
  }

  validate = () => {
    this.form.reportValidity();
  }

  handleChange(e) {
    e.persist();
    this.setState(prevState => {
      const newState = prevState;
      newState[e.target.id] = e.target.value;
      return newState;
    });
  }

  handleLanguageChange(e) {
    this.setState(prevState => {
      const newState = prevState;
      // Cleaning for DynamoDB
      newState.languages.spoken = e.spoken.filter(language => language !== "");
      newState.languages.learning = e.learning.filter(language => language !== "");
      return newState;
    });
  }

  handleContact(e) {
    this.setState({ contactMethods: e });
  }

  handleGender(e) {
    this.setState({ gender: e.target.value });
  }

  saveProfile(e) {
    e.preventDefault();
    this.form.reportValidity();

    if (this.form.checkValidity()) {
      if (this.state.description === "") {
        const newData = { ...this.state, description: " " };
        this.setState({ isLoading: true });
        this.props.dispatch({ type: 'CREATE_USER', data: newData });
      } else {
        this.setState({ isLoading: true });
        this.props.dispatch({ type: 'CREATE_USER', data: this.state });
      }
      return true;
    }
    return false;
  }

  render() {
    return (
      <FixedWidthWrapper>
        <Header>
          <HeaderTitle>
            Luo profiili
          </HeaderTitle>
        </Header>
        <EditProfilePage>
          <form ref={this.setFormElement} onSubmit={e => e.preventDefault()}>
            <EditProfileSection>
              <RowWrapper>
                <PictureWrapper>
                  <Image
                    alt="profilepicture"
                    src={this.state.url}
                    style={{ borderRadius: '50%', boxShadow: '0 3px 3px 0 rgba(0,0,0,0.3)', margin: '0 0 0 0' }}
                    width="110"
                    height="110"
                  />
                </PictureWrapper>
                <NameAndBirthdayBox>
                  <EditProfileTitle value={this.state.firstName} onChange={this.handleChange} />
                </NameAndBirthdayBox>
              </RowWrapper>
              <EditProfileEmail value={this.state.email} onChange={this.handleChange} />
              <FormField>
                <GenderCheckbox
                  gender={this.state.gender}
                  onClick={this.handleGender}
                />
              </FormField>
            </EditProfileSection>
            <EditProfileSectionWhite>
              <FormField>
                <EditLocation
                  location={this.state.location}
                  onSelect={this.handleChange}
                />
              </FormField>
            </EditProfileSectionWhite>
            <EditProfileSectionWhite>
              <EditLanguages
                forNewUser
                spoken={[]}
                learning={[]}
                onChange={this.handleLanguageChange}
              />
            </EditProfileSectionWhite>
            <EditProfileSection>
              <FormField>
                <EditBio
                  description={this.state.description}
                  onChange={this.handleChange}
                />
                <AudioBox id={this.state.amplifyId} allowEdit forNewOrEditUser />
              </FormField>
            </EditProfileSection>
            <FormField>
              <EditContactMethods
                onEdit={this.handleContact}
                contactMethods={[]}
              />
            </FormField>
            <small><RequiredAsterisk /> merkityt kentät ovat pakollisia kenttiä</small>
            <SaveProfileButton
              id="SaveProfileButton"
              type="submit"
              onClick={this.saveProfile}
              isLoading={this.state.isLoading}
            />
          </form>
        </EditProfilePage>
      </FixedWidthWrapper>
    );
  }
}

NewUser.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newuser: makeSelectNewUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: "newUser",
  reducer,
});
const withSaga = injectSaga({
  key: "newUser",
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(NewUser);
