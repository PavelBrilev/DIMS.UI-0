import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { icons } from '../../styles/icons';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <>
        <Button
          outline
          className={this.props.className}
          color='primary'
          onClick={this.toggle}
        >
          {this.props.icon} {this.props.name}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            {React.Children.map(this.props.children, (child) =>
              React.cloneElement(child, { toggle: this.toggle }),
            )}
          </ModalBody>
          <ModalFooter>
            <Button outline color='warning' onClick={this.toggle} block>
              {' '}
              {icons.cancelIcon} Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Popup;

Popup.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.element,
};
