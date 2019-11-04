import React from 'react';
import Sidebar from 'react-sidebar';

class BadSidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    return (
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: 'white' } }}
        pullRight={true}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    );
  }
}

export default BadSidebar;
