import PropTypes from 'prop-types'
import styled from 'styled-components'
import WickedGrit from '../../assets/fonts/WickedGrit.ttf';
import React, { Fragment, useState } from 'react'
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
  margin-top: ${(props) => props.mobile ? '1.5em' : '3em'};
 `

const HomepageHeading = ({ mobile }) => {

  const SubTitle = styled(Header)`
    font-size: ${(props) => props.mobile ? '1.5em' : '1.7em'};
    font-weight: 'normal';
    margin-top: ${(props) => props.mobile ? '0.5em' : '1.5em'};
  `

  return (
    <Container text>
      <Title as='h1' inverted mobile={mobile}>
        Maze Rats Lab
      </Title>
      <SubTitle as='h2' inverted mobile={mobile}>
          The <strike>lazy</strike> pragmatic player toolbox.
      </SubTitle>
    </Container>
  )
}

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
    const countryOptions = [
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
const DesktopContainer = ({ children }) => {

  const [fixed, setFixed] = useState(false);

  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)

  const HeadingContainer = styled(Segment)`
    min-height: 300;
    padding: '1em 0em';
    text-align: center
  `

  return (
    <MainContainer minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <HeadingContainer
          inverted
          textAlign='center'
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted
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
        </HeadingContainer>
      </Visibility>

      {children}
    </MainContainer>
  )
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MainPusher = styled(Sidebar.Pusher)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const MobileContainer = (children) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handlePusherClick = () => {
    if (sidebarOpened) {
      setSidebarOpened(false);
    }
  }

  const handleToggle = () => setSidebarOpened(!sidebarOpened);

  return (
    <MainContainer maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar.Pushable>
        <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
          <MenuLink to="/character">Character generator</MenuLink>
          <MenuLink to="/spell">Spell generator</MenuLink>
        </Sidebar>

        <MainPusher
          dimmed={sidebarOpened}
          onClick={handlePusherClick}
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
                <Menu.Item onClick={handleToggle}>
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