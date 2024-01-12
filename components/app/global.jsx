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

  .popup,
.popup_engineer,
.popup_calc_end {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);
}

.myimage {
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  height: 500px;
  z-index: 10;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
}

.popup_content,
.popup_engineer_content,
.popup_calc_end_content {
  /* display: none; */
  position: fixed;
  top: 10%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 40rem;
  background-color: #ffffff;
}

.popup_close,
.popup_engineer_close,
.popup_calc_end_close {
  position: absolute;
  top: -2.2rem;
  right: -5rem;
  font-size: 4rem;
  color: #ffffff;
  border: none;
  background: transparent;
}

#intro {
  padding: 15px 20px;
  overflow: auto;
}

.pic {
  width: 200px;
  height: 297px;
  background-size: contain;
  float: left;
  margin-right: 15px;
}

.book-name {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
}
.book-author {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
}
.book-description {
  text-align: left;
}

`

export default GlobalStyle
