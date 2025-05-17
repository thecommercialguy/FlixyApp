import { initializeSliderWidths, setUpResizeListener, navigateFeaturedSlider, navigateMonthlySliderContentMobile, navigateMonthlySliderContent, navigateReviewSlider, navigateSeasonalSliderMobile, navigateSeasonalSlider, navigateFilmSlider, navigateFilmSliderMobile, sliderListen, adjustSlider } from "./slider.js"
import { getFeaturedMovies, getMonthlyMovies, getMovieIdsFromReview, getMovieTitleByReview, getSeasonalMovies, getTopReviews, getUsernamesByReviewId, updateReviewLikes } from './api.js'
import { setMonthlySectionContentHref, setMonthlySectionImgSrcs, setReviewCardsSlider, setUserNameTextHeader, setUserNameTextFooter, setSignInHrefHeader, setSignInHrefFooter, setSignOutText, setImgSrcs, setFeaturedSectionBannerSrcs, setMoviesHref, getMovieTitlesToList, getFeaturedMovieDirectorsToList, setTitlesFeatured, setDirectorsFeatured, setDirectorsHref} from './contnentInit.js'
import { displayModal, getToken, isAuthenticatedBool, parseJwt, userSignIn, signOut, userSignInMax, userSignUpMax, displaySignUpFields, hideSignUpFields } from "./auth.js"

const currPage = '/a'

// DOM Elements
// Featured Slider Width
const widthSlider = document.querySelector('.featured .content-slider-container')
let prevWidth = window.innerWidth
console.log(widthSlider)

const main = document.querySelector('main')
const menuIcon = document.getElementById('menu-button')
const dropDownHeader = document.getElementById('drop-down-h')

// Featured Slider Items
const featuredSliderContent = document.querySelectorAll('.featured .slider-index')
const featuredSliderPortraits = document.querySelectorAll('.featured .slider-index img.portrait')
const featuredSliderBanners = document.querySelectorAll('.featured .slider-index img.banner')
const featuredTitleEls = document.querySelectorAll('.featured .slider-index .ft-movie-title')  
const featuredMovieLinks = document.querySelectorAll('.featured .slider-index .ft-link.ft-movie')  
const featuredDirectorEls = document.querySelectorAll('.featured .slider-index .ft-director-name')  
const featuredDirectorLinks = document.querySelectorAll('.featured .slider-index .ft-link.ft-director') 

// Monthly Slider Elements
const monthlyContentSlider = document.getElementById('monthly-slider')
const monthlySliderContent = document.querySelectorAll('.monthly .content-slider-container .content-slider .slider-index')
const monthlySliderImages = document.querySelectorAll('.monthly .content-slider-container .content-slider .slider-image')

// Seasonal Slider Elements
const seaosnlSliderImages = document.querySelectorAll('.seasonal .content-slider-container .content-slider .slider-image')
const seasonalContentSlider = document.getElementById('seasonal-slider')
const seasonalSliderContent = document.querySelectorAll('.seasonal .content-slider-container .content-slider .slider-index')

// Review Slider Items
const reviewSliderContent = document.querySelectorAll('.review-card')
// Slider Buttons
const featuredSliderButtons = document.querySelectorAll('.featured .navigation-container i')
const monthlySliderButtons = document.querySelectorAll('.monthly .navigation-container i')
const reviewSliderButtons = document.querySelectorAll('.reviews .navigation-container i')
const seasonalSliderButtons = document.querySelectorAll('.seasonal .navigation-container i')
// Auth components
const bodyElement = document.querySelector('body')
const signInButtonHeader = document.getElementById('sign-in-h')
const signInTextHeader = document.getElementById('sign-in-text-h')
const signInButtonFooter = document.getElementById('sign-in-f')
const signInTextFooter = document.getElementById('sign-in-text-f')
const signUpButton = document.getElementById('sign-up')
const signUpText = document.getElementById('sign-up-text')
const signInForm = document.getElementById('sign-in-form')
const signInButtonForm = document.getElementById('sign-in-input')
const signInFormHeader = document.getElementById('sign-in-header')
const signUpButtonForm = document.getElementById('sign-up-b')
const usernameRowEl = document.querySelector('.form-row.hidden')
const usernameInputEl = document.getElementById('username')



const signInBackdrop = document.getElementById('modal-backdrop')
const modalX = document.getElementById('modal-x')
const likeButtons = document.querySelectorAll('.like-button')
const emailInputEl = document.getElementById('email')
const passwordInputEl = document.getElementById('password')

