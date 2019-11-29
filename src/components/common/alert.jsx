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
    this.onClose();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message.length !== this.props.message.length) {
      this.setState({ isOpen: true });
    }
    this.onClose();
  }

  componentWillUnmount() {
    clearTimeout(this.onClose);
  }

  onClose = () => {
    setTimeout(() => {
      this.setState({ isOpen: false });
    }, 1500);
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
