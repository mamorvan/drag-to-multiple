import React, { Component } from 'react';
import update from 'react/lib/update';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ItemTypes from '../../utils/ItemTypes';
import PropTypes from 'prop-types';

import Bin from './grandchildren/Bin';
import Item from './grandchildren/Item';

// need to separate Bin and Container from react-dnd example

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' }
      }
    };
  }

  moveItem(id, left, top) {
    this.setState(update(this.state, {
      items: {
        [id]: {
          $merge: { left, top }
        }
      }
    }));
  }

  render() {
    const { hideSourceOnDrag } = this.props;
    return (
      <div style = {{
        height: '400px',
        width: '400px',
        border: '5px solid blue'
      }}>
        <Item name="&#128009;"
          type={ItemTypes.STUFF}
          top={this.state.items.a.top}
          left={this.state.items.a.left}
          hideSourceOnDrag={hideSourceOnDrag} />
        <Item name="&#9822;" type={ItemTypes.MORESTUFF} top={this.state.items.a.top} hideSourceOnDrag={hideSourceOnDrag}/>
        <Item name="&#128120;" type={ItemTypes.LESSSTUFF} hideSourceOnDrag={hideSourceOnDrag}/>

        <Bin accepts={ItemTypes.STUFF} />
        <Bin accepts={ItemTypes.MORESTUFF} />
        <Bin accepts={ItemTypes.LESSSTUFF} />
      </div>
    );
  }
}

Container.propTypes = {
  hideSourceOnDrag: PropTypes.bool.isRequired
};

export default DragDropContext(HTML5Backend)(Container);