import { loadConfig } from './config.js'
import { handleServerError } from './error.js'

export async function getFeaturedMovies() {
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Movie/featured?isFeatured=true`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Server error')
        }
        const data = await response.json()
        // const featuredMovies = []

        // data.forEach((value, index) => {
        //     featuredMovies.push(value['title'])
        // })

        return data

    } catch(error) {
        console.error('Error fetching featured movies:', error)
    }
}

export async function getMoviesMoviesPage({queryIdx}) {
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Movie`
    console.log(url)
    try {
        const response = await fetch(url)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Error response:', errorText)
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`)
        }

        const data = await response.json()

        if (data.length < 1) {
            throw new Error('No movies in server')
        }
        // the starting index to the end index, splitting arr
        const startIdx = queryIdx * 16
        const endIdx = startIdx + 16

        const moviesListSlice = data.slice(startIdx, endIdx)

        return moviesListSlice     

    } catch (error) {
        console.error('Error fetching movies:', error)
    }
}

export async function getMonthlyMovies() {
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Movie`
    const monthlyMovies = []
    try {
        const response = await fetch(url)
        // Check response StausCode
        // Not 2XX, error data (like what that does)
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response Body:', errorText);
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
        }

        // Access response (2XX StatusCode)
        const data = await response.json()

        for (let i = 0; i < data.length; i++){
            if (monthlyMovies.length < 13) {
                if (data[i].isFeatured === false) {
                    monthlyMovies.push(data[i].title)
                }
            }  
        }
        
        return monthlyMovies
    } catch(error) {
        console.error('Error fetching monthly movies:', error)
    }
}

export async function getMovieById({movieId}) {
    if (!movieId) {
        return
    }
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Movie/${movieId}`
    let response
    try {
        response = await fetch(url)

    } catch (error) {
        console.error('Error fetching movie:', error)
        return
    }

    // So what exactly could go wrong here
    // And what alert does
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error getting movie:', error)
            return
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        return
    }

    return data

}

export async function getMovie(movieTitle) {
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Movie/title/${movieTitle}`
    console.log(url)
    const response = await fetch(url)
    if (!response.ok) {
        handleServerError(response)
    }
    
    const movie = await response.json()
    return movie

    

    // setAbout(movie.description)
    // setDate(movie.releaseDate)
    // setGenres(movie.id)
    
    


    // movieTitleBox.textContent = movie.title
    // directorBox.textContent = `${movie.director.firstName} ${movie.director.lastName}`
    // aboutBox.textContent = movie.descriptionF
    // console.log(movie)

    
}

export async function getUsernamesByReviewId({reviewObjs}) {
    if (!reviewObjs) {
        return
    }

    const usernames = []
    reviewObjs.forEach(async (reviewObj) => {
        const reviewerId = reviewObj['reviewerId']
        if (reviewerId) {
            let reviewer
            try {
                reviewer = await getReviewerById({reviewerId: reviewerId})
                const username = !reviewer ? '' : reviewer['userName']
                usernames.push(username)
            } catch (error) {
                console.error('Error getting reviewer:', error)
            }
        } else {
            usernames.push('')
        }

    })

    return usernames
}

export async function getMovieTitleByReview({reviewObjs}){
    if (!reviewObjs) {
        return 
    }
    const movieIds = getMovieIdsFromReview({reviewObjs: reviewObjs})

    if (movieIds.length < 1) {
        return 
    }

    
    const movieTitles = await Promise.all(
        movieIds.map(async (movieId) => {
            try {
                const movie = await getMovieById({movieId: movieId})
                const movieTitle = !movie ? '' : movie['title']
                return movieTitle
                console.log(movieTitle)
            } catch (error){
                console.error('Error getting movie', error)
            }
        })

    )
    // const { apiBaseUrl } = await loadConfig()
    // const movieTitles = await
    // // const { apiBaseUrl } = await loadConfig()
    // movieIds.forEach(async (movieId) => {
    //     try {
    //         const movie = await getMovieById({movieId: movieId})
    //         const movieTitle = !movie ? '' : movie['title']
    //         movieTitles.push(movieTitle)
    //         console.log(movieTitle)
    //     } catch (error){
    //         console.error('Error getting movie', error)
    //     }
    // })


    return movieTitles

}

