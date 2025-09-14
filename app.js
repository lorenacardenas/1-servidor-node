const express = require('express')
const multer  = require('multer')
const sharp = require('sharp')
const fs = require('fs')


const upload = multer({ storage: multer.memoryStorage()})

const app = express()

app.use(express.json())

app.get('/', function(req, res) {
    res.send('Hola mundo!!!')
})

app.post('/imagen', upload.single('imagen'), async function(req, res){

    const body = req.body
    const imagen = req.file
    const processedImage = sharp(imagen.buffer)
    const resizedImage = processedImage.resize(800,800, {
        fit: 'contain'
    })

    const resizedImageBuffer = await resizedImage.toBuffer()

    fs.writeFileSync('imagenes/trt.png', resizedImageBuffer)

    console.log(resizedImageBuffer)

    res.send({resizedImage: resizedImageBuffer})
})
app.listen(3000)