import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";


class AppMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "activeItem": "editorials" }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    }

  render() {
    return (
      <Menu>
        <Menu.Item as={Link} to="/home"
          name='editorials'
          active={this.state.activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item as={Link} to="/stats"
          name='stats'
          active={this.state.activeItem === 'stats'}
          onClick={this.handleItemClick}
        >
          Stats
        </Menu.Item>
      </Menu>
    );
  }
}

export default AppMenu