import React, { Component } from 'react'
//Material UI Styling
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
//Box Drag & Drop
import { SortableElement } from 'react-sortable-hoc'

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.1)',
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    padding: '10px',
    left: '0px',
    bottom: '0px',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
}
const DraggableColorBox = SortableElement((props) => {
  const { color, name, classes, handleClick } = props
  return (
    <div style={{ backgroundColor: color }} className={classes.root}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
      {name}
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox)
