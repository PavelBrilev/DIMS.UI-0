import React from 'react';
import { Alert } from 'reactstrap';

class AlertErrors extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
      <Alert color='danger' isOpen={this.state.isOpen} toggle={this.onClose}>
        {this.props.errors}
      </Alert>
    );
  }
}

export default AlertErrors;
