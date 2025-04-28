export const mobileBreakpoint = 810
export const tabletBreakpoint = 1440

export const featuredSliderScaleIndexM = 1.00675466667
export const featuredSliderScaleIndexT = 1.00191358025
export const featuredSliderScaleIndexD = 1


export function initializeSliderWidths(widthSlider) {
    if (window.innerWidth < mobileBreakpoint) {
        widthSlider.style.width = `${(window.innerWidth * 3) * featuredSliderScaleIndexM}px`

    } else if (window.innerWidth < tabletBreakpoint) {
        widthSlider.style.width = `${(window.innerWidth * 3) * featuredSliderScaleIndexT}px`
        
    } else {
        widthSlider.style.width = `${(1008 * 3) * featuredSliderScaleIndexD}px`
        // console.log((1008 * 3) * featuredSliderScaleIndexD)
    }
}

export function setUpResizeListener(widthSlider) {
    window.addEventListener('resize', () => initializeSliderWidths(widthSlider))
}

export let currSlideIndexFeatured = 0

export function navigateFeaturedSlider(indexChange, featuredSliderContent) {
    currSlideIndexFeatured += indexChange
    if (currSlideIndexFeatured === 3) {
        currSlideIndexFeatured = 2
        console.log("returned")
        return 
    }

    if (currSlideIndexFeatured < 0) {
        currSlideIndexFeatured = 0
        console.log("returned")
        return
    }

    const featuredSliderContentStyles = getComputedStyle(featuredSliderContent[0])

    const widthString = featuredSliderContentStyles.getPropertyValue('width')

    const width = Number(widthString.split("px")[0])
    const shiftX = -100
    featuredSliderContent.forEach((card) => {
        card.style.transform = `translateX(${currSlideIndexFeatured * shiftX}%)`
    })
}

// Navigating Monthly Slider 
// Mobile

export let currSlideIndexMonthly = 0

export function navigateMonthlySliderContentMobile(indexChange, monthlySliderContent) {
    console.log("mobile")
    currSlideIndexMonthly += indexChange

    if (currSlideIndexMonthly === 4) {
        currSlideIndex = 3
        console.log("returned")
        return 
    }

    if (currSlideIndexMonthly < 0) {
        currSlideIndexMonthly = 0
        console.log("returned")
        return
    }

    const monthlySliderContentStyles = getComputedStyle(monthlySliderContent[0])

    const widthString = monthlySliderContentStyles.getPropertyValue('width')
    const marginRightString = monthlySliderContentStyles.getPropertyValue('margin-right')

    const width = Number(widthString.split("px")[0])
    const marginRight = Number(marginRightString.split("px")[0])
    const shiftX = -((width + marginRight)/width) * 100

    console.log(indexChange)
    console.log(currSlideIndexMonthly)
    console.log("//")

    monthlySliderContent.forEach((image, index) => {
        
        
        if (index === 11) {
            console.log(index)
            console.log(indexChange*321.1093676337)
        }

        image.style.transform = `translateX(${currSlideIndexMonthly * (3*shiftX)}%)`

        
    })

    
}

// Tablet and Desktop

export function navigateMonthlySliderContent(indexChange, monthlySliderContent) {
    console.log("desktop")
    currSlideIndexMonthly += indexChange

    
    if (currSlideIndexMonthly === 3) {
        currSlideIndexMonthly = 2
        console.log("returned")
        return 
    }

    if (currSlideIndexMonthly < 0) {
        currSlideIndexMonthly = 0
        console.log("returned")
        return
    }

    const monthlySliderContentStyles = getComputedStyle(monthlySliderContent[0])

    const widthString = monthlySliderContentStyles.getPropertyValue('width')
    const marginRightString = monthlySliderContentStyles.getPropertyValue('margin-right')

    const width = Number(widthString.split("px")[0])
    const marginRight = Number(marginRightString.split("px")[0])
    const shiftX = -((width + marginRight)/width) * 100
    
    console.log(width)
    console.log(marginRight)
    console.log(shiftX)
    console.log(indexChange)
    console.log(currSlideIndexMonthly)
    console.log("//")


    monthlySliderContent.forEach((image, index) => {
        if (index === 11) {
            console.log(index)
            console.log(indexChange*451.02040816)
        }
        image.style.transform = `translateX(${currSlideIndexMonthly * (4*shiftX)}%)`

    })
    
}

