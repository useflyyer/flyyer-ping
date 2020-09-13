import { Component } from 'react';
import init from '@flayyer/ping';

export default class FlayyerPing extends Component {
  private ping: any;

  componentDidMount() {
    const ping = init(window);
    if (ping) {
      this.ping = ping;
      window.addEventListener("load", ping.init, false);
      window.addEventListener("error", ping.e, false);
    }
  }

  componentWillUnmount() {
    if (this.ping) {
      const ping = this.ping;
      window.addEventListener("load", ping.init, false);
      window.addEventListener("error", ping.e, false);
    }
  }

  render() {
    return null;
  }
}
