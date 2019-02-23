import * as React from "react"
import "../index.css"
import Header from "./Header"
import { Layout } from "antd"
import GameValues from "./GameValues";
import Rooms from "./Rooms";
import Room from "./Room";

interface State {
  screen: string
  roomId: string
}

class App extends React.Component<{}, State> {
  public state = { screen: "rooms", roomId: '' }
  public changeScreen = (newScreen: string) =>
    this.setState({ screen: newScreen })

  public setRoom = (roomId: string) => this.setState({roomId, screen: 'room'})

  public render() {
    return (
      <Layout>
        <Header screen={this.state.screen} changeScreen={this.changeScreen} />
        {this.state.screen === 'gameValues' && <GameValues />}
        {this.state.screen === 'rooms' && <Rooms setRoom={this.setRoom} />}
        {this.state.screen === 'room' && <Room roomId={this.state.roomId} />}
      </Layout>
    )
  }
}

export default App
