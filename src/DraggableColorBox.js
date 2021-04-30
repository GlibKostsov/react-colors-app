import React from 'react'
//Material UI Styling
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
//Box Drag & Drop
import { SortableElement } from 'react-sortable-hoc'
//Local Styles
import styles from './styles/DraggableColorBoxStyles'

const DraggableColorBox = SortableElement((props) => {
  const { color, name, classes, handleClick } = props
  return (
    <div style={{ backgroundColor: color }} className={classes.root}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox)
