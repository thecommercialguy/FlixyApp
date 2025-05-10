// Better documentation
export function setMovieCards({titles, movieCardCont}) {
    if (!movieCardCont) {
        console.log('err1')
        return
    }

    if (!titles) {
        console.log('err2')
        return
    }

    // contentSlider.innerHTML = ''
    // console.log(titles)
    titles.forEach((title, index) => {
        const cardContainer = document.createElement('div')
        cardContainer.className = 'idx-cont'
        cardContainer.dataset.slideIdx = index

        const cardImg = document.createElement('img')
        cardImg.className = 'idx-image'
        setSrc({title: title, el: cardImg})
        console.log('cardImg')
        const cardLink = document.createElement('a')
        cardLink.className = 'idx-link'
        setHref({title: title, el: cardLink})

        cardContainer.appendChild(cardImg)
        cardContainer.appendChild(cardLink)

        movieCardCont.appendChild(cardContainer)
    })

    console.log('dlfjkljf')


    // const sliderEls = contentSlider.querySelectorAll('.idx-cont')

    // if (!sliderEls) {
    //     return
    // }

    // sliderEls.forEach((sliderEl,index) => {

    //     const sliderImg = sliderEl.querySelector('.idx-image')
    //     const sliderLink = sliderEl.querySelector('.idx-link')
    //     if (titles[index]) {
    //         setSrc({title: titles[index], el: sliderImg}) 
    //         setHref({title: titles[index], el: sliderLink})
    //     }

    // })
    
}

export function setPfp({pfpUrl, el}) {
    if (!pfpUrl) {
        el.src = '../assets/default-pfp.png'
        return
    }
    console.log(pfpUrl)

    el.src = pfpUrl
}

export function setBanner({bannerUrl, el}) {
    if (!bannerUrl) {
        console.log("dkfdhjk")
        return
    }

    console.log(bannerUrl)
    el.style.backgroundImage = `url(${bannerUrl})`
}

export function setSrc({title, el}) {
    if (title !== 'poor-things') {
        el.src = `../images/${title}-portrait.png`
        return
    }
    el.src = `../images/${title}-portrait.jpg`

}

export function setHref({title, el}) {
    el.href = `/movies/${title}`

}

export async function setImgSrcs({movieList, imageEls}) {
    const preloadPromises = movieList.map((movie, index) => {
        const title =  movie.toLowerCase().trim().split(" ").join("-")
        return new Promise((resolve) => {
            const img = new Image();
            if (title === 'poor-things'){
                img.src = `/images/${title}-portrait.jpg` 
            }
            else {
                img.src = `/images/${title}-portrait.png`   
            }
            
            img.onload = () => resolve({ index, title })
            img.onerror = () => {
                console.error(`Failed to preload image: /images/${title}-portrait.png`)
                resolve({ index, title: 'placeholder '})  // Resolving the error..
            }
        })
    })

    const preloaded = await Promise.all(preloadPromises)
    console.log('All images preloaded:', preloaded.map(p=> p.title))

    imageEls.forEach((image, index) => {
        const { title } = preloaded.find(p => p.index == index) || {  title: movieList[index].toLowerCase().trim().split(" ").join("-") }
        if (title === 'poor-things'){
            image.src = `/images/${title}-portrait.jpg` 
        }
        else {
            image.src = `/images/${title}-portrait.png`   
        }
        // image.src = `/images/${title}-portrait.png`
        console.log(`Featured portraits ${index}: /images/${title}-portrait.png`)
    })
}

