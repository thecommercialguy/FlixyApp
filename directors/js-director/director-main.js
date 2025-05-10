import { getDirector, getMoviesByDirectorId } from "../../js/api.js"
import { displayModal, userSignIn, isAuthenticatedBool, getToken, parseJwt, signOut, displaySignUpFields, hideSignUpFields, userSignUp, userSignInMax } from "../../js/auth.js"
// import { getGenres, getMovie, getReviewsByMovieId, postReview, updateReviewLikes } from "../../js/api.js"
import { setAbout, setDirectorMoviePage, setGenresMoviePage, setReleaseDate, setReviewCardsMoviePage, setTitleMoviePage, setUserNameTextHeader, setUserNameTextFooter, setSignInHrefHeader, setSignInHrefFooter, setSignOutText, revertTitle, setReviewFormMeta, revertDirectorNameRetObj, setDirectorHeader, getMovieTitlesToList, formatTitles, setMovieCards } from "../../js/contnentInit.js"
import { detCurr, sliderTrav } from "../../js/slider.js"

console.log(document.location)
console.log(document.location.href)
console.log(document.location.pathname)
const url = window.location.href

const urlParts = url.split("/")
let directorParam = urlParts[4]
// const urlParams = new URLSearchParams(window.location.search);
// const pageParam = urlParams.get('page');
// This might be ineffiecient but,
if (directorParam.includes('?')) {
    directorParam = directorParam.slice(0,directorParam.indexOf('?'))
} else if (directorParam.includes('#')) {
    directorParam = directorParam.slice(0,directorParam.indexOf('#'))
}


console.log(directorParam)

// Featured director name
const directorHeader = document.getElementById('dir-header')

// Bio section
const bioBox = document.getElementById('about-text')

// Slider stuff
const sliderHeader = document.querySelector('.director-header.slider')
const slider = document.getElementById('movie-slider')
const leftButton = document.getElementById('button-l')
const rightButton = document.getElementById('button-r')

const bodyElement = document.querySelector('body')

const main = document.querySelector('main')
const menuIcon = document.getElementById('menu-button')
const dropDownHeader = document.getElementById('drop-down-h')

// Auth components
const signInButtonHeader = document.getElementById('sign-in-h')
const signInTextHeader = document.getElementById('sign-in-text-h')
const signInButtonFooter = document.getElementById('sign-in-f')
const signInTextFooter = document.getElementById('sign-in-text-f')
const signUpButton = document.getElementById('sign-up')
const signUpText = document.getElementById('sign-up-text')
// Sign in form
const signInForm = document.getElementById('sign-in-form')
const modalX = document.getElementById('modal-x')
const signInFormHeader = document.getElementById('sign-in-header')
const usernameRowEl = document.querySelector('.form-row.hidden')
const usernameInputEl = document.getElementById('username')
const emailInputEl = document.getElementById('email')
const passwordInputEl = document.getElementById('password')
const signInButtonForm = document.getElementById('sign-in-input')
const signUpButtonForm = document.getElementById('sign-up-b')
const signInBackdrop = document.getElementById('modal-backdrop')

const {dirFirstName, dirLastName} = revertDirectorNameRetObj({formattedDirectorName: directorParam})
console.log(dirFirstName)
console.log(dirLastName)
// Fetch director data
const dirData = await getDirector({dirFirstName: dirFirstName, dirLastName: dirLastName})
// directordata null or error, what to display..
const dirId  = dirData['id']
const moviesByDir = await getMoviesByDirectorId({dirId: dirData['id']})
const movieTitles = await getMovieTitlesToList({movies: moviesByDir})
const movieTitlesFrmt = await formatTitles({titles: movieTitles})
if (movieTitles.length < 5) {
    leftButton.classList.toggle('hidden')
    rightButton.classList.toggle('hidden')
}
console.log(movieTitles)
console.log(movieTitlesFrmt)

console.log(dirData)
console.log(moviesByDir)

// Set director data
sliderHeader.textContent = `${dirData['firstName']} ${dirData['lastName']}`
setDirectorHeader({firstName: dirData['firstName'], lastName: dirData['lastName'], directorBox: directorHeader})
setAbout({about: dirData['bio'], aboutBox: bioBox})
setMovieCards({titles: movieTitlesFrmt, movieCardCont: slider})
// Slider Logic + EventListeners
console.log(getComputedStyle(slider))
// console.log('slider left',getComputedStyle(slider).getPropertyValue('left'))
console.log('slider left', slider.getBoundingClientRect().left)
// Styles on grid, header, resizing, etc


// let currGroup = 0
let currGroup = detCurr({slider: slider})

console.log(currGroup)

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


leftButton.addEventListener('click', () => {
    const dirr = +leftButton.getAttribute('data-index-change')
    currGroup = sliderTrav({dirr: dirr, curr: currGroup, slider: slider})

})

rightButton.addEventListener('click', () => {
    const dirr = +rightButton.getAttribute('data-index-change')
    currGroup = sliderTrav({dirr: dirr, curr: currGroup, slider: slider})

})


// detCurr on slider scroll event






// Auth listeners
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
}

