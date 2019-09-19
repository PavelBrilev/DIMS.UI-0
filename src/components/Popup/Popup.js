import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';



class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    return (
      <>
        <Button outline className={this.props.className} color="primary" onClick={this.toggle}>{this.props.name}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalBody>
            {this.props.form}
          </ModalBody>
          <ModalFooter>
            <Button outline color="danger" onClick={this.toggle} block>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}


export default Popup;
