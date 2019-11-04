import React from 'react';
import { Alert } from 'reactstrap';

class AlertMessage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount() {
    setTimeout(this.onClose, 1500);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({ isOpen: true });
    }
    setTimeout(this.onClose, 2500);
  }

  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Alert color='info' isOpen={this.state.isOpen} toggle={this.onClose}>
        {this.props.message}
      </Alert>
    );
  }
}

export default AlertMessage;
