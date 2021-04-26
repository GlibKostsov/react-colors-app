import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
  },
}
class DraggableColorBox extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { color, name, classes } = this.props
    return (
      <div style={{ backgroundColor: color }} className={classes.root}>
        {name}
      </div>
    )
  }
}

export default withStyles(styles)(DraggableColorBox)
