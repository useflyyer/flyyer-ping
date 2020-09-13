import { Component } from 'react';
import init, { FlayyerPing as FlayyerPingType } from '@flayyer/ping';

export default class FlayyerPing extends Component {
  private ping?: FlayyerPingType;

  componentDidMount() {
    const ping = init(window);
    if (ping) {
      this.ping = ping;
      ping.go();
    }
  }

  componentWillUnmount() {
    if (this.ping) {
      const ping = this.ping;
      ping.go();
    }
  }

  render() {
    return null;
  }
}
