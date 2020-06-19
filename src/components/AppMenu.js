import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class AppMenuRouting extends React.Component {
  constructor(props) {
    super(props);
    let activeItem = {'/': 0, '/stimulator':1, '/stats':2 }[this.props.location.pathname];
    this.state = { 'activeItem': activeItem };
  }

  render() {
    return (
      <div>
        <AppBar position='static'>
          <Tabs value={this.state.activeItem} onChange={(_, value) => { this.setState({ 'activeItem': value }); }} >
            <Tab label='Home' index={0} component={Link} to='/' />
            <Tab label='Stimulator' index={1} component={Link} to='/stimulator' />
            <Tab label='Stats' index={2} component={Link} to='/stats' />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

let AppMenu = withRouter(AppMenuRouting);
export default AppMenu