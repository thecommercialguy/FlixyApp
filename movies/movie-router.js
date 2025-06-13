const express = require('express')
const router = express.Router({ mergeParams: true })
const path = require('path')


router.use(express.static(__dirname))
router.use(express.static(path.join(__dirname, '..', 'images')))
router.use(express.static(path.join(__dirname, '..', 'fonts')))
router.use(express.static(path.join(__dirname, '..', 'assets')))
router.use(express.static(path.join(__dirname, 'css-movie', 'global')))
router.use(express.static(path.join(__dirname, 'css-movie', 'components')))
router.use(express.static(path.join(__dirname, 'css-movies')))
router.use(express.static(path.join(__dirname, 'css-movies', 'global')))
router.use(express.static(path.join(__dirname, 'css-movies', 'components')))
router.use(express.static(path.join(__dirname, 'js-movie')))

// router.use(express.static(path.join(__dirname, 'css-movies', 'components')))



router.route('/').
    get((req, res) => {
        res.sendFile(path.join(__dirname, 'movies.html'))
        
    })
    .post((req, res) => {
        const formData = res.body
        res.sendFile(path.join(__dirname, 'movies.html'))
    })


// router.route('/s').
//     get((req, res) => {
//         res.sendFile(path.join(__dirname, 'movie-2.html'))
//     })
//     .post((req, res) => {
//         const formData = res.body
//         console.log(req)
//         console.log('jjj')

//         res.sendFile(path.join(__dirname, 'movie-2.html'))
//     })

router.route('/:movieTitle').
    get((req, res) => {
        console.log(req.params.movieTitle)
        // res.sendFile(path.join(__dirname, 'movie.html'))
        res.sendFile(path.join(__dirname, 'movie.html'))
    })
    .post((req, res) => {
        const formData = res.body
        console.log(req)
        console.log('jjj')

        // res.sendFile(path.join(__dirname, 'movie.html'))
        res.sendFile(path.join(__dirname, 'movie.html'))
    })

    module.exports = router