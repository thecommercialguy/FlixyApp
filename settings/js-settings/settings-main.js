import { displayModal, userSignIn, isAuthenticatedBool, getToken, parseJwt, signOut, displaySignUpFields, hideSignUpFields, userSignUp, userSignInMax, userSignUpMax, updateUserSettings, deleteUser } from "../../js/auth.js"
import { getGenres, getMovie, getMovieTitleByReview, getReviewerById, getReviewerByUsername, getReviewsByMovieId, getReviewsByReviewerId, postReview, updateProfilePictureBanner, updateReviewLikes } from "../../js/api.js"
import { setAbout, setDirectorMoviePage, setGenresMoviePage, setReleaseDate, setReviewCardsMoviePage, setTitleMoviePage, setUserNameTextHeader, setUserNameTextFooter, setSignInHrefHeader, setSignInHrefFooter, setSignOutText, revertTitle, setReviewFormMeta, setElementText, setMovieCards, formatTitles, setPfp, setBanner, setSignInHrefHeaderMovies, setSignInHrefFooterMovies, setSettingsHref } from "../../js/contnentInit.js"


const url = window.location.href

const urlParts = url.split("/")
let userIdParam = urlParts[4]

if (userIdParam.includes('?')) {
    userIdParam = userIdParam.slice(0,userIdParam.indexOf('?'))
} else if (userIdParam.includes('#')) {
    userIdParam = userIdParam.slice(0,userIdParam.indexOf('#'))
}

let userId = userIdParam
// Enabling the service to be used
// Bio section

// Content stuff
// console.log(movieContainer)

// Reviews components


// History stuff

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
const emailInputEl = document.getElementById('email')
const passwordInputEl = document.getElementById('password')

const settingsFormEl = document.getElementById('settings-update-form')
const usernameLabel = settingsFormEl.querySelector('.field-label[for="Username"]')
const emailLabel = settingsFormEl.querySelector('.field-label[for="Email"]')
const bioLabel = settingsFormEl.querySelector('.field-label[for="Bio"]')
const passwordLabel = settingsFormEl.querySelector('.field-label[for="Password"]')
const currPasswordEl = document.getElementById('password-field')
const currPasswordVerEl = document.getElementById('c-password-field')
const newPasswordEl = document.getElementById('new-password-field')
const submitSettingsEl = document.getElementById('submit-settings')

const verifyModal = document.getElementById('ver-modal')  // MODAL
const verSubmitSettingsEl = document.getElementById('ver-submit')  // IN MODAL

const cancelSubmitEl = document.getElementById('cancel-submit')  // IN SETMOD

const deleteButton = document.getElementById('delete')
const verifyDeleteModal = document.getElementById('del-modal')
const verDeleteEl = document.getElementById('ver-delete')

const cancelDeletetEl = document.getElementById('cancel-delete')


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

// let errorMessage = document.querySelector('.auth-error-message')
// if (errorMessage) {
//     errorMessage.remove()
// }

// errorMessage = document.createElement('div')
// error.className = 'auth-error-message'

// errorMessage.innerHTML = 'Successful'


