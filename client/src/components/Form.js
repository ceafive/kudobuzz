import React from 'react'

const Form = (props) => {
  return (
    <div>
      <form encType="multipart/form-data">
        <input
          type="file"
          name="image"
          accept="['image/jpg', 'image/jpeg', 'image/png']"
          onChange={props.handleChange}
        />
        <button onClick={props.addImage}>Upload Image</button>
      </form>
    </div>
  )
}

export default Form
