import React from 'react'
//Box Drag & Drop
import { SortableContainer } from 'react-sortable-hoc'
//Local Components
import DraggableColorBox from './DraggableColorBox'

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  )
})

export default DraggableColorList
