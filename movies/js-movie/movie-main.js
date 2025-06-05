import { displayModal, userSignIn, isAuthenticatedBool, getToken, parseJwt, signOut, displaySignUpFields, hideSignUpFields, userSignUp, userSignInMax } from "../../js/auth.js"
import { getGenres, getMovie, getReviewsByMovieId, postReview, updateReviewLikes, getMovieByParam } from "../../js/api.js"
import { setAbout, setDirectorMoviePage, setGenresMoviePage, setReleaseDate, setReviewCardsMoviePage, setTitleMoviePage, setUserNameTextHeader, setUserNameTextFooter, setSignInHrefHeader, setSignInHrefFooter, setSignOutText, revertTitle, setReviewFormMeta } from "../../js/contnentInit.js"



// DOM Elements
const url = window.location.href

const urlParts = url.split("/")
let titleParam = urlParts[4]
// const urlParams = new URLSearchParams(window.location.search);
// const pageParam = urlParams.get('page');
// This might be ineffiecient but,
if (titleParam.includes('?')) {
    titleParam = titleParam.slice(0,titleParam.indexOf('?'))
}else if (titleParam.includes('#')) {
    titleParam = titleParam.slice(0,titleParam.indexOf('#'))
}
console.log(window.location.pathname)  // movies/<f-movie-title>  
console.log(url)
console.log(urlParts)


const movieTitleBox = document.querySelector('.portrait-text-container h1')
const directorBox = document.querySelector('.portrait-text-container .ft-link.ft-director')
const directorNameEl = directorBox.querySelector('.ft-director-name')
console.log(directorNameEl)
console.log(directorBox)
const aboutBox = document.querySelector('.about-text')

const banner = document.getElementById('banner-id')
const portrait = document.getElementById('portrait-id')
const releaseDateEl = document.getElementById('release')
const genresEl = document.getElementById('genres')
const backButton = document.getElementById('btn-back')
const nextButton = document.getElementById('btn-next')

const reviewsContainer = document.getElementById('review-card-container')
let currReviewIdx = 0
const urlParams = new URLSearchParams(window.location.search)
const pageParam = urlParams.get('page')
console.log('pparam', pageParam)
if (pageParam) {
    currReviewIdx = Math.max(0, parseInt(pageParam))
}

const bodyElement = document.querySelector('body')

const main = document.querySelector('main')
const menuIcon = document.getElementById('menu-button')
const dropDownHeader = document.getElementById('drop-down-h')

const signInButtonHeader = document.getElementById('sign-in-h')
const signInTextHeader = document.getElementById('sign-in-text-h')
const signInButtonFooter = document.getElementById('sign-in-f')
const signInTextFooter = document.getElementById('sign-in-text-f')
const signUpButton = document.getElementById('sign-up')
const signUpText = document.getElementById('sign-up-text')
const signInForm = document.getElementById('sign-in-form')
const signInFormHeader = document.getElementById('sign-in-header')
const signInButtonForm = document.getElementById('sign-in-input')
const signUpButtonForm = document.getElementById('sign-up-b')
const usernameRowEl = document.querySelector('.form-row.hidden')
console.log(getComputedStyle(signInButtonForm))
console.log('unr', signUpButtonForm)
const usernameInputEl = document.getElementById('username')
const signInBackdrop = document.getElementById('modal-backdrop')
const modalX = document.getElementById('modal-x')
const likeButtons = document.querySelectorAll('.like-button')
const emailInputEl = document.getElementById('email')
const passwordInputEl = document.getElementById('password')

// Then initializing the modal/popup functionality, essentially
const addReviewButton = document.getElementById('add-review')
const reviewForm = document.getElementById('post-review')
const reviewFormMetaEl = document.getElementById('review-form-meta')
const titleReviewInput = document.getElementById('review-title-post')
const ratingReviewInput = document.getElementById('rating-post')
const bodyReviewInput = document.getElementById('review-body-post')
const reviewStars = document.querySelectorAll('.review-fields i.bx.bxs-star')

let movieRating = null
// let rawRating = null
console.log(ratingReviewInput) 
console.log(signInBackdrop)
console.log(modalX)

reviewStars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
        modifyStarColors(reviewStars, index)
        console.log(`Mouse Over: ${index+1}`)
    })
})

reviewStars.forEach((star, index) => {
    star.addEventListener('mouseleave', () => {
        revertStarColors(reviewStars, index)
        console.log(`Mouse Leave: ${index+1}`)
        
    })
    
})

reviewStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        const rating = +star.getAttribute('data-rating')
        movieRating = rating
        modifyStarColors(reviewStars, index)
        ratingReviewInput.value = rating
        // console.log('.value', ratingReviewInput.value)
        console.log(`Clicked: ${index+1}`)
    })
})

