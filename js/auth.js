// import { head } from '../movies/movie-router.js'
import { loadConfig } from './config.js'
import { handleServerError } from './error.js'

export function displayModal(modal, bodyElement, signInBackdrop) {
    console.log(modal)
    const styles = getComputedStyle(modal)
    const display = styles.getPropertyValue('display')
    if (display === 'none') {
        console.log('Modal displayed')
        modal.style.display = 'flex'
        modal.style.boxShadow = 'rgba(0, 0, 0, .9) 0px 0px 30px'
        // box-shadow: rgba(0, 0, 0, .9) 0px 0px 30px;
        signInBackdrop.classList.add('active')
        bodyElement.style.overflowY = 'hidden'
    }
    else {
        console.log('Modal hidden')
        modal.style.display = 'none'
        bodyElement.style.overflowY = 'visible'
        signInBackdrop.classList.remove('active')
        
        // console.log(signInBackdrop)
    }
    

}

export function displaySignUpFields({usernameRowEl, signInButtonForm, signInHeader}) {
    if (usernameRowEl == null) {
        // Error logic
        return 
    }

    if (signInButtonForm == null) {
        // Error logic
        return
    }

    if (signInHeader == null) {
        return
    }

    const submitRow = signInButtonForm.closest('.submit-row')  // Submit container
    const headerText = signInHeader.querySelector('.header-text')


    // if (!submitRow || !fieldsContainer || !signInHeader) {
    if (submitRow && headerText) {
        headerText.textContent = 'Sign up to'
        usernameRowEl.classList.toggle('hidden')  // Toggle username field div
        submitRow.classList.toggle('collapse')  // Toggle collapse setting submit div
        signInButtonForm.classList.toggle('hidden')  // Toggle sign-in button (sign-up form triggered)
        headerText.textContent = !usernameRowEl.classList.contains('hidden') ?  'Sign up to' : 'Log in to'
        console.log("bool", usernameRowEl.classList.contains('hidden'))
        return
    }

    
    // The error handling
    return
}

export function hideSignUpFields({usernameRowEl, signInButtonForm, signInHeader}) {
    if (usernameRowEl == null) {
        // Error logic
        return 
    }

    if (signInButtonForm == null) {
        // Error logic
        return
    }

    if (signInHeader == null) {
        return
    }

    const submitRow = signInButtonForm.closest('.submit-row')  // Submit container
    const headerText = signInHeader.querySelector('.header-text')


    // if (!submitRow || !fieldsContainer || !signInHeader) {
    
    if (!submitRow || !headerText) {
        console.log("this is undefinded behavior")
        return
    }

    if (!usernameRowEl.classList.contains('hidden')) {
        usernameRowEl.classList.toggle('hidden')  // Toggle username field div
        submitRow.classList.toggle('collapse')  // Toggle collapse setting submit div
        signInButtonForm.classList.toggle('hidden')  // Toggle sign-in button (sign-up form triggered)
        headerText.textContent = 'Log in to'     
    }

    return
    
}

export async function userSignInMax({signInForm, currPage}) {
    event.preventDefault()
    console.log('Sign in executed')
    const { apiBaseUrl } = await loadConfig()

    const formContnents = signInForm.querySelector('.contents')
    const emailEl = formContnents.querySelector('#email')
    const passwordEl = formContnents.querySelector('#password')

    if (emailEl.value === '' || email.value.length < 2) {
        // error hadnling on form
        return
    }
    
    if (passwordEl.value === '' || passwordEl.value.length < 2) {
        // error hadnling on form
        return
    }

    const email = emailEl.value
    const password = passwordEl.value

    console.log('Username:', email)
    console.log('Password:', password)
    try {
        const endpoint = `${ apiBaseUrl }/Auth/login`
        console.log(endpoint)
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, 
                password: password
            })
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

export async function userSignIn(emailInputEl, passwordInputEl, currPage) {
    event.preventDefault()
    console.log('Sign in executed')
    const { apiBaseUrl } = await loadConfig()

    const email = emailInputEl.value
    const password = passwordInputEl.value

    console.log('Username:', email)
    console.log('Password:', password)
    try {
        const endpoint = `${ apiBaseUrl }/Auth/login`
        console.log(endpoint)
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, 
                password: password
            })
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

export async function userSignUpMax({signInForm, currPage}) {
    event.preventDefault()

    if (!signInForm) {
        return
    }

    const formContents = signInForm.querySelector('.contents')
    const usernameEl = formContents.querySelector('#username')
    const emailEl = formContnents.querySelector('#email')
    const passwordEl = formContnents.querySelector('#password')

    if (usernameEl.value === '' || usernameEl.value.length < 2) {
        // error hadnling on form
        return
    }

    if (emailEl.value === '' || emailEl.value.length < 2) {
        // error hadnling on form
        return
    }
    
    if (passwordEl.value === '' || passwordEl.value.length < 3) {
        // error hadnling on form
        return
    }

    const username = usernameEl.value
    const email = emailEl.value
    const password = passwordEl.value
    

    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Auth/register`

    let response
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                email: email,
                password: password
            })
        })
    } catch(error) {
        console.error("Error occured signing in:", error)
        alert("An error when signing up")
        return
    }

    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch(error) {
            console.error('Error signing up:', error)
            alert("An error ocured when signing up")
            return
        }
        // handleServerError(resposne)
        return
    }

    let data
    try {
        data = await resposne.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        alert('Error processing server resposne')
        return
    }

    const rel = currPage

    window.location.href = rel
}
export async function userSignUp({usernameInputEl, emailInputEl, passwordInputEl, currPage}) {
    if (!usernameInputEl.value) {
        return
    }
    if (!emailInputEl.value) {
        return
    }
    if (!passwordInputEl.value) {
        return
    }

    const username = usernameInputEl.value
    const email = emailInputEl.value
    const password = passwordInputEl.value

    const { apiBaseUrl } = await loadConfig()
    const url = `${ apiBaseUrl }/Auth/register`

    let response
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                email: email,
                password: password
            })
        })
    } catch(error) {
        console.error("Error occured signing in:", error)
        alert("An error when signing up")
        return
    }

    if (!response.ok) {
        let errorData
        try {
            errorData = await response.json()
        } catch(error) {
            console.error('Error signing up:', error)
            alert("An error ocured when signing up")
            return
        }
        // handleServerError(resposne)
        return
    }

    let data
    try {
        data = await resposne.json()
    } catch (error) {
        console.error('Error processing success response:', error)
        alert('Error processing server resposne')
        return
    }

    const rel = currPage

    window.location.href = rel
}

export function getToken() {
    const token = localStorage.getItem('Bearer')

    return token 
}

export function parseJwt(token) {
    // Split the token into its parts
    var base64Url = token.split('.')[1];
    // Convert Base64 URL to regular Base64
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decode the Base64 string
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function signOut() {
    localStorage.removeItem('Bearer')
}

export function isAuthenticatedBool() {
    const token = getToken()

    if (token === null) {
        return false
    }
    
    return true
}