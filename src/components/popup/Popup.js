import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { icons } from '../common/icons';

class Popup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { className, icon, name, children } = this.props;

    return (
      <>
        <Button
          outline
          className={className}
          color='primary'
          onClick={this.toggle}
        >
          {icon} {name}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { toggle: this.toggle }),
            )}
          </ModalBody>
          <ModalFooter>
            <Button outline color='warning' onClick={this.toggle} block>
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
