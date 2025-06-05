import { getMoviesMoviesPage } from "../../js/api.js"
import { displayModal, displaySignUpFields, getToken, hideSignUpFields, isAuthenticatedBool, parseJwt, signOut, userSignIn, userSignInMax, userSignUpMax } from "../../js/auth.js"
import { formatTitles, getMovieTitlesToList, setImgSrcObjs, setImgSrcs, setMoviesHref, setMoviesHrefObjs, setSignInHrefFooter, setSignInHrefHeader, setSignOutText, setUserNameTextFooter, setUserNameTextHeader } from "../../js/contnentInit.js"

const imageContainers = document.querySelectorAll('.img-container')  // href  // arr    // split to length of response
const imageEls = document.querySelectorAll('.img-container img')  // alt + src  // arr // split to length of response
let currPage = 0
const urlParams = new URLSearchParams(window.location.search)
const pageParam = urlParams.get('page')
console.log('pparam', pageParam)
const ini = {
    page: 0
}
if (pageParam) {
        ini.page = Math.max(0, parseInt(pageParam))
        currPage = ini.page
}

// Illusion of pagination
const backButton = document.getElementById('btn-back')
const nextButton = document.getElementById('btn-next')

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
const signInForm = document.getElementById('sign-in-form')
const signInFormHeader = document.getElementById('sign-in-header')
const usernameRowEl = document.querySelector('.form-row.hidden')
const usernameInputEl = document.getElementById('username')
const signInButtonForm = document.getElementById('sign-in-input')

const signUpButtonForm = document.getElementById('sign-up-b')

const signInBackdrop = document.getElementById('modal-backdrop')
const modalX = document.getElementById('modal-x')
const emailInputEl = document.getElementById('email')
const passwordInputEl = document.getElementById('password')
console.log(document.location)
console.log(document.location.href)
console.log(document.location.pathname)
let currUrl = `?page=${ini.page}`
history.replaceState(ini, "", `${document.location.pathname}?page=${ini.page}`)
// Fetching movies
await setMovies({queryParam: currPage})

// This should work

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

backButton.addEventListener('click', async () => {
    currPage--
    currPage = Math.max(0, currPage) 
    await setMovies({queryParam: currPage})
    currUrl = `?page=${currPage}`
    // This simulates loading a new page
    history.pushState({page: currPage}, '', `${window.location.pathname}?page=${currPage}`)
    
    
})

nextButton.addEventListener('click', async () => {
    currPage++
    await setMovies({queryParam: currPage})
    currUrl = `?page=${currPage}`
    history.pushState({page: currPage}, '', `${window.location.pathname}?page=${currPage}`)
})
// signInButtonHeader.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))
// signInButtonFooter.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))
// modalX.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))
// signInBackdrop.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))
// signInForm.addEventListener('submit', () => userSignIn(emailInputEl, passwordInputEl, currUrl))

console.log('Am I?:', isAuthenticatedBool())
if (isAuthenticatedBool() === false) {
    signUpButtonForm.addEventListener('click', async (event) => {
        event.preventDefault()
        if (!usernameRowEl.classList.contains('hidden')) {  // This feels hacky, but 
            userSignUpMax({usernameInputEl: usernameInputEl, emailInputEl: emailInputEl, passwordInputEl: passwordInputEl, currPage: currUrl})
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
} else {
    const token = getToken()
    const { name } = parseJwt(token)
    const username = name
    setUserNameTextHeader(username, signInTextHeader)
    setUserNameTextFooter(username, signInTextFooter)
    setSignInHrefHeader(username, signInButtonHeader)
    setSignInHrefFooter(username, signInButtonFooter)
    setSignOutText(signUpText)
    signUpButton.addEventListener('click', () => signOut())
    
}

window.addEventListener('popstate', async (event) => {
    console.log('state', event.state)
    if (event.state && typeof event.state.page === 'number') {
        console.log('state', event.state)
        currPage = event.state.page  // I get it now....
        await setMovies({queryParam: currPage})
        currUrl = `?page?=${currPage}`
    } else {
        event.state.page = 0
        currPage = event.state.page  
        await setMovies({queryParam: currPage})
        currUrl = `?page?=${currPage}`
    }
})


async function setMovies({queryParam}) {
    try {
        const movieObjs = await getMoviesMoviesPage({queryIdx: currPage})
        if (movieObjs.length > 0) {
            // const movieTitles = await getMovieTitlesToLis({movies: movieObjs})
            // const formattedTitles = await formatTitles({titles: movieTitles})
            setMoviesHrefObjs({movies: movieObjs, linkEls: imageContainers})
            await setImgSrcObjs({movies: movieObjs, imageEls: imageEls})
        } else {
            console.error('no movies found')
            // Not perfect, but this is like, say a user is going next they basiclly will be forced back
            currPage--
        }

    } catch(err) {
        console.error('Error updating movies:', err);
    }
}   