export async function setFeaturedSectionBannerSrcs({movieList, sliderImages}) {
    const preloadedPromises = movieList.map((movie, index) => {
        const title = movie.toLowerCase().trim().split(" ").join("-")
        return new Promise((resolve) => {
            const img = new Image()
            if (title === 'poor-things'){
                img.src = `/images/${title}-banner.jpg` 
            }
            else {
                img.src = `/images/${title}-banner.png`   
            }
            img.onload = () => resolve({ index, title })
            img.onerror = () => {
                console.error(`Failed to preload image: /images/${title}-banner.png`)
                resolve({ index, title: 'placeholder' })
            }
        })
    })

    const preloaded = await Promise.all(preloadedPromises)
    console.log('All images preloaded:', preloaded.map(p => p.title))

    sliderImages.forEach((image, index) => {
        const { title } = preloaded.find(p => p.index == index) || { title: movieList[index].toLowerCase().trim().split(" ").join("-") }
        console.log('Chekcing titles', title)

        if (title === 'poor-things'){
            image.src = `/images/${title}-banner.jpg` 
        }
        else {
            image.src = `/images/${title}-banner.png`   
        }
        // console.log(`Set src for index ${index}: /images/${title}-banner.png`)

    })
}

export async function setMonthlySectionImgSrcs(monthlyMovies, monthlySliderImages) {
    // const monthly = await getMonthlyMovies()
    // monthlySliderImages.forEach((image, index) => {
    //     let title = monthlyMovies[index].toLowerCase().trim().split(" ").join("-")
    //     image.src = `/images/${title}-portrait.png`
    //     console.log(title)
    // })
    console.log(monthlyMovies)
    const preloadPromises = monthlyMovies.map((movie, index) => {
        const title = movie.toLowerCase().trim().split(" ").join("-")
        console.log(movie, index)
        return new Promise((resolve) => {
            const img = new Image();
            img.src = `/images/${title}-portrait.png`
            img.onload = () => resolve({ index, title }) // Resolve when loaded
            img.onerror = () => {
                console.error(`Failed to preload image: /images/${title}-portrait.png`)
                resolve({ index, title: 'placeholder' }) // Fallback on error
            }
        })
    })

    // Wait for all images to preload
    const preloaded = await Promise.all(preloadPromises)
    // console.log(preloadPromises)
    // console.log('All images preloaded:', preloaded.map(p => p.title))

    // Set src on visible images
    monthlySliderImages.forEach((image, index) => {
        const { title } = preloaded.find(p => p.index === index) || { title: monthlyMovies[index].toLowerCase().trim().split(" ").join("-") }
        image.src = `/images/${title}-portrait.png`
        // console.log(`Set src for index ${index}: /images/${title}-portrait.png`)
    })

}


export async function setMonthlySectionContentHref(monthlyMovies, monthlySliderContent) {
    // const monthlyMovies = await getMonthlyMovies()  // Array
    monthlySliderContent.forEach((movie, index) => {
        const movieTitle = monthlyMovies[index].toLowerCase().trim().split(" ").join("-")
        movie.href = `/movies/${movieTitle}`
        console.log(movieTitle)
    })
}
// as opposed to when THIS content loads...
export function setTitlesFeatured({movieTitles, headerEls}) {
    headerEls.forEach((header, index) => {
        header.textContent = movieTitles[index]
    })
}

export function setDirectorsFeatured({directorNames, headerEls}) {
    if (directorNames.length < 1) {
        return 
    }
    headerEls.forEach((header, index) => {
        header.textContent = directorNames[index]
    })
}

export function setMoviesHref({movieTitles, linkEls}){
    let i = 0
    while (i < movieTitles.length) {
        const movieTitle = formatTitle({title: movieTitles[i]})
        linkEls[i].href = `/movies/${movieTitle}`
        console.log(movieTitle)
        i++
    }
    // linkEls.forEach((el, index) => {
    //     if (movieTitles[index]) {
    //         const movieTitle = formatTitle({title: movieTitles[index]})
    //         el.href = `/movies/${movieTitle}`
    //         console.log(movieTitle)
    //     } else {
    //         console.log('no title')
    //         el.href = ''

    //     }
    

    // })
}
export function setDirectorsHref({directorNames, linkEls}){
    if (directorNames.length < 1) {
        return 
    }
    linkEls.forEach((el, index) => {
        const directorName = formatTitle({title: directorNames[index]})
        // el.href = `/directors/${movieTitle}`
        console.log(directorName)
    })
}

