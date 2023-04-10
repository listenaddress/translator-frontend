import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    line-height: 1.4;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  textarea {
    ::-webkit-scrollbar {
      display: none;
    }
    &:focus {
      outline: none;
      border: 2px solid #D69A7E !important;
    }
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
