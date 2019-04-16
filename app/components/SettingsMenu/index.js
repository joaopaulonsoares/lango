/**
*
* SettingsMenu
*
*/

import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signOut } from 'containers/App/actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Icon from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';
import { signOut as signOutIcon } from 'react-icons-kit/fa/signOut';

// import { FormattedMessage } from 'react-intl';


function SettingsMenu(props) {
  const StyledIcon2 = styled(Icon)`
    float: right;
    margin-right: 1em;
`;

  const StyledIcon = styled(Icon)`
    float: right;
    margin-right: 0.5em;
`;

  const Wrapper = styled.div`
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    padding-top: 1em;
    padding-bottom: 1em;
    justify-content: space-between;
  `;

  const MenuItem = styled(Link)`
    height: 60px;
    width: 100%;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    padding: 1em;
    margin: .5rem 0;
    border: 2px solid #3c8fde;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
    min-width: 16.25rem;
    color: #3c8fde;
    text-decoration: none;
    border-radius: 8px;
  `;

  const SignOutItem = styled.div`
    cursor: pointer;
    height: 60px;
    font-size: 16px;
    font-weight: bold;
    border: 2px solid #000000;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0 3px 3px 0 rgba(0,0,0,0.15);
    padding: 1em;
    margin: 1rem 0;
  `;

  return (
    <Wrapper>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MenuItem to="/edit_profile" > Muokkaa profiilia <StyledIcon icon={chevronRight} size={30} /> </MenuItem>
        <MenuItem to="/preferences" > Hakuasetukset <StyledIcon icon={chevronRight} size={30} /> </MenuItem>
        <MenuItem to="/faq" target="_blank"> Usein kysyttyä (FAQ) <StyledIcon icon={chevronRight} size={30} /> </MenuItem>
      </div>

      <SignOutItem onClick={props.onSignOut}>
      Kirjaudu ulos <StyledIcon2 icon={signOutIcon} size={30} />
      </SignOutItem>
    </Wrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => {
      dispatch(signOut());
      return 0;
    },
  };
}

const mapStateToProps = () => ({});

SettingsMenu.propTypes = {
  onSignOut: propTypes.func,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(SettingsMenu);
