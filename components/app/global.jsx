import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    overflow:hidden;
  }

  *{
    font-family: ui-sans-serif;
  }
  .red {
    background-color: rgb(245, 72, 72);
  }
  
  .blue {
    background-color: rgb(111, 111, 218);
  }
  
  .yellow {
    background-color: rgb(245, 245, 102);
  }
  
  .green {
    background-color: rgb(76, 214, 76);
  }
  
  .brown {
    background-color: rgb(150, 120, 93);
  }
  .pink {
    background-color: #ee8bb1;
  }
  .violet {
    background-color: rgb(161, 96, 221);
  }
  .orange {
    background-color: rgb(238, 174, 90);
  }
`

export default GlobalStyle
