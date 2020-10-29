import React from 'react'
import PropTypes from 'prop-types'

const ImageDisplay = (props) => {
  return (
    <div>
      <h1>Image Display</h1>

      <div
        onClick={() => {
          props.setUrlData({ message: '', url: '' })
        }}
        className="image-display"
        style={{ position: 'relative' }}
      >
        <p className="close">Click to close</p>
        <img
          src={`http://localhost:3001/${props.urlData.url}`}
          alt="image"
          width="500"
        />
      </div>
    </div>
  )
}

ImageDisplay.propTypes = {
  urlData: PropTypes.object.isRequired,
  setUrlData: PropTypes.func,
}

export default ImageDisplay
