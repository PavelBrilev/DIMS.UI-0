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
    if (this.props.errors) {
      this.setState({ isOpen: true });
      setTimeout(this.onClose, 1500);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ isOpen: true });
    }
    setTimeout(this.onClose, 2500);
  }

  onClose = () => {
    this.setState({ isOpen: false });
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
