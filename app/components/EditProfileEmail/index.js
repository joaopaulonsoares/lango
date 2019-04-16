import React from "react";
import PropTypes from "prop-types";

import FormField from "containers/EditProfile/FormField";
import Input from "containers/EditProfile/Input";

import Title from "components/Title";
import RequiredAsterisk from "components/RequiredAsterisk";

class EditProfileEmail extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /* eslint react/no-did-mount-set-state: 0 */  // --> ON
  /* eslint react/prop-types: 0 */

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.setEmailElement = this.setEmailElement.bind(this);
  }

  componentDidMount() {
    this.validate();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  componentDidUpdate() {
    this.validate();
  }

  setEmailElement(element) {
    this.email = element;
  }

  handleChange = event => {
    this.props.onChange(event);
    this.validate();
  }

  validate = () => {
    if (this.email.validity.valueMissing) {
      this.email.setCustomValidity("Sähköposti on pakollinen kenttä");
    } else if (this.email.validity.typeMismatch) {
      this.email.setCustomValidity("Sähköposti on virheellisessä muodossa");
    } else {
      this.email.setCustomValidity("");
    }
  }

  render() {
    return (
      <FormField>
        <Title> Sähköposti <RequiredAsterisk /> </Title>
        <Input
          innerRef={this.setEmailElement}
          id="email"
          type="email"
          required
          placeholder="..."
          value={this.props.value || ""}
          onChange={this.handleChange}
        />
      </FormField>);
  }
}

EditProfileEmail.props = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default EditProfileEmail;