export async function setReviewCardsSlider({reviews, movieTitles, usernames, reviewSliderContent}){
    
    for (let i = 0; i < reviewSliderContent.length; i++ ){

        // const profilePic = card.querySelector('.profile-pictu');
        // adding the movie which was reviewed to the card

        const title = reviewSliderContent[i].querySelector('.review-title')
        const movieLink = reviewSliderContent[i].querySelector('.movie-reviewed-link')
        const movieTitle = reviewSliderContent[i].querySelector('.movie-reviewed')
        // console.log('mt', movieTitle)
        const userName = reviewSliderContent[i].querySelector('.username')
        const description = reviewSliderContent[i].querySelector('.review-body')
        const rating = reviewSliderContent[i].querySelector('.rating')
        const likeCount = reviewSliderContent[i].querySelector('.num-likes')
        console.log(likeCount)
        if (reviews[i]) {
            reviewSliderContent[i].dataset.id = reviews[i]['id']
            movieLink.href = `./movies/${formatTitle({title: movieTitles[i]})}`
            movieTitle.textContent = movieTitles[i]
            title.textContent = reviews[i]['title']
            userName.textContent = usernames[i]
            rating.textContent = `${reviews[i]['stars']}/5`
            description.textContent = reviews[i]['description']
            likeCount.textContent = `(${reviews[i]['likes']})`
        }
    }
    // if (isAuthenticatedBool() == true){
    //     likeButtons.forEach((button) => {
    //             const rC = button.closest('.review-card')
    //             const id = rC.dataset.id
    //             console.log(id, "Chekcing id")
    //             console.log(rC, "Chekcing id")
    //             if (id){
    //                 console.log(id)
    //             button.addEventListener('click', () => updateReviewLikes(id))
    //             }
    //         })
    // }
}
// Distingusishing elements from variables
export function setUserNameTextHeader(username, signInTextHeader) {
    signInTextHeader.textContent = username
    
}

export function setUserNameTextFooter(username, signInTextFooter) {
    signInTextFooter.textContent = username
    
}

export function setSignOutText(signUpText) {
    signUpText.textContent = 'Sign Out'
    
}

export function setSignInHrefHeader(username, signInButtonHeader) {
    signInButtonHeader.href = `users/${username}`
    
}

export function setSignInHrefFooter(username, signInButtonFooter) {
    signInButtonFooter.href = `users/${username}`
    
}
// For normal ol' text elements
export function setElementText({text, el}){
    el.textContent = text

}
export function setAbout({about, aboutBox}) {
    aboutBox.textContent = about

}

export function setReleaseDate({releaseDate, releaseDateEl}) {
    console.log('Raw Release Date:', releaseDate)
    const releaseDateFormatted = formatReleaseDate(releaseDate)

    console.log('Formatted Release Date:', releaseDateFormatted)
    releaseDateEl.textContent = releaseDateFormatted  
}

export function setTitleMoviePage({title, movieTitleBox}) {
    movieTitleBox.textContent = title

}

export function setDirectorMoviePage({directorObj, directorBox}) {
    directorBox.textContent = `${directorObj.firstName} ${directorObj.lastName}`

}

export function setDirectorHeader({firstName, lastName, directorBox}) {
    if(!firstName) {
        return
    }

    if(!lastName) {
        return
    }

    const firstNameDiv = directorBox.querySelector('.first-name')
    const lastNameDiv = directorBox.querySelector('.last-name')

    firstNameDiv.textContent = firstName
    lastNameDiv.textContent = lastName


}

export function setGenresMoviePage({genres, genresEl}) {
    const genreText = formatGenresToString(genres)
    genresEl.textContent = genreText

}

