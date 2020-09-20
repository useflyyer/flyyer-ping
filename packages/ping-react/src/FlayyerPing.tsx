import { Component } from 'react';
import init, { FlayyerPing as FlayyerPingType, FlayyerPingOptions } from '@flayyer/ping';

export type FlayyerPingProps = FlayyerPingOptions;

export default class FlayyerPing extends Component<FlayyerPingProps> {
  private ping?: FlayyerPingType;

  componentDidMount() {
    const ping = init(window, this.props); // TODO: pick props?
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
