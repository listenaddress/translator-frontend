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

const TranslationMessage = styled.div`
  background-color: #F5F3F1;
  padding: 30px 50px;
  margin-bottom: 40px;
  border-radius: 26px;
`

const Title = styled.h1`
  font-size: 1.33rem;
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

const Label = styled.label`
  font-size: 1rem;
  color: #6D6D6D;
`

 const MainWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
` 

const UnderlineLink = styled.a`
  text-decoration: underline;
`

const TextAreaWrapper = styled.div`
  display: block;
  background-color: #F3F3F2;
  width: 100%;
  min-height: 40px;
  height: auto;
  border-radius: 12px;
  font-size: 1rem;
  margin-top: 20px;
  resize: none;
`

const InputGroup = styled.div`
  margin-bottom: 50px;
`

const Dropdown = styled.select`
  display: block;
  background-color: #F3F3F2;
  border: 2px solid #F2E0D8;
  height: 59px;
  width: 280px;
  border-radius: 12px;
  padding: 16px 30px;
  padding-right: 60px;
  font-size: 1rem;
  margin-top: 20px;
  resize: none;
  font-family: 'Inter', sans-serif;
  letter-spacing: .5px;
  -webkit-appearance: none;
  cursor: pointer;

  &:focus {
    border: 2px solid #D69A7E;
    outline: none;
  }
`

const DropdownArrow = styled.img`
  position: relative;
  right: 15px;
  top: 76px;
  pointer-events: none;
`

export { Header, Title, Button, Label, MainWrapper, UnderlineLink, TextAreaWrapper, InputGroup, Dropdown, DropdownArrow, TranslationMessage }
