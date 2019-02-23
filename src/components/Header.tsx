import * as React from "react"
import { Layout, Menu } from "antd"
const AntHeader = Layout.Header

interface Props {
  screen: string
  changeScreen: (newScreen: string) => void
}

class Header extends React.Component<Props> {
  public render() {
    return (
      <AntHeader>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
          selectedKeys={[this.props.screen]}
          onClick={params => this.props.changeScreen(params.key)}
        >
          <Menu.Item key="rooms">Rooms</Menu.Item>
          <Menu.Item key="gameValues">Game Values</Menu.Item>
        </Menu>
      </AntHeader>
    )
  }
}

export default Header
