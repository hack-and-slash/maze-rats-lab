import PropTypes from 'prop-types'
import styled from 'styled-components'
import WickedGrit from '../../assets/fonts/WickedGrit.ttf';
import React, { Component, Fragment } from 'react'
import {
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Select,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { withRouter, Route, Link } from 'react-router-dom'
import PrettyPrintJson from '../../PrettyPrintJson'
import Generator from '../../services/generator.js'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

 const Title = styled(Header)`
 @font-face {
    font-family: 'WickedGrit';
    src: url(${WickedGrit}) format('truetype');
    
    font-style: normal;
  }
  font-family: WickedGrit;
  font-size: ${(props) => props.mobile ? '2em' : '4em'};
  font-weight: normal;
  margin-bottom: 0;
  margin-top: ${(props) => props.mobile ? '1.5em' : '3em'}
 `

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Title as='h1' inverted mobile={mobile}>
      Maze Rats Lab
    </Title>
    <Header as='h2' inverted mobile={mobile} style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}>The <strike>lazy</strike> pragmatic player toolbox.
      </Header>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

const MenuLink = withRouter(({to, location, children}) => {
    return (
      <Menu.Item as='a' active={to === location.pathname}>
        <Link to={to+location.search}>
          {children}
        </Link>
      </Menu.Item>
    )
})

const LangSelector = withRouter(({history, location}) => {
    let countryOptions = [
        { key: 'ptbr', value: 'ptbr', flag: 'br', text: 'Brazillian Portuguese' },
        { key: 'en', value: 'en', flag: 'us', text: 'English' }
    ]
    return (
        <Select style={{ fontSize: 10, width:"200px" }} onChange={(e,{k, value}) => history.push(location.pathname+'?lang='+value)} placeholder='Change language' options={countryOptions} />
    )
})

const MainContainer = styled(Responsive)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <MainContainer minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 300, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <MenuLink to="/character">Character generator</MenuLink>
                <MenuLink to="/spell">Spell generator</MenuLink>
                <Menu.Item position='right'>
                  <LangSelector />
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </MainContainer>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MainPusher = styled(Sidebar.Pusher)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <MainContainer maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <MenuLink to="/character">Character generator</MenuLink>
            <MenuLink to="/spell">Spell generator</MenuLink>
          </Sidebar>

          <MainPusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 200, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <LangSelector />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </MainPusher>
        </Sidebar.Pushable>
      </MainContainer>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <Fragment>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </Fragment>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const ContentContainer = styled(Container)`
  padding: 30px 0px;
  flex: 1
`

const Footer = styled(Segment)`
  padding: '5em 0em'
` 
const PageLayout = () => (
  <ResponsiveContainer>
    <ContentContainer text>
      <Route path="/character" render={(props) => {
        let searchParams = new URLSearchParams(props.location.search)
        let lang = searchParams.get("lang") || "en"
        return (
          <Fragment>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Character generator
            </Header>
            <PrettyPrintJson data={new Generator(null, lang).character()} />
          </Fragment>
        )
      }} />
      <Route path="/spell" render={(props) => {
        let searchParams = new URLSearchParams(props.location.search)
        let lang = searchParams.get("lang") || "en"
        return (
          <Fragment>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Spell generator
            </Header>
            <PrettyPrintJson data={new Generator(null, lang).spell()} />
          </Fragment>
        )
      }} />
    </ContentContainer>
    <Footer inverted vertical>
      
    </Footer>
  </ResponsiveContainer>
)
export default PageLayout