// Navigating Review Slider 

export let currSlideIndexReviews = 0

export function navigateReviewSlider(indexChange, reviewSliderContent) {
    currSlideIndexReviews += indexChange

    if (currSlideIndexReviews === 3) {
        currSlideIndexReviews = 2
        console.log("returned")
        return 
    }

    if (currSlideIndexReviews < 0) {
        currSlideIndexReviews = 0
        console.log("returned")
        return
    }

    const reviewSliderContentStyles = getComputedStyle(reviewSliderContent[0])

    const widthString = reviewSliderContentStyles.getPropertyValue('width')
    const marginRightString = reviewSliderContentStyles.getPropertyValue('margin-right')

    const width = Number(widthString.split("px")[0])
    const marginRight = Number(marginRightString.split("px")[0])
    const shiftX = -((width + marginRight)/width) * 100

    
    reviewSliderContent.forEach((review, index) => {
        review.style.transform = `translateX(${currSlideIndexReviews * shiftX}%)`
    })

}

export let currSlideIndexSeasonal = 0

export function navigateSeasonalSliderMobile(indexChange, seasonalSliderContent) {
    currSlideIndexSeasonal += indexChange

    if (currSlideIndexSeasonal === 4) {
        currSlideIndexSeasonal = 3
        console.log("returned")
        return 
    }

    if (currSlideIndexSeasonal < 0) {
        currSlideIndexSeasonal = 0
        console.log("returned")
        return
    }
    const seasonalSliderContentStyles = getComputedStyle(seasonalSliderContent[0])

    const widthString = seasonalSliderContentStyles.getPropertyValue('width')
    const marginRightString = seasonalSliderContentStyles.getPropertyValue('margin-right')

    const width = Number(widthString.split("px")[0])
    const marginRight = Number(marginRightString.split("px")[0])
    const shiftX = -((width + marginRight)/width) * 100
    
    console.log(width)
    console.log(marginRight)
    console.log(shiftX)
    console.log(indexChange)
    console.log(currSlideIndexSeasonal)
    console.log("//")

    seasonalSliderContent.forEach((image, index) => { 
        if (index === 11) {
            console.log(index)
            console.log(indexChange*451.02040816)
        }
        image.style.transform = `translateX(${currSlideIndexSeasonal * (3*shiftX)}%)`
        
    })
}

