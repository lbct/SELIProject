import React, { Fragment, useState } from 'react'
import ResizableRect from 'react-resizable-rotatable-draggable'

const ResizableContent = props => {
  const [width, setWidth] = useState(props.width)
  const [height, setHeight] = useState(props.height)
  const [top, setTop] = useState(props.top)
  const [left, setLeft] = useState(props.left)
  const [rotateAngle, setRotateAngle] = useState(props.rotateAngle)

  const contentStyle = {
    top,
    left,
    width,
    height,
    position: 'sticky',
    transform: `rotate(${rotateAngle}deg)`
  }

  const handleResize = (style, isShiftKey, type) => {
    const { top, left, width, height } = style
    setWidth(Math.round(width))
    setHeight(Math.round(height))
    setTop(Math.round(top))
    setLeft(Math.round(left))
  }

  const handleRotate = rotateAngle => {
    setRotateAngle(rotateAngle)
    props.coordenadaCursos(rotateAngle)
    //props.coordenada(rotateAngle)
    
  }

  const handleDrag = (deltaX, deltaY) => {
    setLeft(left + deltaX)
    setTop(top + deltaY)
  }


  
  return (
    <div style={contentStyle}>{props.children}
      <div className="resizable-content-container">
        <ResizableRect
          top={top}
          rotatable
          left={left}
          aspectRatio
          minWidth={10}
          width={width}
          minHeight={10}
          height={height}
          //onDrag={handleDrag}
          onRotate={handleRotate}
        // onResize={handleResize}
          //zoomable="nw, ne, se, sw"
          rotateAngle={rotateAngle}
        />
      </div>
    </div>
  )
}

export default ResizableContent
