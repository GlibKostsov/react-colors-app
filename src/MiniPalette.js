import React from 'react'
import styles from './styles/MiniPaletteStyles'
import { withStyles } from '@material-ui/styles'

function MiniPalette(props) {
  const { classes, paletteName: name, emoji, colors } = props
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ))

  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {name} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette)
