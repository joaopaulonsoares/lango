import React from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';

import { getSuggestions, getSuggestionValue, renderSuggestion } from './helpers';


class MyAutosuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  componentWillMount() {
    this.setState({ value: this.props.value ? this.props.value : "" });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.value ? newProps.value : "" });
  }

  onChange = (_, { newValue }) => {
    this.props.onChange(this.props.id, newValue);
    if (getSuggestions(newValue).length > 0) {
      this.setState({
        value: newValue,
      });
      this.props.onChange(this.props.id, newValue);
    } else {
      this.props.onChange(this.props.id, '');
    }
  };

  // Usecase : User leaving an incomplete value on the input
  onBlur = () => {
    const newValue = this.state.value;
    const names = getSuggestions(newValue).filter(o => o.name === newValue);
    if (names.length < 1) { this.props.onChange(this.props.id, ''); this.setState({ value: '' }); }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  renderInputComponent = inputProps => (
    <div>
      <input {...inputProps} maxLength={14} />
    </div>
  );

  render() {
    const { id, placeholder } = this.props;
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
    };

    return (
      <Autosuggest
        id={id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={this.renderInputComponent}
        highlightFirstSuggestion
      />
    );
  }
  }

MyAutosuggest.propTypes = {
  id: PropTypes.any,
  placeholder: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default MyAutosuggest;
