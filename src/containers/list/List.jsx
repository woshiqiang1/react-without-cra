import React, { Component } from 'react';
import { List } from 'react-virtualized';

class ListWithBigData extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    let list = [];
    for (let i = 0; i < 5000; i++) {
      list.push(i);
    }
    this.setState({ list });
  }

  rowRenderer({ key, index, style, isScrolling, isVisible }) {
    return (
      <div key={key} style={style}>
        <div>
          <input type="text" />
        </div>
        <div>
          <select name="123" id="select">
            <option value="wuhan">武汉</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
          </select>
        </div>
        <div>
          <textArea value={this.state.list[index]} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <List
        width={800}
        height={700}
        rowCount={this.state.list.length}
        rowHeight={120}
        rowRenderer={this.rowRenderer.bind(this)}
      />
    );
  }
}

export default ListWithBigData;
