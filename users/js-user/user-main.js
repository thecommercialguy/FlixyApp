import { displayModal, userSignIn, isAuthenticatedBool, getToken, parseJwt, signOut, displaySignUpFields, hideSignUpFields, userSignUp, userSignInMax, userSignUpMax } from "../../js/auth.js"
import { getGenres, getMovie, getMoviesByDirectorId, getMoviesByReviews, getMovieTitleByReview, getReviewerById, getReviewerByUsername, getReviewsByMovieId, getReviewsByReviewerId, postReview, updateProfilePictureBanner, updateReviewLikes } from "../../js/api.js"
import { setAbout, setDirectorMoviePage, setGenresMoviePage, setReleaseDate, setReviewCardsMoviePage, setTitleMoviePage, setUserNameTextHeader, setUserNameTextFooter, setSignInHrefHeader, setSignInHrefFooter, setSignOutText, revertTitle, setReviewFormMeta, setElementText, setMovieCards, formatTitles, setPfp, setBanner, setMovieCardsNew, setReviewCardsUserPage, setSettingsHref} from "../../js/contnentInit.js"


const url = window.location.href

const urlParts = url.split("/")
let usernameParam = urlParts[4]

if (usernameParam.includes('?')) {
    usernameParam = usernameParam.slice(0,usernameParam.indexOf('?'))
} else if (usernameParam.includes('#')) {
    usernameParam = usernameParam.slice(0,usernameParam.indexOf('#'))
}

const pageTitle = document.getElementById('page-title')

const banner = document.getElementById('banner-id')
const profilePic = document.getElementById('pfp')
const usernameHeader = document.getElementById('user-header')
const editButtonBanner = document.querySelector('.banner .edit-b')  // logic for here later

// Bio section
const bioSection = document.getElementById('about')
const bioBox = document.getElementById('about-text')

// Content stuff
const movieContainer = document.getElementById('movie-container')
console.log(movieContainer)

// Reviews components
const reviewsContainer = document.getElementById('review-card-container')
const backButton = document.getElementById('btn-back')
const nextButton = document.getElementById('btn-next')

// History stuff
let currReviewIdx = 0
const urlParams = new URLSearchParams(window.location.search)
const pageParam = urlParams.get('page')
console.log('pparam', pageParam)
const ini = {
    page: 0
}
if (pageParam) {
    ini.page = Math.max(0, parseInt(pageParam))
    currReviewIdx = ini.page
}

let currUrl = `?page=${ini.page}`
history.replaceState(ini, "", `${document.location.pathname}?page=${ini.page}`)

const navbar = document.querySelector('.navbar')
const main = document.querySelector('main')
const menuIcon = document.getElementById('menu-button')
const dropDownHeader = document.getElementById('drop-down-h')
const dropDownSettingsLink = document.getElementById('settings-link')



// Auth components
const bodyElement = document.querySelector('body')

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
// console.log(getComputedStyle(signInButtonForm))
// console.log('unr', signUpButtonForm)
const usernameInputEl = document.getElementById('username')
const signInBackdrop = document.getElementById('modal-backdrop')
const modalX = document.getElementById('modal-x')
const likeButtons = document.querySelectorAll('.like-button')
const emailInputEl = document.getElementById('email')
const passwordInputEl = document.getElementById('password')

const pfpBannerForm = document.getElementById('pfp-banner-form')
const contents = pfpBannerForm.querySelector('.contents')
const prevPfp = document.getElementById('prev-img-pfp')
const pfpInput = document.getElementById('pf-p')
const overlay = document.querySelector('.overlay')
const bannerInput = document.getElementById('banner')
const prevBanner = document.getElementById('prev-img-banner')
const prevEditor = document.getElementById('preview-edit')


console.log(usernameParam)
// Api calls
let reviewerID
let user
let reviews
let movies
// let movieTitles
// let movieTitlesFrmt
try {
    reviewerID  = await getReviewerByUsername({username: usernameParam})
    user = await getReviewerById({reviewerId: reviewerID})
    console.log(user)
    reviews = await getReviewsByReviewerId({reviewerId: reviewerID})
    movies = await getMoviesByReviews({reviewObjs: reviews})
    console.log(movies)
    // movieTitlesFrmt = await formatTitles({titles: movieTitles})
} catch(error) {
    console.error('Error fetching data:', error)
}

pageTitle.textContent = `@${user['userName']} | Flixy`

// Formatting
const atUsername = `@${user['userName']}`
// console.log(movieTitlesFrmt)

// Content init
setPfp({pfpUrl: user['profilePictureURL'], el: profilePic})
setBanner({bannerUrl: user['bannerURL'], el: banner})
setElementText({text: atUsername, el: usernameHeader})
user['about'].length > 1 ? setElementText({text: user['about'], el: bioBox}) : bioSection.classList.toggle('hidden')
setMovieCardsNew({movies: movies, movieCardCont: movieContainer})  // 
setReviewCardsUserPage({reviewList: reviews, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})


// Event listeners

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

