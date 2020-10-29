import React from 'react'
import PropTypes from 'prop-types'

const Thumbnails = (props) => {
  return (
    <div>
      <h1>Thumbnails</h1>
      <div className="images-grid">
        {props.thumbnails.map((name) => {
          return (
            <img
              className="thumbnail"
              key={name}
              src={`http://localhost:3001/uploads/${name}`}
              alt="thumbnail"
            />
          )
        })}
      </div>
    </div>
  )
}

Thumbnails.propTypes = {
  thumbnails: PropTypes.array.isRequired,
}

export default Thumbnails
