/* eslint-disable linebreak-style */
import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from '@mui/material'

const Togglable = forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref,() => {
    return { toggleVisibility }
  })
  return (
    <Container style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <Button onClick={toggleVisibility}>{props?.buttonHide || 'cancel'}</Button>
       
        {props.children}
      </div>
    </Container>
  )
})
Togglable.propTypes =
 { buttonLabel: PropTypes.string.isRequired }

Togglable.displayName = 'Togglable'
export default Togglable