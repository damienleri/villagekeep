import React from "react";
import NetInfo from "@react-native-community/netinfo";

export const NetworkContext = React.createContext({ isConnected: true });

export class NetworkProvider extends React.PureComponent {
  state = {
    isConnected: true
  };

  componentDidMount() {
    this.unsubscribeToNetworkChanges = NetInfo.addEventListener(
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    this.unsubscribeToNetworkChanges();
  }

  handleConnectivityChange = ({ isConnected }) =>
    this.setState({ isConnected });

  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}
