const express = require('express')
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()
const { File, Blob } = require('buffer')
const pinataLib = require('pinata')

const app = express()
const storage = multer.memoryStorage()
const uploader = multer({ storage: storage })

const port = process.env.PORT || 3000

// ✅ Create instance of PinataSDK
const pinata = new pinataLib.PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: 'apricot-electronic-egret-300.mypinata.cloud',
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  return res.json({ message: 'Server is working ✅' })
})

app.post('/upload-pinata', uploader.single('file'), async (req, res) => {
  try {
    const image = req.file
    const story = req.body.story
    if (!image && !story) {
      return res.status(400).json({ error: 'No file or/and story provided' })
    }
    // Convert the buffer to a Blob and then a File object
    const blobImage = new Blob([image.buffer], { type: image.mimetype })
    const imageFile = new File([blobImage], image.originalname, { type: image.mimetype })
    const blobStory = new Blob([story], { type: 'text/plain' })
    const storyFile = new File([blobStory], 'Story_' + Date.now() + '.txt', { type: 'text/plain' })
    // Upload the file using Pinata SDK instance
    const responseImage = await pinata.upload.public.file(imageFile)
    const responseStory = await pinata.upload.public.file(storyFile)

    return res.json({
      responseImage: responseImage,
      responseStory: responseStory,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ message: error.message })
  }
})

app.get('/fetch-pinata/:cid', async (req, res) => {
  try {
    const { cid } = req.params
    const data = await pinata.gateways.public.get(cid) // use SDK instance

    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})
