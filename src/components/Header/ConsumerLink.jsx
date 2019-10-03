import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import { Consumer } from '../../App';

class ConsumerLink extends React.Component {

    render() {

        return (
            <Consumer>
                { ( color ) => <Link to={this.props.to} className = {`btn__header ${color}`} > {this.props.name} </Link> }
            </Consumer>
        );
  }
}

  export default ConsumerLink;