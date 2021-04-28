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
import PaletteMetaForm from './PaletteMetaForm'

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
    alignItems: 'center',
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
    marginRight: '1rem',
    '& a': {
      textDecoration: 'none',
    },
  },
  button: {
    margin: '0 0.5rem',
  },
})

class PaletteFormNav extends Component {
  constructor(props) {
    super(props)
    this.state = { formShowing: false }
    this.showForm = this.showForm.bind(this)
  }

  showForm() {
    this.setState({ formShowing: true })
  }

  render() {
    const {
      classes,
      open,
      palettes,
      handleSubmit,
      handleDrawerOpen,
    } = this.props
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
              onClick={handleDrawerOpen}
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
            <Link to='/'>
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant='contained'
              color='primary'
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && (
          <PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes} />
        )}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)