function revertStarColors(starsList, index) {
    if (starsList == null) {
        return
    }
    
    let i = 0
    if (movieRating == null) {
        while (i < starsList.length) {
            // console.log(i)
            console.log('Curr rating:', movieRating)
            console.log('Curr i:', i)
    
            starsList[i].style.color = 'var(--color-grey)'
            i++
        }
        return
    }
    while (i < starsList.length) {
        i < movieRating ? starsList[i].style.color = 'var(--color-yellow)' : starsList[i].style.color = 'var(--color-grey)'
        i++
    }
    
}

function modifyStarColors(starsList, index) {
    if (starsList == null) {
        return 
    }
    // const starsListSlice = starsList.slice(0, index+1)
    // let n = movieRating == null ? starsList.length : movieRating
    // let n = starsList.length 
    // if (movieRating == null) {
        let i = 0
    while (i < starsList.length) {
        console.log('click index', i)
        i < index + 1 ? starsList[i].style.color = 'var(--color-yellow)' : starsList[i].style.color = 'var(--color-grey)'
        i++
    }
        // }

    // while (i < starsList.length) {
    //     console.log('click index', i)
    //     i < index + 1 ? starsList[i].style.color = 'var(--color-yellow)' : starsList[i].style.color = 'var(--color-grey)'
    //     // starsList[i].style.color = 'var(--color-yellow)'
    //     i++
    // }
    
}



console.log(reviewStars)

// Something for ommitting the # or any other url alterations
// let movieTitle = revertTitle({titleFormatted: titleParam})
// if (movieTitle == 'rudolph the red nosed reindeer') {
//     movieTitle = 'rudolph the red-nosed reindeer'
// }
// console.log(movieTitle)
const movieUrl = window.location.pathname
const currPage = titleParam
console.log(currPage)
let fileType = 'png'

if (titleParam === 'poor-things') {
    fileType = 'jpg'
}
// const bannerSrc = `../images/${titleParam}-banner.${fileType}`
// const portraitSrc = `../images/${titleParam}-portrait.${fileType}`

// General page set-up
const { title, director, releaseDate, description, id, bannerUrl, portraitUrl } = await getMovieByParam(titleParam)
banner.src = bannerUrl
portrait.src = portraitUrl
console.log("fjjf", id)
const genres = await getGenres(id)
const reviewsObjs = await getReviewsByMovieId({movieId: id})
setTitleMoviePage({title: title, movieTitleBox: movieTitleBox})
console.log(directorBox)
setDirectorMoviePage({directorObj: director, directorBox: directorBox, directorNameEl: directorNameEl})
setAbout({about: description, aboutBox: aboutBox})
setReleaseDate({releaseDate: releaseDate, releaseDateEl: releaseDateEl})
setGenresMoviePage({genres: genres, genresEl: genresEl})
setReviewCardsMoviePage({reviewList: reviewsObjs, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})
setReviewFormMeta({title: title, director: director, portraitSrc: portraitUrl, reviewFormMetaEl: reviewFormMetaEl})


menuIcon.addEventListener('click', () => {
    console.log(dropDownHeader.classList)
    dropDownHeader.classList.toggle('active')
    console.log(dropDownHeader.classList)
    // console.log('ok')

})

main.addEventListener('click', () => {
    if (dropDownHeader.classList.contains('active')) {
        dropDownHeader.classList.toggle('active')
    }
})

// Will have to do like buttons, but I'll leave that for later
backButton.addEventListener('click', () => {
    currReviewIdx--
    currReviewIdx = Math.max(0, currReviewIdx)
    console.log(currReviewIdx)
    reviewsContainer.innerHTML = ''
    setReviewCardsMoviePage({reviewList: reviewsObjs, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})
    
   
    history.pushState(window.location.pathname, '', `${window.location.pathname}?page=${currReviewIdx}`)
    

})

nextButton.addEventListener('click', () => {
    currReviewIdx++

    currReviewIdx = Math.min(currReviewIdx, Math.floor(reviewsObjs.length / 3)-1)

    console.log("Lets see this",currReviewIdx)
    console.log("Lets see this",Math.floor(reviewsObjs.length / 3))
    reviewsContainer.innerHTML = ''
    setReviewCardsMoviePage({reviewList: reviewsObjs, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})
    history.pushState(window.location.pathname, '', `${window.location.pathname}?page=${currReviewIdx}`)
    // history.forward()

    //
})

// Modal in HTML
// The proper style (transition, etc)
// JS button listener (signIn)
// Function for the animation
// Navbar that's like visible when it's hovered on
// Seeming easy
// May "tackle" tomorrow

// Updating the token storage thing, ie from headers v soley stored in local storage
function disappear(el) {
    el.style.opacity = '0'
}

function appear(el) {
    el.style.opacity = '1'
}


