import React from 'react';
import { Button } from '../GeneralElements/GeneralElements.js';
import './Popup.css';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };

    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <>
        <Button name={this.props.name} onClick={this.togglePopup} />

        {this.state.showPopup ? (
          <div className='popup'>
            <div className='popup_inner'>
              {this.props.form}
              <Button onClick={this.togglePopup} name='Back to grid' />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Popup;
