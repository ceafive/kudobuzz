import React, { useState, useEffect } from 'react'
import Form from './Form'
import ImageDisplay from './ImageDisplay'
import Thumbnails from './Thumbnails'

const Main = () => {
  const [allImages, setAllImages] = useState([])
  const [newImage, setNewImage] = useState('')
  const [error, setError] = useState({
    status: false,
    message: '',
  })
  const [urlData, setUrlData] = useState({
    message: '',
    url: '',
  })

  useEffect(() => {
    fetchAllImages()
  }, [urlData])

  const fetchAllImages = async () => {
    const res = await fetch('/api/images')
    const data = await res.json()
    const imagesData = JSON.parse(data.files)
    setAllImages(imagesData)
  }

  const handleClose = () => {}

  const addImage = async (e) => {
    try {
      e.preventDefault()
      if (!newImage)
        return setError({ status: true, message: 'Please select image' })

      const formData = new FormData()
      formData.append('image', newImage)
      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      setUrlData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    const file = files[0]
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setError({
        status: true,
        message: 'Only images with ext .jpg and .jpeg are accepted',
      })
      return
    }
    if (file.size > 5000000) {
      setError({
        status: true,
        message: 'Image too large, select image below 500KB',
      })
      return
    }
    setError({
      status: false,
      message: '',
    })
    setNewImage(file)
  }

  const thumbnails = allImages.filter((image) => image.includes('thumbnail'))
  return (
    <div className="container">
      {thumbnails.length > 0 && <Thumbnails thumbnails={thumbnails} />}
      {urlData.url && (
        <ImageDisplay urlData={urlData} setUrlData={setUrlData} />
      )}
      <Form handleChange={handleChange} addImage={addImage} />
      {error && <p className="error">{error.message}</p>}
      {urlData.message && <p className="info">{urlData.message}</p>}
    </div>
  )
}

export default Main
