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
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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


// class Popup extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { showPopup: false };

//     this.togglePopup = this.togglePopup.bind(this);
//   }

//   togglePopup() {
//     this.setState({
//       showPopup: !this.state.showPopup,
//     });
//   }

//   render() {
//     return (
//       <>
//         <Button name={this.props.name} onClick={this.togglePopup} />

//         {this.state.showPopup ? (
//           <div className='popup'>
//             <div className='popup_inner'>
//               {this.props.form}
//               <Button onClick={this.togglePopup} name='Back to grid' />
//             </div>
//           </div>
//         ) : null}
//       </>
//     );
//   }
// }

export default Popup;
