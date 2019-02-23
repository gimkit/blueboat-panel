import * as React from "react"
import axios from "axios"
import { Spin, Card, Modal } from "antd"
import moment from 'moment'

interface RoomSnapshot {
  id: string
  type: string
  createdAt: number
}

interface State {
  rooms: RoomSnapshot[]
  loading: boolean
}

class Rooms extends React.Component<{setRoom: (roomId: string) => void}, State> {
  public state = { rooms: [] as RoomSnapshot[], loading: true }
  public fetcher: any

  public componentDidMount() {
    this.fetch()
    this.fetcher = setInterval(() => this.fetch(true), 7000)
  }

  public componentWillUnmount() {
    if (this.fetcher) {
      clearInterval(this.fetcher)
    }
  }

  public render() {
    if (this.state.loading) {
      return <Spin />
    }
    return (
      <div style={{ display: "flex", alignItems: "center", padding: 10, boxSizing: 'border-box', flexWrap: 'wrap' }}>
        {this.state.rooms.reverse().map(room => (
          <Card onClick={() => this.props.setRoom(room.id)} key={room.id} title={room.type} style={{ width: 300, margin: 10, cursor: 'pointer' }}>
            <b>{room.id}</b>
            <div>Created {moment.unix(room.createdAt / 1000).fromNow()}</div>
          </Card>
        ))}
      </div>
    )
  }

  public fetch = async (noLoading?: boolean) => {
    try {
      if (!noLoading) {
        this.setState({ loading: true })
      }
      const rooms = (await axios.get("/blueboat-panel/rooms")).data
      this.setState({ rooms })
    } catch (e) {
      Modal.error({ title: "Error fetching rooms" })
    } finally {
      this.setState({ loading: false })
    }
  }
}

export default Rooms
