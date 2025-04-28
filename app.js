require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT

// app.set('view engine', 'ejs')
// app.set("views", path.join(__dirname))

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname,'js')))
app.use(express.static(path.join(__dirname,'images')))
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'fonts')))
app.use(express.static(path.join(__dirname,'css')))
app.use(express.static(path.join(__dirname,'css','global')))
app.use(express.static(path.join(__dirname,'css','components')))

// app.use(express.static(path.join(__dirname,'assets')))


const movies = require('./movies/movie-router.js')
const directors = require('./directors/directors-router.js')
const users = require('./users/users-router.js')

app.get('/config', (req, res) => {
    res.json({
        apiBaseUrl: process.env.API_BASE_URL
    })
})


app.route('/').
    get((req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'))
    })
    .post((req, res) => {
        const formData = res.body
        res.sendFile(path.join(__dirname, 'index.html'))
    })
app.route('/a').
    get((req, res) => {
        res.sendFile(path.join(__dirname, 'index2.html'))
    })
    .post((req, res) => {
        const formData = res.body
        res.sendFile(path.join(__dirname, 'index.html'))
    })

app.use('/movies', movies)
app.use('/directors', directors)
app.use('/users', users)





// app.get('/movies', async (req,res) => {
//     try {
//     // Fetch movie data from your API
//     const response = await fetch('http://localhost:5200/api/Movie/featured?isFeatured=true')
//     const movies = await response.json()
//     let featuredMovies = []
    
//     for (let i = 0; i < movies.length; i++) {
//         // console.log(movies[i].title)
//         if (movies[i].isFeatured === true) {
//             featuredMovies.push(movies[i])
//         }
//     }

//     // Render the index.html template and pass the movie data
//     res.send({featuredMovies: featuredMovies})
//     // res.render('index.html', { data: data });
//     } catch (error) {
//         console.error('Error fetching movie data:', error);
//         // Handle the error appropriately, e.g., send an error response
//         res.status(500).send('Error fetching movie data');
//     }
// })

// app.get('/ejs', async (req, res) => {
//     try {
//         // Fetch movie data from your API
//         const response = await fetch('http://localhost:5200/api/Movie')
//         const movies = await response.json()
//         let monthlyMovies = []
        
//         for (let i = 0; i < 13; i++) {
//             // console.log(movies[i])
//             // const title = movies[i].title.toLowerCase().trim().split(" ").join("-")
//             const title = movies[i].title.toLowerCase().trim().split(" ").join("-")
//             monthlyMovies.push(title)
//             console.log(title)

//             // monthlyMovies

//         }

//         /*
//             const monthly = await getMonthlyMovies()
//             monthlySliderImages.forEach((image, index) => {
//                 let title = monthly[index].toLowerCase().trim().split(" ").join("-")
//                 image.src = `/images/${title}-portrait.png`
//                 console.log(title)
//             })

//             console.log(monthly[0].toLowerCase().split(" ").join("-"))
//             // console.log(monthly[0].toLowerCase().oin(" "))j
//         }*/
    
//         // Render the index.html template and pass the movie data
//         // res.send({monthlyMovies: monthlyMovies})
//         res.render('index.ejs', { monthlyMovies: monthlyMovies }, {async: true})
//         } catch (error) {
//             console.error('Error fetching movie data:', error);
//             // Handle the error appropriately, e.g., send an error response
//             res.status(500).send('Error fetching movie data');
//         }

//     // res.render('index', { message: 'Hello, World!' })
// })


app.listen(port, () => {
    console.log(`Testing ${port}`)
})