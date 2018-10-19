import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Slider = styled.div`
  height: 40px;
  position: relative;
  width: 100%;
`

const Bar = styled.div`
  border-radius: 4px;
  display: block;
  height: 8px;
  overflow: hidden;
  position: relative;
  top: 16px;
  width: 100%;
`
const BarFill = styled.div`
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  transition: width 35ms ease;
`

const Track = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 5px;
  left: 5px;
`

const Grabber = styled.div`
  background: #fff;
  border: 1px solid #dcddde;
  position: absolute;
  border-radius: 3px;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  cursor: ew-resize;
  height: 24px;
  left: 0px;
  margin-left: -5px;
  margin-top: -13px;
  top: 50%;
  width: 10px;
`

class Meter extends React.Component {
  static propTypes = {
    threshold: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    handleMouse: PropTypes.func.isRequired
  }

  render() {
    const { width, threshold, handleMouse } = this.props
    return (
      <Slider>
        <Bar
          style={{ background: 'rgb(105, 196, 154) none repeat scroll 0% 0%' }}>
          <BarFill
            style={{
              width: threshold + '%',
              background: 'rgb(251, 184, 72) none repeat scroll 0% 0%'
            }}
          />
        </Bar>
        <Bar
          style={{
            position: 'absolute',
            top: '16px',
            background: 'transparent'
          }}>
          <BarFill style={{ width: width + '%' }} />
        </Bar>
        <Track onMouseDown={handleMouse}>
          <Grabber
            onMouseDown={handleMouse}
            style={{ left: threshold + '%' }}
          />
        </Track>
      </Slider>
    )
  }
}

export default Meter
