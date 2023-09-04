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
    <>
      <Header>
        {
          !translation ?
            <>
              <Title>Welcome to levinlab.dev</Title>
            </>
            :
            <>
              <Button onClick={() => setTranslation('')}>Clear</Button>
            </>
        }
      </Header>
      <MainWrapper>
        <h3>Links</h3>
        <div>
          <Link
            href="/fieldshift"
            style={{
              "textDecoration": "underline",
            }}
          >
            FieldSHIFT
          </Link>
        </div>
        {/* https://drmichaellevin.org/ */}
        <div>
          <Link
            href="https://drmichaellevin.org/"
            style={{
              "textDecoration": "underline",
            }}
          >
            The Levin Lab
          </Link>
        </div>
      </MainWrapper>
    </>
  )
}