export function formatGenresToString(genres) {
    const genreList = []

    for (let i = 0; i < genres.length; i++){
        genreList.push(genres[i].title)
        console.log(genres[i].title)
    }

    const genreString = genreList.join(' ')

    return genreString

}

export function formatReleaseDate(date) {
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }

    const days = {
        '01': '1',
        '02': '2',
        '03': '3',
        '04': '4',
        '05': '5',
        '06': '6',
        '07': '7',
        '08': '8',
        '09': '9',
    }

    const dateSplit = date.split("-")
    const month = months[dateSplit[1]]
    const day = dateSplit[2] in days ? days[dateSplit[2]] : dateSplit[2]

    const dateFormatted = `${months[dateSplit[1]]} ${day}, ${dateSplit[0]}`
    return dateFormatted
}

// Global counter for managing review index
// let currReview = 

export function setReviewCardsMoviePage({reviewList, reviewsContainer, backButton, nextButton, currReviewSlice}) {
    if (!reviewsContainer) {
        console.error('Reviews container not found')
        return
    }

    if (reviewList.length < 1) {
        reviewsContainer.innerHTML = '<p class="review-card-null">No reviews, yet.</p>'
        // styling this...
        return
    }

    const reviewsPerLoad = 3  // Three reviews per page load

    
    backButton.style.display = 'flex'
    nextButton.style.display = 'flex'
    
    // backButton.disable = curr == 0
    // nextButton.disable = currReviewIdx == reviewList.length - reviewsPerLoad - 1

    const currIdx = currReviewSlice * reviewsPerLoad
    console.log(currIdx)
    // Displaying first three reviews
    
    for (let i = currIdx; i < currIdx + reviewsPerLoad; i++) {
        const review = reviewList[i]
        // console.log(review)
        if (review != null) {
            console.log('Checking this', review)
            const reviewCard = createReviewCard({review: review})
            reviewsContainer.appendChild(reviewCard)
        }
    }

    // console.log(currReviewIdx)

    // reviewsList.slice(i, 3)



    // reviewList.forEach(review => {
    //     console.log(review)
    //     const reviewCard = createReviewCard({review: review})
    //     reviewsContainer.appendChild(reviewCard)
    // })


}

export function createReviewCard({review}) {
    const reviewCard = document.createElement('div')  // Creating a specific HTML element
    reviewCard.className = 'review-card'  // ".className", setting the class name of a DOM elt

    const profilePictureContainer = document.createElement('div')
    profilePictureContainer.className = 'profile-picture'

    // ReviewData <- reviewCard
    const reviewDataContainer = document.createElement('div')
    reviewDataContainer.className = 'review-data'

    // reviewTitle <- reviewData
    const reviewTitle = document.createElement('h3')
    reviewTitle.className = 'review-title'
    reviewTitle.textContent = review['title'] || 'Untitled'

    // usernameRatingBox <- reviewData
    const usernameRatingContaier = document.createElement('div')
    usernameRatingContaier.className = 'username-rating'

    const userLink = document.createElement('a')
    userLink.className = 'user-link'

    const username = document.createElement('span')
    username.className = 'username'
    username.textContent = `@${review['reviewer']['userName']}` || '@thecommercialguy'

    userLink.appendChild(username)

    const ratingContainer = document.createElement('span')
    ratingContainer.className = 'rating-container'

    const starIcon = document.createElement('i')
    starIcon.className = 'bx bxs-star'

    const rating = document.createElement('span')
    rating.className = 'rating'
    rating.textContent = `${review['stars']}/5`

    ratingContainer.appendChild(starIcon)
    ratingContainer.appendChild(rating)

    usernameRatingContaier.appendChild(userLink)
    usernameRatingContaier.appendChild(ratingContainer)


    const reviewBody = document.createElement('p')
    reviewBody.className = 'review-body'
    reviewBody.textContent = review['description']

    const likeContainer = document.createElement('div')
    likeContainer.className = 'like-count'

    const likeIcon = document.createElement('i')
    likeIcon.className = 'bx bx-like like likes'

    const likeCount = document.createElement('span')
    likeCount.className = 'num-likes'
    likeCount.textContent = `(${review['likes']})` || '(0)'

    likeContainer.appendChild(likeIcon)
    likeContainer.appendChild(likeCount)

    reviewDataContainer.appendChild(reviewTitle)
    reviewDataContainer.appendChild(usernameRatingContaier)
    reviewDataContainer.appendChild(reviewBody)
    reviewDataContainer.appendChild(likeContainer)

    reviewCard.appendChild(profilePictureContainer)
    reviewCard.appendChild(reviewDataContainer)

    return reviewCard


    //setAttribute('class','className')
    // const att = document.createAttribute('class(valid-attribute)')
    // att.value = value-of-attribute 
    // elt.setAttribute(att)  (Basically setting the attribute to a DOM element)


}

