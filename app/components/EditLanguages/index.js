/**
 *
 * EditLanguages
 *
 *  Component used in newUser container and edit profile
 *  Has to behave differently depending on the forNewUser Prop
 */

import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import Title from "components/Title";
import RequiredAsterisk from "components/RequiredAsterisk";
// import Input from 'containers/EditProfile/Input';
// import { languages } from './languages';
import MyAutosuggest from "./MyAutoSuggest";

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  margin-bottom: 5vh;
  margin-right: 4vw;
`;

const ValidateErrorHolder = styled.input`
  display: inline;
  :focus {
    outline: 0 none;
  }
`;

const isNotEmpty = str => !!str && str.length > 0;

class EditLanguages extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      spoken0: "",
      spoken1: "",
      spoken2: "",
      learning0: "",
      learning1: "",
      learning2: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setErrorHolder = this.setErrorHolder.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    if (!this.props.forNewUser) {
      this.handleUpdate();
    }
  }

  componentDidMount() {
    this.validate();
  }

  componentWillReceiveProps() {
    if (!this.props.forNewUser) {
      this.handleUpdate();
    }
  }

  componentDidUpdate() {
    this.validate();
  }

  setErrorHolder(element) {
    this.errorHolder = element;
  }

  validate() {
    const isValid =
      (isNotEmpty(this.state.spoken0) ||
        isNotEmpty(this.state.spoken1) ||
        isNotEmpty(this.state.spoken2)) &&
      (isNotEmpty(this.state.learning0) ||
        isNotEmpty(this.state.learning1) ||
        isNotEmpty(this.state.learning2));
    if (isValid) {
      this.errorHolder.setCustomValidity("");
    } else {
      this.errorHolder.setCustomValidity("Valitse ainakin yksi kieli jota haluat oppia ja yksi kieli jota osaat puhua");
    }
  }

  handleUpdate() {
    this.setState({
      spoken0: this.props.spoken[0] ? this.props.spoken[0] : null,
      spoken1: this.props.spoken[1] ? this.props.spoken[1] : null,
      spoken2: this.props.spoken[2] ? this.props.spoken[2] : null,
      learning0: this.props.learning[0] ? this.props.learning[0] : null,
      learning1: this.props.learning[1] ? this.props.learning[1] : null,
      learning2: this.props.learning[2] ? this.props.learning[2] : null,
    });
  }

  handleChange(id, value) {
    // Workaround for DynamoDB

    const languagesState = { ...this.state, [id]: value };
    this.setState(languagesState);

    const languagesObject = {
      spoken: [
        languagesState.spoken0,
        languagesState.spoken1,
        languagesState.spoken2,
      ],
      learning: [
        languagesState.learning0,
        languagesState.learning1,
        languagesState.learning2,
      ],
    };

    // saves state to the store
    this.props.onChange(languagesObject);
  }

  render() {
    return (
      <div>
        <Title> Omat kielet <RequiredAsterisk />
          <ValidateErrorHolder type="text" id="error-message-holder" innerRef={this.setErrorHolder} />
        </Title>
        <RowWrapper>
          <ColumnWrapper>
            <p> Haluan oppia </p>
            <MyAutosuggest
              id="learning0"
              placeholder="..."
              onChange={this.handleChange}
              value={this.state.learning0 ? this.state.learning0 : ""}
            />
            <MyAutosuggest
              id="learning1"
              placeholder="..."
              onChange={this.handleChange}
              value={this.state.learning1 ? this.state.learning1 : ""}
            />
            <MyAutosuggest
              id="learning2"
              placeholder="..."
              onChange={this.handleChange}
              value={this.state.learning2 ? this.state.learning2 : ""}
            />
          </ColumnWrapper>
          <ColumnWrapper>
            <p> Osaan puhua </p>
            <MyAutosuggest
              id="spoken0"
              placeholder="..."
              onChange={this.handleChange}
              value={this.state.spoken0 ? this.state.spoken0 : ""}
            />
            <MyAutosuggest
              id="spoken1"
              placeholder="..."
              onChange={this.handleChange}
              value={this.state.spoken1 ? this.state.spoken1 : ""}
            />
            <MyAutosuggest
              id="spoken2"
              placeholder="..."
              onChange={this.handleChange}
              value={this.state.spoken2 ? this.state.spoken2 : ""}
            />
          </ColumnWrapper>
        </RowWrapper>
      </div>
    );
  }
}

EditLanguages.propTypes = {
  learning: PropTypes.array,
  spoken: PropTypes.array,
  onChange: PropTypes.func,
  forNewUser: PropTypes.bool,
};

export default EditLanguages;
