export default class StatefulComponent extends React.Component {
  constructor(config) {
    super();
    this.config = config;
    this.events = config.events;
    for (let i = 0; i < this.events.length; i++) {
      this.events[i].handler = this[this.events[i].handler].bind(this);
    }
  }

  componentWillMount() {
    for (let i = 0; i < this.events.length; i++) {
      this.events[i].store.on(this.events[i].event, this.events[i].handler);
    }
  }

  componentWillUnmount() {
    for (let i = 0; i < this.events.length; i++) {
      this.events[i].store.removeListener(this.events[i].event, this.events[i].handler);
    }
  }
}