export function navigateSeasonalSlider(indexChange, seasonalSliderContent) {
    currSlideIndexSeasonal += indexChange

    if (currSlideIndexSeasonal === 3) {
        currSlideIndexSeasonal = 2
        console.log("returned")
        return 
    }

    if (currSlideIndexSeasonal < 0) {
        currSlideIndexSeasonal = 0
        console.log("returned")
        return
    }

    const seasonalSliderContentStyles = getComputedStyle(seasonalSliderContent[0])

    const widthString = seasonalSliderContentStyles.getPropertyValue('width')
    const marginRightString = seasonalSliderContentStyles.getPropertyValue('margin-right')

    const width = Number(widthString.split("px")[0])
    const marginRight = Number(marginRightString.split("px")[0])
    const shiftX = -((width + marginRight)/width) * 100
    

    seasonalSliderContent.forEach((image, index) => {
        if (index === 11) {
            console.log(index)
            console.log(indexChange*451.02040816)
        }
        image.style.transform = `translateX(${currSlideIndexSeasonal * (4*shiftX)}%)`
 
    })

}
const trackSliderIndex = {
    'monthly': 0,
    'seasonal': 0,
    'review': 0
}
const trackSliderIndexMobile = {
    'monthly': 0,
    'seasonal': 0,
    'review': 0
}
export function navigateFilmSliderMobile({indexChange, contentSlider, sliderContent}) {
    const sliderType = sliderContent[0].getAttribute('data-index-type')
    let currSliderIndex = trackSliderIndex[sliderType] += indexChange
    

    // Upper bound
    if (currSliderIndex === 4) {
        currSliderIndex = 3
        trackSliderIndex[sliderType] = currSliderIndex
        console.log("Slider index M:")
        console.log(currSliderIndex)
        console.log("returned")
        return 
    }
    // Lower bound
    if (currSliderIndex < 0) {
        currSliderIndex = 0
        trackSliderIndex[sliderType] = currSliderIndex
        console.log("returned")
        return
    }
    console.log("Slider index M:")
    console.log(currSliderIndex)

    const sliderContentStyles = getComputedStyle(sliderContent[0])

    const marginRightStringItem = sliderContentStyles.getPropertyValue('margin-right')
    const widthStringItem = sliderContentStyles.getPropertyValue('width')

    // const widthString = sliderContentStyles.getPropertyValue('width')
    // const marginRightString = sliderContentStyles.getPropertyValue('margin-right')
    const widthItem = Number(widthStringItem.split("px")[0])
    const marginRightItem = Number(marginRightStringItem.split("px")[0])
    const totalWidthItem = widthItem + marginRightItem
    const widthWindow  = totalWidthItem * 3

    const contentSliderStyles = getComputedStyle(contentSlider)

    const widthStringSlider = contentSliderStyles.getPropertyValue('width')
    const widthSlider = Number(widthStringSlider.split("px")[0])

    // const width = Number(widthString.split("px")[0])
    // const marginRight = Number(marginRightString.split("px")[0])
    // const shiftX = -((width + marginRight)/width) * 100
    const shiftX = -(widthWindow / widthSlider) * 100
    
    // console.log(width)
    // console.log(marginRight)
    console.log('Curr slider X Mobile:', shiftX)
    // console.log(indexChange)
    // console.log(currSliderIndex)
    // console.log("//")

    contentSlider.style.transform = `translateX(${currSliderIndex * shiftX}%)`
        

}
// export function navigateFilmSliderMobile({indexChange, contentSlider, sliderContent}) {
//     const sliderType = sliderContent[0].getAttribute('data-index-type')
//     let currSliderIndex = trackSliderIndexMobile[sliderType] += indexChange
    

//     // Upper bound
//     if (currSliderIndex === 4) {
//         currSliderIndex = 3
//         trackSliderIndexMobile[sliderType] = currSliderIndex
//         console.log("Slider index M:")
//         console.log(currSliderIndex)
//         console.log("returned")
//         return 
//     }
//     // Lower bound
//     if (currSliderIndex < 0) {
//         currSliderIndex = 0
//         trackSliderIndexMobile[sliderType] = currSliderIndex
//         console.log("returned")
//         return
//     }
//     console.log("Slider index M:")
//     console.log(currSliderIndex)

//     const sliderContentStyles = getComputedStyle(sliderContent[0])

//     const marginRightStringItem = sliderContentStyles.getPropertyValue('margin-right')
//     const widthStringItem = sliderContentStyles.getPropertyValue('width')

//     // const widthString = sliderContentStyles.getPropertyValue('width')
//     // const marginRightString = sliderContentStyles.getPropertyValue('margin-right')
//     const widthItem = Number(widthStringItem.split("px")[0])
//     const marginRightItem = Number(marginRightStringItem.split("px")[0])
//     const totalWidthItem = widthItem + marginRightItem
//     const widthWindow  = totalWidthItem * 3

//     const contentSliderStyles = getComputedStyle(contentSlider)

//     const widthStringSlider = contentSliderStyles.getPropertyValue('width')
//     const widthSlider = Number(widthStringSlider.split("px")[0])

//     // const width = Number(widthString.split("px")[0])
//     // const marginRight = Number(marginRightString.split("px")[0])
//     // const shiftX = -((width + marginRight)/width) * 100
//     const shiftX = -(widthWindow / widthSlider) * 100
    
//     // console.log(width)
//     // console.log(marginRight)
//     console.log('Curr slider X Mobile:', shiftX)
//     // console.log(indexChange)
//     // console.log(currSliderIndex)
//     // console.log("//")

