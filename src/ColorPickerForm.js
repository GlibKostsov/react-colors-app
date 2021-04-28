import React, { Component } from 'react'
//Material UI Styling
import { withStyles } from '@material-ui/core/styles'
//Material UI Drawer Component
import Button from '@material-ui/core/Button'
//Color Picker Component
import { ChromePicker } from 'react-color'
//Form Validator Component
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem',
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fonstSize: '2rem',
  },
  colorNameInput: {
    width: '100%',
    height: '70px',
  },
}

class ColorPickerForm extends Component {
  constructor(props) {
    super(props)
    this.state = { currentColor: 'teal', newColorName: '' }
    this.updateCurrentColor = this.updateCurrentColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    )
    ValidatorForm.addValidationRule('isColorUnique', (value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    )
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    }
    this.props.addNewColor(newColor)
    this.setState({ newColorName: '' })
  }
  render() {
    const { paletteIsFull, classes } = this.props
    const { currentColor, newColorName } = this.state
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
          <TextValidator
            value={newColorName}
            className={classes.colorNameInput}
            placeholder='Color Name'
            name='newColorName'
            variant='filled'
            margin='normal'
            onChange={this.handleChange}
            validators={['required', 'isColorUnique', 'isColorNameUnique']}
            errorMessages={[
              'Enter a color name',
              'Color already used!',
              'Color name must be unique!',
            ]}
          />
          <Button
            className={classes.addColor}
            variant='contained'
            type='submit'
            color='primary'
            disabled={paletteIsFull}
            style={{
              backgroundColor: paletteIsFull
                ? 'rgba(0, 0, 0, 0.12)'
                : currentColor,
            }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Colors'}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ColorPickerForm)