async function initializeApp() {
    try {
        // apiCalls for movies actually present in reviews
        initializeSliderWidths(widthSlider)
        setUpResizeListener(widthSlider)
        const [ topReviews, monthlyMovieTitles, seasonalMovieTitles ] = await Promise.all([getTopReviews(), getMonthlyMovies(), getSeasonalMovies()])
        const movieTitlesReview = await getMovieTitleByReview({reviewObjs: topReviews})
        const reviewerNames = await getUsernamesByReviewId({reviewObjs: topReviews})
        console.log(reviewerNames)
        const featuredMovies = await getFeaturedMovies()
        const featuredMovieTitles = await getMovieTitlesToList({movies: featuredMovies})
        const featuredDirectors = await getFeaturedMovieDirectorsToList({movies: featuredMovies})
        setTitlesFeatured({movieTitles: featuredMovieTitles, headerEls: featuredTitleEls})
        setDirectorsFeatured({directorNames: featuredDirectors, headerEls: featuredDirectorEls})
        setMoviesHref({movieTitles: featuredMovieTitles, linkEls: featuredMovieLinks})
        setDirectorsHref({directorNames: featuredDirectors, linkEls: featuredDirectorLinks})
        await setImgSrcs({movieList: featuredMovieTitles, imageEls: featuredSliderPortraits})
        await setFeaturedSectionBannerSrcs({movieList: featuredMovieTitles, sliderImages: featuredSliderBanners})
        setReviewCardsSlider({reviews: topReviews, movieTitles: movieTitlesReview, usernames: reviewerNames, reviewSliderContent: reviewSliderContent})
        await setImgSrcs({movieList: monthlyMovieTitles, imageEls: monthlySliderImages})
        console.log(seasonalMovieTitles)
        await setImgSrcs({movieList: seasonalMovieTitles, imageEls: seaosnlSliderImages})
        // await setImgSrcs(monthlyMovieTitles, monthlySliderImages)
        setMonthlySectionContentHref(monthlyMovieTitles, monthlySliderContent)
        setMonthlySectionContentHref(seasonalMovieTitles, seasonalSliderContent)


        setUpEventListeners()
    } catch (error) {
        console.error('Initialization failed:', error)
    }
}

function setUpEventListeners() {
    featuredSliderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const indexChange = +button.getAttribute('data-index-change')
            const screenWidth = window.innerWidth
            navigateFeaturedSlider(indexChange, featuredSliderContent)
        })
    })

    sliderListen({sliderButtons: monthlySliderButtons, contentSlider: monthlyContentSlider, sliderContent: monthlySliderContent})
    sliderListen({sliderButtons: seasonalSliderButtons, contentSlider: seasonalContentSlider, sliderContent: seasonalSliderContent})

    window.addEventListener('resize', () => {
        adjustSlider({prevWidth: prevWidth, contentSlider: monthlyContentSlider, sliderContent: monthlySliderContent})
        adjustSlider({prevWidth: prevWidth, contentSlider: seasonalContentSlider, sliderContent: seasonalSliderContent})
        prevWidth = window.innerWidth
    })

    // Navigating Review Slider
    reviewSliderButtons.forEach((button) => {
        button.addEventListener('click', ()=> {
            const indexChange = +button.getAttribute('data-index-change')
            navigateReviewSlider(indexChange, reviewSliderContent)
        })
    })

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
    
    // Something to ensure the page is "blurred befor the DOM is loaded"
    // signInButtonHeader.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))
    // signInButtonFooter.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))
    // modalX.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))
    // signInBackdrop.addEventListener('click', () => displayModal(signInForm, bodyElement, signInBackdrop))

    
    // Authentication
    if (isAuthenticatedBool() === false) {
        signUpButtonForm.addEventListener('click', async (event) => {
            event.preventDefault()
            if (!usernameRowEl.classList.contains('hidden')) {  // This feels hacky, but 
                userSignUpMax({signInForm: signInForm, currPage: currPage})
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
        // Managing to get the modal to arise when signing in
        likeButtons.forEach((button) => {
            button.addEventListener('click', () =>  displayModal(signInForm, bodyElement, signInBackdrop))
        })
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
        likeButtons.forEach((button) => {
            const parentEl = button.closest('.review-card')
            const reviewId = parentEl.dataset.id
            button.addEventListener('click', () => updateReviewLikes(reviewId))
        })
    }
}

document.addEventListener('DOMContentLoaded', () => initializeApp())
// const monthlySlider = new Slider(featuredSliderContent)
// const seaonalSlider = new Slider(featuredSliderContent)

// Navigating Featured Slider

// How this compares to industry standards from chat