//     contentSlider.style.transform = `translateX(${currSliderIndex * shiftX}%)`
        

// }

// Making this one slider for movies //
// Keeping this, something to "track" the position when the page resizes
export function navigateFilmSlider({indexChange, contentSlider, sliderContent}) {
    const sliderType = contentSlider.getAttribute('data-slider-type')
    let currSliderIndex = trackSliderIndex[sliderType] += indexChange
    


    // if (currSliderIndex > 3) {
    //     trackSliderIndex[slider] = 2
    // }
    
    if (currSliderIndex === 3) {
        currSliderIndex = 2
        trackSliderIndex[sliderType] = currSliderIndex
        // currSlideIndex = 
        console.log("returned")
        // return 
    }

    if (currSliderIndex < 0) {
        currSlideIndex = 0
        trackSliderIndex[sliderType] = currSliderIndex
        console.log("returned")
        // return
    }

    console.log("Slider index D/T:")
    console.log(currSliderIndex)

    const sliderContentStyles = getComputedStyle(sliderContent[0])

    const marginRightStringItem = sliderContentStyles.getPropertyValue('margin-right')
    const widthStringItem = sliderContentStyles.getPropertyValue('width')

    const widthItem = Number(widthStringItem.split("px")[0])
    const marginRightItem = Number(marginRightStringItem.split("px")[0])
    const totalWidthItem = widthItem + marginRightItem
    const widthWindow  = totalWidthItem * 4

    // 

    const contentSliderStyles = getComputedStyle(contentSlider)

    const widthStringSlider = contentSliderStyles.getPropertyValue('width')
    const widthSlider = Number(widthStringSlider.split("px")[0])

    //


    const shiftX = -(widthWindow / widthSlider) * 100
    console.log('Curr slider X Tablet/Desktop:', shiftX)

    contentSlider.style.transform = `translateX(${currSliderIndex * shiftX}%)`

    
}

export function adjustSlider({prevWidth, contentSlider, sliderContent}) {
    console.log('Prev',prevWidth)
    const sliderType = contentSlider.getAttribute('data-slider-type')
    let currSliderIndex = trackSliderIndex[sliderType]
    console.log('Curr slide index Adjust method:', currSliderIndex)
    if (prevWidth < mobileBreakpoint) {
        if (window.innerWidth >= mobileBreakpoint && currSliderIndex === 3) {
            console.log('Before:',  trackSliderIndex[sliderType])
            navigateFilmSlider({indexChange: 0, contentSlider: contentSlider, sliderContent: sliderContent})
            console.log('After:',  trackSliderIndex[sliderType])
            // Step 2 might be to make a method that handles this specifially
        } else if (window.innerWidth >= mobileBreakpoint && currSliderIndex === 1) {
            navigateFilmSlider({indexChange: -1, contentSlider: contentSlider, sliderContent: sliderContent})
        } else if (window.innerWidth >= mobileBreakpoint && currSliderIndex === 2) {
            console.log('Before:',  trackSliderIndex[sliderType])
            navigateFilmSlider({indexChange: -1, contentSlider: contentSlider, sliderContent: sliderContent})
            console.log('After:',  trackSliderIndex[sliderType])
        }
    }

    // What I COULD do, is add a method to handle each situation

}
// export function navigateFilmSlider({indexChange, sliderContent}) {
//     const sliderType = sliderContent[0].getAttribute('data-index-type')
//     const currSliderIndex = trackSliderIndex[sliderType] += indexChange
//     console.log("desktop")
    
//     if (currSliderIndex === 3) {
//         trackSliderIndex[sliderType] = 2
//         console.log("returned")
//         return 
//     }

//     if (currSliderIndex < 0) {
//         trackSliderIndex[sliderType] = 0
//         console.log("returned")
//         return
//     }

//     const sliderContentStyles = getComputedStyle(sliderContent[0])

//     const widthString = sliderContentStyles.getPropertyValue('width')
//     const marginRightString = sliderContentStyles.getPropertyValue('margin-right')

