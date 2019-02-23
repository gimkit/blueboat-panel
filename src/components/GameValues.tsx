import * as React from "react"
import ReactJson from "react-json-view"
import axios from "axios"
import { Spin, Modal } from "antd"

interface State {
  loading: boolean
  dataValues: any
}

class GameValues extends React.Component<{}, State> {
  public state = {
    loading: true,
    dataValues: {}
  }

  public componentDidMount() {
    this.fetch()
  }

  public render() {
    if (this.state.loading) {
      return <Spin />
    }
    return (
      <div style={{ padding: 25, background: "#272822" }}>
        <ReactJson
          src={this.state.dataValues}
          theme="monokai"
          onAdd={() => this.onChange}
          onEdit={this.onChange}
          onDelete={this.onChange}
          onSelect={() => true}
        />
      </div>
    )
  }

  public onChange = async (options: { updated_src: any }) => {
    try {
      await axios.post("/blueboat-panel/gameValues", options.updated_src)
    } catch (e) {
      Modal.error({ title: "Error saving game values" })
    }
  }

  public fetch = async () => {
    this.setState({ loading: true })
    try {
      const data = (await axios.get("/blueboat-panel/gameValues")).data
      this.setState({ dataValues: data })
    } catch (e) {
      Modal.error({ title: "Error fetching game values" })
    } finally {
      this.setState({ loading: false })
    }
  }
}

export default GameValues