// Abstract this
export function setReviewFormMeta({title, director, portraitSrc, reviewFormMetaEl}) {
    if (reviewFormMetaEl == null) {
        return
    }

    if (title == null) {
        // Some default
        return
    }

    if (director == null) {
        // Some default
        return
    }

    if (portraitSrc == null) {
        // Some default
        return
    }

    const portraitEl = reviewFormMetaEl.querySelector('.portrait')
    const portraitMetaEl = reviewFormMetaEl.querySelector('.portrait-meta')
    const portraitHeaderEl = portraitMetaEl.querySelector('.portrait-header')
    const directorNameEl = portraitMetaEl.querySelector('.director-name')

    portraitEl.src = portraitSrc
    setTitleMoviePage({title: title, movieTitleBox: portraitHeaderEl})
    setDirectorMoviePage({directorObj: director, directorBox: directorNameEl})



 

}

export async function getMovieTitlesToList({movies}) {
    const titles = []
    movies.forEach((movie, index) => {
        titles.push(movie['title'])
    })

    return titles
}

export async function getFeaturedMovieDirectorsToList({movies}) {
    const directors = []
    movies.forEach((movie, index) => {
        directors.push(`${movie['director']['firstName']} ${movie['director']['lastName']}`)
        console.log(directors[index])
    })

    return directors
}



export function formatTitle({title}) {
    console.log(title)
    return title.toLowerCase().trim().split(" ").join("-")
}

export async function formatTitles({titles}) {
    const formattedTitles = []
    console.log(Array.isArray(titles))
    titles.forEach((title) => {
        console.log(title)
        const formattedTitle = formatTitle({title: title})
        formattedTitles.push(formattedTitle)
    }) 
    return formattedTitles
}

export function revertTitle({titleFormatted}) {
    return titleFormatted.split("-").join(" ")
}

export function updateURL({path, pageNum}) {
    if (!path) {
        log.error('No URL path provided')
        return
    }

    if (!pageNum) {
        log.error('No page number provided path provided')
        return
    }

    const updatedURL =  `${path}?=${pageNum + 1}`  // *
    window.history.pushState({page: currentPage}, '', newURL)  // *

    // history.pushState: Updates the URL and browser history.

    // First argument ({ page: currentPage }): State object to store the current page.
    // Second argument (''): Title (often unused, can be empty).
    // Third argument (newURL): The new URL (e.g., /movies/the-substance?page=2).
}

export function revertDirectorNameRetObj({formattedDirectorName}) {
    if (!formattedDirectorName) {
        return
    }
    const dirNameArr = formattedDirectorName.split('-')
    console.log(dirNameArr)
    let firstName = dirNameArr[0]
    let lastName = dirNameArr[1]

    firstName = firstName[0]
    lastName = dirNameArr[1]

    return {
        dirFirstName: dirNameArr[0].charAt(0).toUpperCase() + dirNameArr[0].slice(1),
        dirLastName: dirNameArr[1].charAt(0).toUpperCase() + dirNameArr[1].slice(1)
    }


}