console.log('Am I?:', isAuthenticatedBool())
if (isAuthenticatedBool() === false) {
    // Break it (unauthenticated)
    // ()
    console.log('break')
} else {
    const token = getToken()
    const { name, sub } = parseJwt(token)
    if (userId !== parseInt(sub)) {
        // Break it (unauthorized)
        // ()
        console.log('break')
    }
    const t = parseJwt(token)
    console.log(t)
    // console.log(parseJwt(token))
    const username = name
    setUserNameTextHeader(username, signInTextHeader)
    setUserNameTextFooter(username, signInTextFooter)
    setSignInHrefHeaderMovies(username, signInButtonHeader)
    setSignInHrefFooterMovies(username, signInButtonFooter)
    setSignOutText(signUpText)
    setSettingsHref(username, dropDownSettingsLink)
    
    
    signUpButton.addEventListener('click', () => signOut())
    // signInBackdrop.addEventListener('click', () => displayModal(reviewForm, bodyElement, signInBackdrop))

    console.log(userIdParam)
    let user
    try {
        user = await getReviewerById({reviewerId: parseInt(sub)})
        console.log(user)
    } catch(error) {
        console.error('Error fetching data:', error)
    }
    // Content init 
    usernameLabel.nextElementSibling.placeholder = `@${user.userName}`
    emailLabel.nextElementSibling.placeholder = user.email
    bioLabel.nextElementSibling.placeholder = user.about

    


    // Evnet listeners
    usernameLabel.addEventListener('click', (e) => {
        const field = e.target.nextElementSibling
        field.classList.toggle('hidden')
    }) 
    
    emailLabel.addEventListener('click', (e) => {
        const field = e.target.nextElementSibling
        field.classList.toggle('hidden')
    }) 
    
    passwordLabel.addEventListener('click', (e) => {
        if (!e.target.classList.contains('open')) {
            e.target.classList.add('open')
            currPasswordEl.classList.toggle('hidden')
            currPasswordVerEl.classList.toggle('hidden')
            newPasswordEl.classList.toggle('hidden')
            return
        }
        e.target.classList.remove('open')
        currPasswordEl.classList.toggle('hidden')
        currPasswordVerEl.classList.toggle('hidden')
        newPasswordEl.classList.toggle('hidden')
    
    }) 
    
    bioLabel.addEventListener('click', (e) => {
        const field = e.target.nextElementSibling
        field.classList.toggle('hidden')
    }) 
    
    
    currPasswordVerEl.addEventListener('input', (e) => {
        if (e.target.value != currPasswordEl.value) {
            if (!e.target.classList.contains('err') && !currPasswordEl.classList.contains('err')){
                e.target.classList.remove('ver')
                currPasswordEl.classList.remove('ver')
                e.target.classList.toggle('err')
                currPasswordEl.classList.toggle('err')
                submitSettingsEl.disabled = true
            }
        } else if (e.target.value.length == 0 && currPasswordEl.value.length == 0) {
            e.target.classList.remove('err')
            currPasswordEl.classList.remove('err')
            e.target.classList.remove('ver')
            currPasswordEl.classList.remove('ver')
            submitSettingsEl.disabled = false

    
        }  else if (e.target.value == currPasswordEl.value) {
            if (!e.target.classList.contains('ver') && !currPasswordEl.classList.contains('ver')){
                e.target.classList.remove('err')
                currPasswordEl.classList.remove('err')
                e.target.classList.toggle('ver')
                currPasswordEl.classList.toggle('ver')
                submitSettingsEl.disabled = false
    
            }
        }
    })
    
    signInBackdrop.addEventListener('click', () => {
        displayModal(verifyModal, bodyElement, signInBackdrop)
        toggleFields()
    })

    submitSettingsEl.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()


        verifyModal.classList.toggle('hidden') 
        // displayModal(verifyModal, bodyElement, signInBackdrop)
        toggleFields()

    })

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        verifyDeleteModal.classList.toggle('hidden')
        // toggleFields()

    })

    cancelSubmitEl.addEventListener('click', (e) => {
        e.preventDefault()
        // displayModal(verifyModal, bodyElement, signInBackdrop)
        verifyModal.classList.toggle('hidden')
        toggleFields()

    })

    cancelDeletetEl.addEventListener('click', (e) => {
        e.preventDefault()
        // displayModal(verifyModal, bodyElement, signInBackdrop)
        verifyDeleteModal.classList.toggle('hidden')
        toggleFields()

    })

    verSubmitSettingsEl.addEventListener('click', async (e) => {
        e.preventDefault() 
        let errorMessage = document.querySelector('.auth-error-message')
        if (errorMessage) {
            errorMessage.remove()
        }
        verSubmitSettingsEl.disabled = true
        try {
            await updateUserSettings({id: user.id, settingsForm: settingsFormEl, rel: ''})
            errorMessage = document.createElement('div')
            errorMessage.className = 'auth-error-message'

            errorMessage.innerHTML = 'Successful'

            document.body.appendChild(errorMessage)


            setTimeout(() => {
                console.log('fade-out')
                errorMessage.classList.add('fade-out')  // causes an animation
                errorMessage.addEventListener('animationend', (event) => {
                    console.log('fade-out-')
                        if (errorMessage) {
                            
                            errorMessage.remove()
                        }   
                }, {once: true})

            }, 90000) // 5seconds
            
            verifyModal.classList.toggle('hidden')
            toggleFields()
            refreshFields({user: user})
            
        } catch (error) {
            console.error('Error occured while updating settings:', error)
            
            errorMessage = document.createElement('div')
            error.className = 'auth-error-message'

            errorMessage.innerHTML = 'Failure'
    
        } finally {
            verSubmitSettingsEl.disabled = false;
            
            
        }

    })

    verDeleteEl.addEventListener('click', async (e) => {
        e.preventDefault() 
        let errorMessage = document.querySelector('.auth-error-message')
        if (errorMessage) {
            errorMessage.remove()
        }
        verDeleteEl.disabled = true

        try {
            await deleteUser({id: user.id})
            // errorMessage = document.createElement('div')
            // errorMessage.className = 'auth-error-message'

            // errorMessage.innerHTML = 'Successful'

            // document.body.appendChild(errorMessage)


            // setTimeout(() => {
            //     console.log('fade-out')
            //     errorMessage.classList.add('fade-out')  // causes an animation
            //     errorMessage.addEventListener('animationend', (event) => {
            //         console.log('fade-out-')
            //             if (errorMessage) {
                            
            //                 errorMessage.remove()
            //             }   
            //     }, {once: true})

            // }, 90000) // 5seconds
            
            // verifyModal.classList.toggle('hidden')
            // toggleFields()
            // refreshFields({user: user})
            
        } catch (error) {
            console.error('Error occured while updating settings:', error)
            
            errorMessage = document.createElement('div')
            error.className = 'auth-error-message'

            errorMessage.innerHTML = 'Failure'

            document.body.appendChild(errorMessage)

            setTimeout(() => {
                console.log('fade-out')
                errorMessage.classList.add('fade-out')  // causes an animation
                errorMessage.addEventListener('animationend', (event) => {
                    console.log('fade-out-')
                        if (errorMessage) {
                            
                            errorMessage.remove()
                        }   
                }, {once: true})

            }, 90000) // 5seconds

    
        } finally {
            verSubmitSettingsEl.diabled = false;
            verDeleteEl.disabled = false
            
            
        }

    })

    settingsFormEl.addEventListener('submit', (e) => {
        e.preventDefault()
    })


}

function refreshFields({user}) {
    usernameLabel.nextElementSibling.placeholder = `@${user.userName}`
    emailLabel.nextElementSibling.placeholder = user.email
    bioLabel.nextElementSibling.placeholder = user.about
}

function toggleFields() {
    const formRows = settingsFormEl.querySelectorAll('.form-row')

    submitSettingsEl.classList.toggle('diabled')
    deleteButton.classList.toggle('disable')

    formRows.forEach((row) => {
        row.classList.toggle('disabled')
    })
}


    // jWT needed^




// const sliderHeader = document.querySelector('.director-header.slider')