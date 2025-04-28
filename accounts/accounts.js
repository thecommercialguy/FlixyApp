const express = require('express')
const router = express.Router({ mergeParams: true })
const path = require('path')


router.use(express.static(__dirname))
router.use(express.static(path.join(__dirname, '..', 'images')))
router.use(express.static(path.join(__dirname, '..', 'fonts')))
router.use(express.static(path.join(__dirname, '..', 'assets')))
router.use(express.static(path.join(__dirname, 'css-sign-in')))
router.use(express.static(path.join(__dirname, 'css-sign-in', 'global')))
router.use(express.static(path.join(__dirname, 'css-sign-in', 'components')))
// router.use(express.static(path.join(__dirname, 'css-sign-in')))
router.use(express.static(path.join(__dirname, 'css-sign-in', 'global')))
router.use(express.static(path.join(__dirname, 'css-sign-in', 'components')))



router.get('/sign_in', (req, res) => {
    res.sendFile(path.join(__dirname, 'sign-in.html'))
    
})

router.get('/sign_up', (req, res) => {
    res.sendFile(path.join(__dirname, 'sign-up.html'))
})

module.exports = router