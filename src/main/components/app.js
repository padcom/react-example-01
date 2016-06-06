import StatefulComponent from '../framework/stateful-component';
import TitleStore from '../stores/title-store';
import DataStore from '../stores/data-store';
import * as TitleActions from '../actions/title-actions';
import * as DataActions from '../actions/data-actions';

import Grid from './grid';

export default class App extends StatefulComponent {
  constructor() {
    super({
      events: [
        { store: TitleStore, event: "title-changed", handler: "updateTitle" },
        { store: DataStore, event: "data-changed", handler: "updateData" }
      ]
    });
    this.state = { title: "Hello, world!", data: DataStore.getData() };
  }

  updateTitle() {
    this.setState({ title: TitleStore.getTitle() });
  }

  updateData() {
    this.setState({ data: DataStore.getData() });
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Grid index={this.index} data={this.state.data}/>
      </div>
    );
  }
}
