import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import Message from '../components/message';
import Link from 'next/link'

import {
  Header,
  Title,
  Button,
  Label,
  MainWrapper,
  TextAreaWrapper,
  InputGroup,
  Dropdown,
  DropdownArrow,
  TranslationMessage
} from '../components/sharedstyles'

export default function Home() {
  const [message, setMessage] = useState('')
  const [translation, setTranslation] = useState('')
  const [translating, setTranslating] = useState(false)
  const [domain, setDomain] = useState('developmental biology')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!message) return
    if (translating) return
    setTranslating(true)
    const res = await fetch('/api/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, domain }),
    })

    const data = await res.json()
    if (data.error) {
      console.log(data.error)
      return
    } else if (data.message && data.message.content) {
      setTranslation(data.message.content)
    }
    setTranslating(false)
  }

  return (
    <div>
      <title>FieldSHIFT</title>
      <Header>
        {
          !translation ?
            <>
              <Title>FieldSHIFT: Translate science from one domain to another.</Title>
              <Link href="https://osf.io/269e5/" target="_blank">
                <Button>Read the paper</Button>
              </Link>
            </>
            :
            <>
              <Button onClick={() => setTranslation('')}>Clear</Button>
            </>
        }
      </Header>
      <MainWrapper>
        {
          !translation &&
          <>
            <InputGroup>
              <Label>Insert neuroscience text
                {/* or <UnderlineLink href="#">choose a paper</UnderlineLink>  */}
                {` `} to translate
              </Label>
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
                <option value="philosophy">Philosophy</option>
                <option value="finance">Finance</option>
              </Dropdown>
            </InputGroup>
            <Button
              style={{
                backgroundColor: translating ? '#ddbcad' : '#D69A7E',
                cursor: 'pointer',
                marginTop: '20px',
              }}
              onClick={onSubmit}
            >
              {translating ? 'Translating' : 'Translate'}
            </Button>
            <div
              style={{
                marginTop: '20px',
              }}
            >
              <Label
                style={{
                  fontStyle: 'italic',
                }}
              >
                Note: this translation is using GPT-4 and a prompt like the one described in
                {` `}
                <a
                  href="https://osf.io/269e5/"
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  our paper
                </a>
                .
              </Label>
            </div>
          </>
        }
        {
          translation &&
          <div
            style={{
              position: 'relative'
            }}
          >
            <Message message={message}></Message>
            <TranslationMessage>
              <div
                style={{
                  fontWeight: '600',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                  }}
                >
                  <img src="arrow-down.png" style={{ position: 'absolute', left: '-35px', top: '-1.7px' }} />
                </div>
                Translated to {domain}
              </div>
              <div
                style={{
                  color: '#585756',
                  marginTop: '8px',
                  fontStyle: 'italic',
                }}
              >
                Note: This a hypothesis from GPT, not scientific fact
              </div>
            </TranslationMessage>
            <Message message={translation} role="assistant"></Message>
          </div>
        }
      </MainWrapper>
    </div>
  )
}