//     const width = Number(widthString.split("px")[0])
//     const marginRight = Number(marginRightString.split("px")[0])
//     const shiftX = -((width + marginRight)/width) * 100
    
//     console.log(width)
//     console.log(marginRight)
//     console.log(shiftX)
//     console.log("//")


//     sliderContent.forEach((image, index) => {
//         if (index === 11) {
//             console.log(index)
//             console.log(indexChange*451.02040816)
//         }
//         image.style.transform = `translateX(${currSliderIndex * (4*shiftX)}%)`

//     })
    
// }

export function sliderListen({sliderButtons, contentSlider, sliderContent}) {


    sliderButtons.forEach((button) => {
        button.addEventListener('click', ()=> {
            const indexChange = +button.getAttribute('data-index-change')
            const screenWidth = window.innerWidth
            console.log(screenWidth)
            if (screenWidth < 810) {
                navigateFilmSliderMobile({indexChange: indexChange, contentSlider: contentSlider, sliderContent: sliderContent})
            } else {
                console.log(screenWidth)
                navigateFilmSlider({indexChange: indexChange, contentSlider: contentSlider, sliderContent: sliderContent})
            }
    
        })
    })
}
// export function sliderListen({sliderButtons, sliderContent}) {


//     sliderButtons.forEach((button) => {
//         button.addEventListener('click', ()=> {
//             const indexChange = +button.getAttribute('data-index-change')
//             const screenWidth = window.innerWidth
//             console.log(screenWidth)
//             if (screenWidth < 810) {
//                 navigateFilmSliderMobile({indexChange: indexChange, sliderContent: sliderContent})
//             } else {
//                 console.log(screenWidth)
//                 navigateFilmSlider({indexChange: indexChange, sliderContent: sliderContent})
//             }
    
//         })
//     })
// }

export function sliderTrav({dirr, curr, slider}) {  // considering optional param
    const sliderCards = slider.querySelectorAll('.idx-cont')

    const itemsToMove = window.innerWidth >= 810 ? 4 : 3
    console.log('itm', itemsToMove)
    const maxGroup = Math.ceil(sliderCards.length / itemsToMove) - 1
    let currGroup = curr
    console.log('maxg', maxGroup)
    console.log(dirr)
    currGroup = dirr > 0 ? currGroup+=1 : currGroup-=1
    currGroup = Math.max(0, Math.min(currGroup, maxGroup))
    console.log('cG', currGroup)

    const width = sliderCards[0].offsetWidth
    console.log(width)
    let gap = getComputedStyle(slider).getPropertyValue('gap')
    gap = gap.includes('%') ? calcGap({gap: gap, slider: slider}) : parseFloat(gap)

    console.log(gap)

    const scrollAmount = (itemsToMove) * (width + gap)

    let trgScroll = currGroup * scrollAmount
    console.log('trg', trgScroll)



    // const scrollAmount = itemsToMove * sliderCards[0]



    slider.scrollTo({left: trgScroll, behavior:'smooth'})
    return currGroup // update cg


}

export function detCurr({slider}) {
    if (!slider) {
        console.log('error')
        return
    }
    
    const sliderX = slider.getBoundingClientRect().left
    const cards = slider.querySelectorAll('.idx-cont')
    const winSize = window.innerWidth >= 810 ? 4 : 3
    let curr = 0
    let i = 0

    // const card = cardsd[0] 
    for (const card of cards) {
        if (((i + 1) % winSize) === 0) {
            curr += 1
            console.log(curr)
        }
        console.log(i, curr)
        
        const cardX = card.getBoundingClientRect().left
        if (cardX == sliderX && i + 1 / winSize == 0) {
            // Index @A front
            console.log(curr)
            return curr            
        } else if (cardX == sliderX) {
            console.log(curr)
            return curr // Something about the group it's in and it's position in the group
        }

        i += 1
    }
    // forEach cant return a value....
    
}

function calcGap({gap, slider}) {
    const perc = parseFloat(gap)
    const sliderWidth = slider.offsetWidth

    const gapPx = (perc / 100) * sliderWidth

    return gapPx
}