export function getMovieIdsFromReview({reviewObjs}) {
    if (!reviewObjs) {
        return [] 
    }

    const movieIds = []

    reviewObjs.forEach((reviewObj) => {
        if (reviewObj['movieId']) {
            movieIds.push(reviewObj['movieId'])
        }
    })

    return movieIds
    
}

export async function getTopReviews() {
    console.log('Top Reviews')
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Review/likes`
    try {
        const response = await fetch(url)
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response Body:', errorText);
            throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
        }

        const topReviews = await response.json()
        console.log(topReviews)
        return topReviews
        
    } catch(error) {
        console.error('Error fetching top reviews:', error)
    }
    

}

export async function getReviewerById({reviewerId}) {
    if (!reviewerId) {
        return
    }

    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Reviewer/${reviewerId}`

    let response
    try {
        response = await fetch(url)

    } catch (error) {
        console.error('Error fetching reviewer:', error)
        return
    }

    // So what exactly could go wrong here
    // And what alert does
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error getting reviewer:', error)
            return
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        return
    }

    return data
}

export async function getReviewerByUsername({username}) {
    if (!username) {
        return 0  // May change this
    }

    

    const { apiBaseUrl } = await loadConfig()
    const url = `http://localhost:5200/api/Reviewer/ids/${username}`

    let response
    try {
        response = await fetch(url)

    } catch (error) {
        console.error('Error fetching reviewer ID:', error)
        return
    }

    // So what exactly could go wrong here
    // And what alert does
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error getting reviewer ID:', error)
            return
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        return
    }

    return data
}

export async function getReviewsByReviewerId({reviewerId}) {
    if (!reviewerId) {
        return
    }

    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Reviewer/${reviewerId}/reviews`

    let response
    try {
        response = await fetch(url)

    } catch (error) {
        console.error('Error fetching reviews:', error)
        return
    }

    // So what exactly could go wrong here
    // And what alert does
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error getting reviews:', error)
            return
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        return
    }
    return data

}

export async function updateReviewLikes(reviewId) {
    console.log(reviewId)
    const { apiBaseUrl } = await loadConfig()
    const token = getToken()
    const url = `${ apiBaseUrl }/Review/likes/${ reviewId }`
    try {
        const response = fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
        })

        if (!response.ok) {  // What's the purpose of this in relation to the catch block....
            const errorData = await response.json()
            console.error('Like update failed:', errorData)
            // alert('Like update failed')  What's the purpse of alert...
        }
    } catch(error){
        console.error('Like update failed:', error)
    }


}

export async function getGenres(movieId) {
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Movie/${movieId}/genres`
    console.log(url)
    const response = await fetch(url)

    if (!response.ok) {
        handleServerError(response)
    }

    const genreObjs = await response.json()

    return genreObjs
   

}



export async function getReviewsByMovieId({movieId}){
    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Movie/reviews/${movieId}`
    try {
        const response = await fetch(url)

        if (!response.ok) {
            handleServerError(response)
        }

        const reviewObjs = await response.json()

        return reviewObjs
    } catch(error) {
        console.log('Error fetching reviews:', error)
    }
}

export async function postReview({userId, movieId, reviewTitle, reviewRating, reviewBody, currPage}) {
    event.preventDefault()
    if (reviewTitle.value == null) {
        return
    }
    if (reviewRating.value == null) {
        return
    }
    if (reviewBody.value == null) {
        return
    }
    // set values
    // manage error handling
    const title = reviewTitle.value
    const rating = reviewRating.value
    const body = reviewBody.value
    console.log('title', title)
    console.log('rating', rating)
    console.log('body', body)
    // reviewRating.value = parseFloat(reviewRating.value)

    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Review?reviewerId=${userId}&movieId=${movieId}`
    // Make request
    let response
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                // id: 0,
                title: title,
                stars: rating,
                description: body
            })
        })
    } catch(error) {
        console.error("Error posting review:", error)
        alert("An error occured posting the review")
        return
    }

    // Check response status
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error posting review:', error)
            alert("An error occured adding review")
            return
        }
        handleServerError(response)
        return
    }

    // Process successful response
    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        alert('Error processing server response')
        return
    }
    const rel = currPage
        
    window.location.href = rel
}

