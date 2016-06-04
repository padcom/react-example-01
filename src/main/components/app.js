import dispatcher from '../dispatcher';
import TitleStore from '../stores/title-store';
import * as TitleActions from '../actions/title-actions';

import Grid from './grid';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { title: "Hello, world!" };

    // Event listeners for stores need to be bound to this context or else
    // there is no guarantee which context they will be executed in
    this.updateTitle = this.updateTitle.bind(this);

    // The FLUX flow is like this:
    //   1. TitleActions.titleChanged is called and dispatches an event with type "TITLE_CHANGED"
    //   2. The store is a registerd action listener and receives this event setting
    //      the internal state to new title and emitting a "title-changed" event
    //   3. The components listens to "title-changed" event in the store and re-reads the title
    //      from the store

    this.index = 0;
    let f = () => {
      this.index++;
      TitleActions.titleChanged("HELLO: " + this.index);
      setTimeout(f, 0);
    }
    setTimeout(f, 0);
  }

  componentWillMount() {
    TitleStore.on("title-changed", this.updateTitle);
  }

  componentWillUnmount() {
    // event listener must be removed or else there will be a memory leak
    TitleStore.removeListener("title-changed", this.updateTitle);
  }

  updateTitle() {
    this.setState({ title: TitleStore.getTitle() });
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Grid index={this.index} />
      </div>
    );
  }
}
