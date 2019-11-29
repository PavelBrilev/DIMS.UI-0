import React from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { RoleContext } from '../../context/RoleContext';
import { Link } from 'react-router-dom';
import { icons } from '../common/icons';
import { Roles as ROLES } from '../../storage';

import './sidebar.css';

class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  onSetSidebarOpen = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    return (
      <RoleContext.Consumer>
        {(role) => (
          <ThemeContext.Consumer>
            {(theme) => (
              <div
                className={
                  this.state.sidebarOpen
                    ? `${'sidebarOpen'} ${theme}`
                    : `${'sidebar'} ${theme}`
                }
              >
                <button onClick={this.onSetSidebarOpen}>
                  {this.state.sidebarOpen ? icons.fixedIcon : icons.unFixedIcon}
                </button>
                <Link
                  to='/students'
                  className={
                    role === ROLES.ADMIN || role === ROLES.MENTOR
                      ? 'btn__sidebar'
                      : 'hidden'
                  }
                >
                  Students <span>{icons.studentIcon}</span>
                </Link>
                <Link
                  to='/tasks'
                  className={
                    role === ROLES.ADMIN || role === ROLES.MENTOR
                      ? 'btn__sidebar'
                      : 'hidden'
                  }
                >
                  Tasks <span>{icons.taskIcon}</span>
                </Link>
                <Link
                  to='/tasksTrack'
                  className={
                    role === ROLES.ADMIN || role === ROLES.USER
                      ? 'btn__sidebar'
                      : 'hidden'
                  }
                >
                  Tasks Track <span>{icons.taskTrackIcon}</span>
                </Link>
              </div>
            )}
          </ThemeContext.Consumer>
        )}
      </RoleContext.Consumer>
    );
  }
}

export default Sidebar;
