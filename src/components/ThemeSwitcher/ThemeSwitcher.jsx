import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Colors from './COLORS'
import PropTypes from 'prop-types';

class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = (e) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
    this.props.handleTheme(e.target.value)
  }

  render() {
    return (
      <Dropdown className = {'btn__header'} isOpen={this.state.dropdownOpen} toggle={this.toggle} onClick={this.toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          Theme
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem value={Colors.WHITE} onClick={this.toggle} >White</DropdownItem>
          <DropdownItem value={Colors.BLACK} onClick={this.toggle} >Black</DropdownItem>
          <DropdownItem value={Colors.GREEN} onClick={this.toggle} >Green</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ThemeSwitcher;

ThemeSwitcher.propTypes = {
  handleTheme: PropTypes.func
};