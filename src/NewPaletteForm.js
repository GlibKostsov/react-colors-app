import React, { Component } from 'react'
//Material UI Styling
import { withStyles } from '@material-ui/core/styles'
//Material UI Drawer Component
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
//Color Picker Component
import { ChromePicker } from 'react-color'
//Form Validator Component
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
//Box Drag & Drop
import { arrayMove } from 'react-sortable-hoc'
//Local Components
import DraggableColorList from './DraggableColorList'
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'

const drawerWidth = 400

const styles = (theme) => ({
  root: {
    display: 'flex',
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
  },
  button: {
    width: '50%',
  },
})

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors,
    }

    this.addNewColor = this.addNewColor.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.clearColors = this.clearColors.bind(this)
    this.addRandomColor = this.addRandomColor.bind(this)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
    newPalette.colors = this.state.colors
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  addNewColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: '',
    })
  }
  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorName),
    })
  }

  clearColors() {
    this.setState({ colors: [] })
  }

  addRandomColor() {
    const allColors = this.props.palettes.map((p) => p.colors).flat()
    var rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    this.setState({ colors: [...this.state.colors, randomColor] })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  }
  render() {
    const { classes, maxColors, palettes } = this.props
    const { open, colors } = this.state
    const paletteIsFull = colors.length >= maxColors

    return (
      <>
        <div className={classes.root}>
          <PaletteFormNav
            open={open}
            palettes={palettes}
            handleSubmit={this.handleSubmit}
            handleDrawerOpen={this.handleDrawerOpen}
          />
          <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <Divider />

            <div className={classes.container}>
              <Typography variant='h4' gutterBottomq>
                Design Your Palette
              </Typography>
              <div className={classes.buttons}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={this.clearColors}
                  className={classes.button}
                >
                  Clear Palette
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={paletteIsFull}
                  onClick={this.addRandomColor}
                  className={classes.button}
                >
                  Random Color
                </Button>
              </div>
              <ColorPickerForm
                paletteIsFull={paletteIsFull}
                addNewColor={this.addNewColor}
                colors={colors}
              />
            </div>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <DraggableColorList
              colors={colors}
              removeColor={this.removeColor}
              axis='xy'
              onSortEnd={this.onSortEnd}
            />
          </main>
        </div>
      </>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)