export async function getDirector({dirFirstName, dirLastName}) {
    if (!dirFirstName) {
        return
    }

    if (!dirLastName) {
        return
    }
    let dirId
    try {
        dirId = await getDirectorIdByName({dirFirstName, dirLastName})

    } catch(error) {
        console.error('Error fetching director id:', error)
        return
    }

    if (typeof dirId !== "number") {
        return
    }


    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Director/${dirId}`

    let response
    try {
        response = await fetch(url)

    } catch (error) {
        console.error('Error fetching director:', error)
        return
    }

    // So what exactly could go wrong here
    // And what alert does
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error getting director:', error)
            return
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        return
    }

    return data

}

export async function getDirectorIdByName({dirFirstName, dirLastName}) {
    if (!dirFirstName) {
        return
    }

    if (!dirLastName) {
        return
    }

    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Director/ids/${dirFirstName} ${dirLastName}`

    let response
    try {
        response = await fetch(url)

    } catch (error) {
        console.error('Error fetching director:', error)
        return
    }

    // So what exactly could go wrong here
    // And what alert does
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error getting director:', error)
            return
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        return
    }

    return data
}

export async function getMoviesByDirectorId({dirId}) {
    // http://localhost:5200/api/Director/movies/2
    if (!dirId) {
        return
    }

    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Director/movies/${dirId}`

    let response
    try {
        response = await fetch(url)

    } catch (error) {
        console.error('Error fetching movies by dir ID:', error)
        return
    }

    // So what exactly could go wrong here
    // And what alert does
    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch (error) {
            console.error('Error getting movies by dir ID:', error)
            return
        }
    }

    let data
    try {
        data = await response.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        return
    }

    return data
}

export async function updateProfilePictureBanner({user, pfpBannerForm, currPage}) {
    // event.preventDefault()
    // console.log('Sign in executed')
    const { apiBaseUrl } = await loadConfig()

    if (!user) {
        console.log('error')
        return
    }

   
    
    // Hardcoded values for fields not in the form (replace with actual values)
    const reviewerId = user.id // Example: Replace with the actual reviewer ID
    const username = user.userName // Replace with actual username
    const email = user.email // Replace with actual email
    const about = user.about // Replace with actual bio

    // Create FormData object from the form
    // const form = event.target;
    const formData = new FormData(pfpBannerForm);

    // Append additional fields to FormData
    formData.append('Id', reviewerId)
    formData.append('Username', username)
    formData.append('Email', email)
    formData.append('About', about)
    
    // eveListner('change', formvalue)
    // dynamic error handling

    const formContnents = pfpBannerForm.querySelector('.contents')
    const pfpEl = formContnents.querySelector('#pf-p')
    const bannerEl = formContnents.querySelector('#banner')

    // if (pfpEl.value === '' || pfpEl.value.length < 2) {
    //     // error hadnling on form
    //     return
    // }
    
    // if (bannerEl.value === '' || bannerEl.value.length < 2) {
    //     // error hadnling on form
    //     return
    // }

    const pfp = pfpEl.value
    const banner = bannerEl.value

    console.log('Username:', email)
    console.log('Password:', password)
    console.log(formData)
    try {
        const endpoint = `${ apiBaseUrl }/Reviewer/files/${user.id}`
        console.log(endpoint)
        const response = await fetch(endpoint, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: formData
        })

    

        if (response.ok) {
            const data = await response.json()
            const token = data.token  // Data Transfer Object (Representing our Token)

            localStorage.setItem('Bearer', token)
            
            const rel = currPage
            console.log(rel)

            window.location.href = rel
        } else {
            const errorData = await response.json()
            console.error('Login failed:', errorData)
            alert('Login failed: Invalid credentials')
        }

    } catch (error) {
        console.error("Error during login:", error)
        alert("An error occured during login")
    }
}
