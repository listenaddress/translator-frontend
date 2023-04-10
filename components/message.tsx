import styled from 'styled-components'
import Link from 'next/link'

const MessageComponent = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 40px;
`

const MessageImage = styled.img`
  position: absolute;
  top: -6px;
  left: -50px;
  width: 30px;
`

export default function Message({ message, role = "user" }) {
  return (
    <MessageComponent>
      {
        role === "assistant" ? <MessageImage src="assistant.png" /> : <MessageImage src="linear.png" />
      }
      {message}
    </MessageComponent>
  )
}
