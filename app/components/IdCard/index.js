/**
*
* IdCard
*
* Component made for displaying pictur, name, location and contact methods
*/

import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import ProfilePicture from 'containers/ProfilePicture';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { objToStrMap } from 'utils/utilFuncs';

import checkboxes from './contactMethods';

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
  `;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-top: 25px;
`;

const NameWrapper = styled.div`
  color: #000000;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  text-align: justify;
`;

const LocationWrapper = styled.div`
  height: 28px;
  width: 139px;
  color: rgba(0,0,0,0.6);
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 28px;
  text-align: justify;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  
`;

const DescriptionWrapper = styled.div`
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  opacity: 0.75;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  margin-left: 0.4em;
`;


class IdCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const contactMethods = typeof this.props.contactMethods === "string" ? JSON.parse(this.props.contactMethods) : null;
    const contactMap = contactMethods ? objToStrMap(contactMethods) : new Map();

    return (
      <div>
        <RowWrapper>
          <ProfilePicture id={this.props.id} />
          <ColumnWrapper>
            <NameWrapper> {this.props.firstName} </NameWrapper>
            <LocationWrapper> {this.props.location} </LocationWrapper>
            <SocialLinks>
              {
                checkboxes.map(item => (
                  <div key={item.key}>
                    {contactMap.get(item.name) &&
                    <IconWrapper key={item.key}>
                      <FontAwesomeIcon icon={item.icon} size="xs" />
                    </IconWrapper>
                    }
                  </div>))
              }
            </SocialLinks>
          </ColumnWrapper>
        </RowWrapper>
        <DescriptionWrapper>
          <p> {this.props.description} </p>
        </DescriptionWrapper>
      </div>
    );
  }
}

IdCard.propTypes = {
  firstName: PropTypes.string,
//  lastName: PropTypes.string.isRequired,
  location: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  contactMethods: PropTypes.any,
};

export default IdCard;
