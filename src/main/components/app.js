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

    // The FLUX flow is like this:
    //   1. TitleActions.titleChanged is called and dispatches an event with type "TITLE_CHANGED"
    //   2. The store is a registerd action listener and receives this event setting
    //      the internal state to new title and emitting a "title-changed" event
    //   3. The components listens to "title-changed" event in the store and re-reads the title
    //      from the store

    this.index = 0;
    let f = () => {
      this.index++;
      TitleActions.titleChanged("Iteration " + this.index);
      DataActions.dataChanged(50);
      setTimeout(f, 200);
    }
    setTimeout(f, 200);
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
