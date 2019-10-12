import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ThemeControl extends React.Component {
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
      if(this.state.dropdownOpen) {
      this.props.handleTheme(e.target.value)
      }
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
          <DropdownItem value='white' onClick={this.toggle} >White</DropdownItem>
          <DropdownItem value='black' onClick={this.toggle} >Black</DropdownItem>
          <DropdownItem value='green' onClick={this.toggle} >Green</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ThemeControl;