// navbar.addEventListener('click', () => {
//     if (dropDownHeader.classList.contains('active')) {
//         dropDownHeader.classList.toggle('active')
//     }
// })

// dropDownHeader.addEventListener('mouseleave', () => {
//     dropDownHeader.classList.toggle('active')

// })


// pfp form listener
pfpInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    
    if (file) {
        const fileUrl = URL.createObjectURL(file)
        console.log(fileUrl)
        prevPfp.src = fileUrl
        
        // Cleaning the URL when the image is uploaded
        prevPfp.onload = () => {
            URL.revokeObjectURL(fileUrl)
        }
        
    } else {
        prevPfp.src = ''
        
    }
})

// overlay for editing image
// overlay.addEventListener('click', () => {
//     contents.classList.toggle('hidden')
//     prevEditor.classList.toggle('hidden')

// })


// Pagination
backButton.addEventListener('click', () => {
    currReviewIdx--
    currReviewIdx = Math.max(0, currReviewIdx)

    reviewsContainer.innerHTML = ''
    currUrl = `?page=${currReviewIdx}`

    setReviewCardsMoviePage({reviewList: reviews, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})
    history.pushState({page: currReviewIdx}, '', `${window.location.pathname}?page=${currReviewIdx}`)

})

nextButton.addEventListener('click', () => {
    currReviewIdx++

    currReviewIdx = Math.min(currReviewIdx, Math.floor(reviews.length / 3))

    reviewsContainer.innerHTML = ''
    currUrl = `?page=${currReviewIdx}`
    setReviewCardsMoviePage({reviewList: reviews, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})

    history.pushState({page: currReviewIdx},'', `${window.location.pathname}?page=${currReviewIdx}`)

})



console.log('Am I?:', isAuthenticatedBool())
if (isAuthenticatedBool() === false) {
    signUpButtonForm.addEventListener('click', async (event) => {
        event.preventDefault()
        if (!usernameRowEl.classList.contains('hidden')) {  // This feels hacky, but 
            userSignUpMax({signInForm: signInForm, currPage: currUrl})
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
    signInForm.addEventListener('submit', async () => userSignInMax({signInForm: signInForm, currPage: currUrl}))
    // Something for preventing adding reviews when not logged in..
    
    likeButtons.forEach((button) => {
        button.addEventListener('click', () =>  {
            hideSignUpFields({usernameRowEl: usernameRowEl, signInButtonForm: signInButtonForm, signInHeader: signInFormHeader})
            displayModal(signInForm, bodyElement, signInBackdrop)
        })
    })
} else {
    const token = getToken()
    const { name, sub } = parseJwt(token)
    const  t= parseJwt(token)
    console.log(t)
    const username = name
    console.log(parseJwt(token))
    setUserNameTextHeader(username, signInTextHeader)
    setUserNameTextFooter(username, signInTextFooter)
    setSignInHrefHeader(username, signInButtonHeader)
    setSignInHrefFooter(username, signInButtonFooter)
    setSignOutText(signUpText)
    setSettingsHref(username, dropDownSettingsLink)

    
    signUpButton.addEventListener('click', () => signOut())
    // signInBackdrop.addEventListener('click', () => displayModal(reviewForm, bodyElement, signInBackdrop))
    // if (reviewerID == parseInt(sub)) {
    likeButtons.forEach((button) => {
        const parentEl = button.closest('.review-card')
        const uNameEl = parentEl.querySelector('.username')
        const reverId = uNameEl.dataset.userId
        console.log(parentEl)
        if (reverId !== sub) {
            const reviewId = parentEl.dataset.id
            button.addEventListener('click', () => updateReviewLikes(reviewId))
        }
    })
    // }
    console.log(sub)
    console.log(reviewerID)

    if (reviewerID === parseInt(sub)) {
        editButtonBanner.classList.toggle('authed')
        pfpBannerForm.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log(e.target)
            updateProfilePictureBanner({user:user, pfpBannerForm: pfpBannerForm, currPage: currUrl})
            
        })
        editButtonBanner.addEventListener('click', () => {
            displayModal(pfpBannerForm, bodyElement, signInBackdrop)

        })
        signInBackdrop.addEventListener('click', () => {
            displayModal(pfpBannerForm, bodyElement, signInBackdrop)
        })
    }
    // jWT needed^
}

window.addEventListener('popstate', (event) => {
    console.log('state', event.state)
    if (event.state && typeof event.state.page === 'number') {
        console.log('state', event.state)
        currReviewIdx = event.state.page  // I get it now....
        // await setMovies({queryParam: currPage})
        setReviewCardsMoviePage({reviewList: reviews, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})

        currUrl = `?page?=${currReviewIdx}`
    } else {
        event.state.page = 0
        currReviewIdx = event.state.page  
        // await setMovies({queryParam: currPage})
        setReviewCardsMoviePage({reviewList: reviews, reviewsContainer: reviewsContainer, backButton: backButton, nextButton: nextButton, currReviewSlice: currReviewIdx})

        currUrl = `?page?=${currReviewIdx}`
    }

})



// const sliderHeader = document.querySelector('.director-header.slider')