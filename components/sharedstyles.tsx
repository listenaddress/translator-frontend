import styled from 'styled-components'

// Horizontal and vertical centering
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  background-color: #FBFAFA;
  text-align: center;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  padding-right: 30px;
`

const Button = styled.button`
  background-color: #F5F3F1;
  color: #1F1F1E;
  border: none;
  border-radius: 20px;
  height: 54px;
  padding: 16px 40px;
  font-size: 1rem;
`

export { Header, Title, Button }