console.log('Am I?:', isAuthenticatedBool())
if (isAuthenticatedBool() === false) {
    signUpButtonForm.addEventListener('click', async (event) => {
        event.preventDefault()
        if (!usernameRowEl.classList.contains('hidden')) {  // This feels hacky, but 
            userSignUp({usernameInputEl: usernameInputEl, emailInputEl: emailInputEl, passwordInputEl: passwordInputEl, currPage: currPage})
            return
        }
        displaySignUpFields({usernameRowEl: usernameRowEl, signInButtonForm: signInButtonForm, signInHeader: signInFormHeader})
        

    })
    signInButtonHeader.addEventListener('click', () => {
        hideSignUpFields({usernameRowEl: usernameRowEl, signInButtonForm: signInButtonForm, signInHeader: signInFormHeader})
        displayModal(signInForm, bodyElement, signInBackdrop)
    })
    signInButtonFooter.addEventListener('click', () => {
        hideSignUpFields({usernameRowEl: usernameRowEl, signInButtonForm: signInButtonForm, signInHeader: signInFormHeader})
        displayModal(signInForm, bodyElement, signInBackdrop)
    })
    modalX.addEventListener('click', () => {
        hideSignUpFields({usernameRowEl: usernameRowEl, signInButtonForm: signInButtonForm, signInHeader: signInFormHeader})
        displayModal(signInForm, bodyElement, signInBackdrop)
    })  // This could work
    signInBackdrop.addEventListener('click', () => {
        hideSignUpFields({usernameRowEl: usernameRowEl, signInButtonForm: signInButtonForm, signInHeader: signInFormHeader})
        displayModal(signInForm, bodyElement, signInBackdrop)
    })
    signInForm.addEventListener('submit', () => userSignInMax({signInForm: signInForm, currPage: currPage}))
    // Something for preventing adding reviews when not logged in..
    addReviewButton.addEventListener('click', () => {
        console.log('kddk',signInForm)
        // Going to abstact this 
        // Logic for the error message div
        let errorMessage =  document.querySelector('.auth-error-message')
        if (errorMessage) {
            errorMessage.remove()
        }

        errorMessage = document.createElement('div')
        errorMessage.className = 'auth-error-message'
        // errorMessage.classList.add('visible')
        errorMessage.innerHTML = 'Must be logged in to add a review. <a href="#" class="sign-in-link"> Sign in here </a>'

        document.body.appendChild(errorMessage)

        const signInLink = errorMessage.querySelector('.sign-in-link')
        signInLink.addEventListener('click', (event) => {
            event.preventDefault()
            displayModal(signInForm, bodyElement, signInBackdrop)
        })

        let errMessTimeoutId = setTimeout(() => {
            console.log('fade-out')
            errorMessage.classList.add('fade-out')
            errorMessage.addEventListener('animationend', (event) => {
                console.log('fade-out-')
                    if (errorMessage) {
                        
                        errorMessage.remove()
                    }   
            }, {once: true})
        }, 5000)

        errorMessage.addEventListener('mouseenter', () => {
            clearTimeout(errMessTimeoutId)
        })

        errorMessage.addEventListener('mouseleave', () => {
            errMessTimeoutId = setTimeout(() => {
                errorMessage.classList.add('fade-out')
                errorMessage.addEventListener('animationend', (event) => {
                    // if (event.propertyName === 'opacity') {
                    
                        if (errorMessage) {
                            errorMessage.remove()
                        }   
                    // }

                }, {once: true})
            }, 2000)  // Shorter delay
        })
    })
    likeButtons.forEach((button) => {
        button.addEventListener('click', () =>  {
            hideSignUpFields({usernameRowEl: usernameRowEl, signInButtonForm: signInButtonForm, signInHeader: signInFormHeader})
            displayModal(signInForm, bodyElement, signInBackdrop)
        })
    })

} else {
    const token = getToken()
    const { name, sub } = parseJwt(token)
    console.log(sub)
    const username = name
    console.log(parseJwt(token))
    setUserNameTextHeader(username, signInTextHeader)
    setUserNameTextFooter(username, signInTextFooter)
    setSignInHrefHeader(username, signInButtonHeader)
    setSignInHrefFooter(username, signInButtonFooter)
    setSignOutText(signUpText)
    signUpButton.addEventListener('click', () => signOut())
    addReviewButton.addEventListener('click', () => displayModal(reviewForm, bodyElement, signInBackdrop))
    signInBackdrop.addEventListener('click', () => displayModal(reviewForm, bodyElement, signInBackdrop))
    reviewForm.addEventListener('submit', () => postReview({userId: sub, movieId: id, reviewTitle: titleReviewInput, reviewRating: ratingReviewInput, reviewBody: bodyReviewInput, currPage: currPage}))
    likeButtons.forEach((button) => {
        const parentEl = button.closest('.review-card')
        const reviewId = parentEl.dataset.id
        button.addEventListener('click', () => updateReviewLikes(reviewId))
    })
}

window.addEventListener('popstate', (event) => {
    if (event.state && typeof event.state.page === 'number') {
        console.log('state', event.state)
        currReviewIdx = event.state.page;
        setReviewCardsMoviePage({reviewList: reviewsObjs, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})
    } else {  // ie no state
        // const urlParams = new URLSearchParams(window.location.search)
        // const pageParam = urlParams.get('page')
        // console.log('pparam', pageParam)
        
        currReviewIdx = 0        
        // continue

    }
})


