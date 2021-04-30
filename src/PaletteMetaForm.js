import React, { Component } from 'react'
//Material UI Dialog Form
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
//Material UI Validdator Form
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
//Emoji Picker Component
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

export default class PaletteMetaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 'form',
      newPaletteName: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.showEmojiPicker = this.showEmojiPicker.bind(this)
    this.savePalette = this.savePalette.bind(this)
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

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  showEmojiPicker() {
    this.setState({ stage: 'emoji' })
  }

  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    }
    this.props.handleSubmit(newPalette)
    this.setState({ stage: '' })
  }

  render() {
    const { open, newPaletteName } = this.state
    const { handleSubmit, hideForm } = this.props
    return (
      <div>
        <Dialog open={this.state.stage === 'emoji'}>
          <DialogTitle id='form-dialog-title'>
            Choose a Palette Emojie
          </DialogTitle>
          <Picker onSelect={this.savePalette} title='Pick a Palette Emoji' />
        </Dialog>

        <Dialog
          open={this.state.stage === 'form'}
          onClose={hideForm}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            Choose a Palette Name
          </DialogTitle>

          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure
                it's unique!
              </DialogContentText>

              <TextValidator
                label='Palette Name'
                name='newPaletteName'
                value={newPaletteName}
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already used']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color='primary'>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    )
  }
}
