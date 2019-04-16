/**
 *
 * LandingPage
 *
 * This page contains the scope of the actual app and it's logic.
 * Everything redendered as children of this page is to be considered authentified.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { userIsLoggedIn } from "./utilFuncs";
import makeSelectLandingPage from "./selectors";
import reducer from "../App/reducer";
import saga from "./saga";

import { signOut } from "../App/actions";

const PulseLoader = require('halogen/PulseLoader');

export class LandingPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  /* eslint no-console: 0 */
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { loading: false };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    const newUser = localStorage.getItem('newUser');
    if (newUser) {
      this.props.dispatch({ type: 'LOG_IN' });
      localStorage.removeItem('newUser');
    }
  }

  getUrlParams(search) {
    const hashes = search.slice(search.indexOf("?") + 1).split("&");
    return hashes.reduce((params, hash) => {
      const [key, val] = hash.split("=");
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
  }

  handleResponse(e) {
    this.props.dispatch({ type: 'LOG_AMPLIFY', e });
    this.setState({ loading: false });
  }

  login() {
    this.setState({ loading: true });
    const popup = window.open(`https://www.facebook.com/v3.1/dialog/oauth?client_id=377886075952790&display=popup&scope=public_profile&response_type=token,granted_scopes&auth_type=rerequest&redirect_uri=${window.location.origin}/login_success`, 'Facebook Login', 'width=350,height=250');
    window.focus();
    window.addEventListener('message', (message) => {
      popup.close();
      window.FB.api(
        "/me",
        {
          fields: ["last_name", "first_name", "email", "picture.width(500).height(500)"],
          access_token: message.data.access_token,
        },
        response => {
          if (response.id) {
            this.handleResponse({
              ...response,
              ...{
                accessToken: message.data.access_token,
                expiresIn: message.data.expires_in,
              },
            });
          } else {
            // this.props.dispatch(error(response));
            this.props.dispatch(signOut());
          }
        }, true
      );
    }, { once: true });
  }

  render() {
    return (
      <div>
        {userIsLoggedIn(this.props.authState) || this.props.global.userData.id ?
        (
          this.props.children
        ) : (
          <Container>
            <Wrapper>
              <Helmet>
                <title>Lango</title>
              </Helmet>

              <Screenful>
                <header>
                  <LangoLogo src="/lango-logo.svg" alt="Lango" />
                  <HeaderText>
                    Keskustele, ystävysty ja
                    <br />
                    kehitä kielitaitoasi!
                  </HeaderText>
                </header>

                <div>
                  { this.state.loading && <PulseLoader size={'50'} color={"white"} /> }
                </div>

                <div>
                  <FBLoginButtonWrapper>
                    <CustomFacebookButton onClick={this.login} >

                      <FontAwesomeIcon icon={['fab', 'facebook-f']} size="1x" />

                      <TextWrapper> Kirjaudu Facebookilla </TextWrapper>
                    </CustomFacebookButton>
                  </FBLoginButtonWrapper>

                  <FirstPagePara>
                    Jatkamalla kirjautumiseen hyväksyt{" "}

                    <a href="/eula">käyttöehdot</a> ja{" "}
                    <a href="/privacy">tietosuojakäytännön</a>.
                    <br />
                    By signing in, you are agreeing to
                      <a href="/eula_en"> terms of use</a> and {" "}
                    <a href="/privacy_en">data protection practice</a>.

                  </FirstPagePara>

                  <ReadMore>Lue lisää alta</ReadMore>
                </div>
              </Screenful>

              <Section>
                <SectionHeader>Kieltä oppii parhaiten puhumalla!</SectionHeader>

                <SectionPara>
                  Haluaisitko puhua paremmin suomea? Vai onko ruotsi ruosteessa?
                  Tai ehkä opettelisitkin arabiaa? Voit myös auttaa muita
                  oppimaan – kielikavereita kaipaavat monet maahanmuuttajista
                  kantasuomalaisiin.
                </SectionPara>

                <SectionPara>
                  Luo Langoon oma profiili, niin Lango ehdottaa sinulle sopivia
                  kielikavereita. Voit lähetellä kielikaverisi kanssa viestejä
                  ja sopia tapaamisen esimerkiksi kirjaston tiloihin. Voitte
                  jutella pelkästään verkossakin esimerkiksi Skypen
                  välityksellä.
                </SectionPara>

                <SectionPara>
                  Rekisteröidyt Langon käyttäjäksi hyödyntäen Facebook-tiliäsi,
                  josta siirtyvät Langoon etunimi, profiilikuva ja
                  sähköpostiosoite. Lue <a href="/faq">täältä</a>,
                  miksi vaadimme Facebook-kirjautumisen.
                </SectionPara>

                <SectionPara>
                  Lango on kehitetty aluehallintoviraston ja{" "}
                  <a href="https://vantaa.fi" target="_blank" rel="noopener">
                    Vantaan kaupungin
                  </a>{" "}
                  rahoittamassa projektissa yhteistyössä{" "}
                  <a href="https://helmet.fi" target="_blank" rel="noopen">
                    Helmet-kirjastojen
                  </a>
                  ,{" "}
                  <a
                    href="https://ouka.fi/oulu/kirjasto"
                    target="_blank"
                    rel="noopen"
                  >
                    Oulun kaupunginkirjaston
                  </a>
                  ,{" "}
                  <a href="https://hakunila.org" target="_blank" rel="noopen">
                    Hakunilan kansainvälisen yhdistyksen
                  </a>{" "}
                  ja{" "}
                  <a href="http://nicehearts.com" target="_blank" rel="noopen">
                    Nicehearts ry
                  </a>
                  :n kanssa.
                </SectionPara>

                <SectionPara>Langoa ylläpitävät Vantaan kaupunginkirjasto & Vantaan tietohallinto.</SectionPara>
              </Section>

              <div>
                <img
                  style={{ height: "100px", padding: "1rem" }}
                  src={"/vantaa_logo.png"}
                  alt="Vantaan kaupunki"
                />
              </div>
            </Wrapper>
          </Container>
        )}
      </div>
    );
  }
}

const Container = styled.div`
  background: rgb(80, 143, 216);
`;

const Wrapper = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  text-align: center;
`;

const Screenful = styled.div`
  height: 95vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LangoLogo = styled.img`
  height: 110px;
  margin-bottom: 0.5rem;
`;

const HeaderText = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const FBLoginButtonWrapper = styled.div`
  margin-bottom: 4vh;
`;

const TextWrapper = styled.label`
  text-decoration: none;
  align-content: left;
  font-family: Helvetica,sans-serif;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-left: 0.4rem;
  text-transform: uppercase;
`;

const CustomFacebookButton = styled.button`
  box-sizing: border-box;
  margin: 0.2em;
  border: none;
  text-align: right;
  line-height: 3rem;
  white-space: nowrap;
  border-radius: 0.3em;
  font-size: 16px;
  color: #FFF;
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
`;

const FirstPagePara = styled.p`
  color: white;
  font-size: 0.75rem;
  margin-bottom: 2rem;

  & a {
    color: white;
    text-decoration: underline;
  }
`;

const ReadMore = styled.div`
  color: white;
  font-size: 1rem;
`;

const Section = styled.div`
  margin: 1rem;
  padding: 0.5rem 1rem;
  color: rgb(7, 7, 7);
  background: rgb(252, 252, 252);
  border: 1px solid rgb(250, 250, 250);
  border-radius: 3px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
`;

const SectionHeader = styled.h2`
  margin-top: 0.5rem;
  font-size: 1.125rem;
  text-align: left;
`;

const SectionPara = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: left;
`;

LandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authState: PropTypes.any,
  global: PropTypes.object,
  children: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  global: makeSelectLandingPage(),
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

const withReducer = injectReducer({ key: "landingPage", reducer });
const withSaga = injectSaga({ key: "landingPage", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(LandingPage);
