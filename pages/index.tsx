import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import {
  Header,
  Title, 
  Button,
  Label,
  MainWrapper,
  UnderlineLink,
  TextAreaWrapper,
  InputGroup,
  Dropdown,
  DropdownArrow
} from '../components/sharedstyles'

export default function Home() {
  const [message, setMessage] = useState('')
  const [domain, setDomain] = useState('developmental biology')

  const onSubmit = async (e) => {
    e.preventDefault()
    
    const res = await fetch('/api/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, domain }),
    })

    console.log(res)
  }

  return (
    <>
      <Header>
        <Title>Translate science from one domain to another.</Title>
        <Button>Learn More</Button>
      </Header>
      <MainWrapper>
        <InputGroup>
          <Label>Add text or <UnderlineLink href="#">choose a paper</UnderlineLink> to translate</Label>
          <TextAreaWrapper>
            <TextareaAutosize 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: 'calc(100% + 4px)',
                padding: '20px 24px',
                margin: '-2px',
                marginBottom: '-6px',
                backgroundColor: 'transparent',
                border: '2px solid #F2E0D8',
                resize: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
              }}
              minRows={3}
            />
          </TextAreaWrapper>
        </InputGroup>
        <InputGroup>
          <Label>Choose a domain to translate to</Label>
          <DropdownArrow src="/chevron-down.png" alt="arrow" />
          <Dropdown
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="developmental biology">Developmental Biology</option>
            <option value="neuroscience">Neuroscience</option>
          </Dropdown>
        </InputGroup>
        <Button
          style={{
            backgroundColor: '#D69A7E',
            cursor: 'pointer',
          }}
          onClick={onSubmit}
        >
          Translate
        </Button>
      </MainWrapper>
    </>
  )
}
