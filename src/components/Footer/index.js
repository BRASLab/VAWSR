import React from 'react'
import styled from 'styled-components'

const FooterP = styled.p`
  margin: 0px;
  margin-bottom: 10px;
`

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <FooterP>© YunTech 2018</FooterP>
      </footer>
    )
  }
}

export default Footer
