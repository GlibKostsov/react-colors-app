import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//Material UI Styling
import { withStyles } from '@material-ui/core/styles'
//Material UI Drawer Component
import classNames from 'classnames'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
//Color Picker Component
import { ChromePicker } from 'react-color'
//Form Validator Component
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
//Box Drag & Drop
import { arrayMove } from 'react-sortable-hoc'
//Local Components
import DraggableColorList from './DraggableColorList'

const drawerWidth = 400

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'spaceBetween',
  },
})

class PaletteFormNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPaletteName: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  render() {
    const { classes, open, handleSubmit } = this.props
    const { newPaletteName } = this.state
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={this.props.handleDrawerOpen}
              edge='start'
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
              <TextValidator
                label='Palette Name'
                name='newPaletteName'
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already used']}
              />
              <Button type='submit' variant='contained' color='primary'>
                Save Palette
              </Button>
            </ValidatorForm>

            <Link to='/'>
              <Button variant='contained' color='secondary'>
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)
