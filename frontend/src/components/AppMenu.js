import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class AppMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'activeItem': 0 }
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.activeItem} onChange={(_, value) => { this.setState({ 'activeItem': value }); }} >
            <Tab label="Home" id="tabHome" component={Link} to='/' />
            <Tab label="Stats" id="tabStats" component={Link} to='/stats' />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}
export default AppMenu