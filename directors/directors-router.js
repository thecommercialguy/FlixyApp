const express = require('express')
const router = express.Router({ mergeParams: true })
const path = require('path')


router.use(express.static(__dirname))
router.use(express.static(path.join(__dirname, '..', 'images')))
router.use(express.static(path.join(__dirname, '..', 'fonts')))
router.use(express.static(path.join(__dirname, '..', 'assets')))
router.use(express.static(path.join(__dirname, 'css-director', 'global')))
router.use(express.static(path.join(__dirname, 'css-director', 'components')))
// router.use(express.static(path.join(__dirname, 'css-director')))
router.use(express.static(path.join(__dirname, 'js-director')))

// router.use(express.static(path.join(__dirname, 'css-movies', 'components')))



router.route('/:directorName').
    get((req, res) => {
        res.sendFile(path.join(__dirname, 'director.html'))
        
    })
    .post((req, res) => {
        const formData = res.body
        res.sendFile(path.join(__dirname, 'director.html'))
    })



module.exports = router