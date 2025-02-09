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
  const [model, setModel] = useState('claude-3.5-sonnet') // New state for model

  const examplePapers = [
    {
      title: "Separating cognitive and motor processes in the behaving mouse",
      text: "The cognitive processes supporting complex animal behavior are closely associated with movements responsible for critical processes, such as facial expressions or the active sampling of our environments. These movements are strongly related to neural activity across much of the brain and are often highly correlated with ongoing cognitive processes. A fundamental issue for understanding the neural signatures of cognition and movements is whether cognitive processes are separable from related movements or if they are driven by common neural mechanisms. Here we demonstrate how the separability of cognitive and motor processes can be assessed and, when separable, how the neural dynamics associated with each component can be isolated. We designed a behavioral task in mice that involves multiple cognitive processes, and we show that dynamics commonly taken to support cognitive processes are strongly contaminated by movements. When cognitive and motor components are isolated using a novel approach for subspace decomposition, we find that they exhibit distinct dynamical trajectories and are encoded by largely separate populations of cells. Accurately isolating dynamics associated with particular cognitive and motor processes will be essential for developing conceptual and computational models of neural circuit function."
    },
    {
      title: "Considering the interconnected nature of social identities in neuroimaging research",
      text: "Considerable heterogeneity exists in the expression of complex human behaviors across the cognitive, personality and mental health domains. It is increasingly evident that individual variability in behavioral expression is substantially affected by sociodemographic factors that often interact with life experiences. Here, we formally address the urgent need to incorporate intersectional identities in neuroimaging studies of behavior, with a focus on research in mental health. We highlight how diverse sociodemographic factors influence the study of psychiatric conditions, focusing on how interactions between those factors might contribute to brain biology and illness expression, including prevalence, symptom burden, help seeking, treatment response and tolerance, and relapse and remission. We conclude with a discussion of the considerations and actionable items related to participant recruitment, data acquisition and data analysis to facilitate the inclusion and incorporation of diverse intersectional identities in neuroimaging."
    }
  ]

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
      body: JSON.stringify({ message, domain, model }), // Include model in the request body
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

  const handleTryPaper = (text: string) => {
    setMessage(text)
    // Wait for state update to complete using requestAnimationFrame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      })
    })
  }

  return (
    <div>
      <title>FieldSHIFT</title>
      <Header>
        {
          !translation ?
            <>
              <Title>FieldSHIFT: Translate science from one domain to another.</Title>
              <Link href="https://pubs.rsc.org/en/content/articlelanding/2024/dd/d3dd00185g" target="_blank">
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
              <Label>Insert neuroscience text to translate</Label>
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
              <div style={{ marginTop: '12px' }}>
                <Label style={{ fontSize: '0.9rem', color: '#585756' }}>Or try one of these examples:</Label>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px',
                  marginTop: '8px' 
                }}>
                  {examplePapers.map((paper, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#FBF7F5',
                        borderRadius: '8px',
                        gap: '12px'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontWeight: '500', 
                          fontSize: '0.9rem',
                          marginBottom: '2px'
                        }}>
                          {paper.title}
                        </div>
                        <div style={{ 
                          fontSize: '0.85rem', 
                          color: '#585756',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {paper.text}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleTryPaper(paper.text)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '0.85rem',
                          backgroundColor: 'white',
                          color: '#D69A7E',
                          border: '1px solid #F2E0D8',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}
                      >
                        Try this
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
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
                <option value="economics">Economics</option>
                <option value="materials science">Materials Science</option>
                <option value="olfaction and behavior">Olfaction and Behavior</option>
                <option value="cell signaling">Cell Signaling</option>
              </Dropdown>
            </InputGroup>
            <InputGroup>
              <Label>Choose a model</Label> {/* New Label for model */}
              <DropdownArrow src="/chevron-down.png" alt="arrow" />
              <Dropdown
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="o3-mini">o3-mini</option>
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
                This translation is using a prompt like the one described in
                {` `}
                <a
                  href="https://pubs.rsc.org/en/content/articlelanding/2024/dd/d3dd00185g"
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
                Note: This a hypothesis from an AI, not scientific fact
              </div>
            </TranslationMessage>
            <Message message={translation} role="assistant"></Message>
          </div>
        }
      </MainWrapper>
    </div>
  )
}

