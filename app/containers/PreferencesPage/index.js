/**
 *
 * PreferencesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import Title from 'components/Title';
// import Slider from 'rc-slider';
import SaveProfileButton from 'components/SaveProfileButton/Loadable';

// import 'rc-slider/assets/index.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import CheckBox from 'components/CheckBox';
import { makeSelectPreferences } from 'containers/App/selectors';
import { saveUser, changeDistancePreference, changeGenderPreference, savePreferences } from './actions';

import reducer from './reducer';
import saga from './saga';

import checkboxes from './checkboxes';

const P = styled.p`
  font-size: 14px;
`;
const IconAndCheckBoxWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const CheckBoxWrapper = styled.div`
  flex: 1;
`;

const PreferencesWrapper = styled.div`
  margin: 1em 0;
`;

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);

export class PreferencesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const preferenceMap = new Map();
    preferenceMap.set('male', false).set('female', false).set('other', false);

    // Turn props into map for our purpose
    if (this.props.preferences.gender) {
      this.props.preferences.gender.map(item => preferenceMap.set(item, true));
    }

    this.state = {
      checkedItems: preferenceMap,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;

    this.setState(prevState => {
      // This is necessary because the backend only takes arrays so far
      const newCheckedItems = prevState.checkedItems.set(item, isChecked);
      const newArrayItems = [];
      checkboxes.map(gender => {
        if (newCheckedItems.get(gender.name)) {
          newArrayItems.push(gender.name);
        }
        return null;
      });

      this.props.onChangeGenderPreference(newArrayItems);
      return { checkedItems: newCheckedItems };
    });
  }

  render() {
    // const minDistance = this.props.preferences.distance ? this.props.preferences.distance[0] : 18;
    // const maxDistance = this.props.preferences.distance ? this.props.preferences.distance[1] : 35;
    return (
      <div>
        <Helmet>
          <title>PreferencesPage</title>
          <meta name="description" content="" />
        </Helmet>
        <PreferencesWrapper>

          <Title> Näytä </Title>
          {
          checkboxes.map(item => (
            <IconAndCheckBoxWrapper key={item.key}>
              <CheckBoxWrapper>
                <CheckBox
                  name={item.name}
                  checked={this.state.checkedItems.get(item.name)}
                  label={item.label}
                  onChange={this.handleChange}
                />
              </CheckBoxWrapper>
            </IconAndCheckBoxWrapper>
          ))
        }
          {/*
          <Title> Ikähaarukka </Title>
          <Range
            min={18}
            max={100}
            defaultValue={[minDistance, maxDistance]}
            onChange={this.props.onChangeDistancePreference}
          />
          */
        }
          <P>
            Lango ehdottaa sinulle kielikavereita kielivalintojesi ja sijaintisi mukaan.
            Jos etsit tiettyyn sukupuoleen kuuluvaa kielikaveria,
            tee haluamasi rajaukset yllä olevien valintapainikkeiden avulla.
          </P>
          <SaveProfileButton onClick={this.props.onSavePreferences} />
        </PreferencesWrapper>
      </div>
    );
  }
}

PreferencesPage.propTypes = {
  preferences: PropTypes.object.isRequired,
  // onChangeDistancePreference: PropTypes.func.isRequired,
  onChangeGenderPreference: PropTypes.func.isRequired,
  // onSaveUser: PropTypes.func.isRequired,
  onSavePreferences: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  preferences: makeSelectPreferences(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveUser: () => dispatch(saveUser()),
    onChangeDistancePreference: (evt) => dispatch(changeDistancePreference(evt)),
    onChangeGenderPreference: (evt) => dispatch(changeGenderPreference(evt)),
    onSavePreferences: (evt) => dispatch(savePreferences(evt)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'preferencesPage', reducer });
const withSaga = injectSaga({ key: 'preferencesPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PreferencesPage);
