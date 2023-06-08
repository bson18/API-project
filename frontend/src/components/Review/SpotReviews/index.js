import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSpotReviews } from "../../../store/reviews"

const SpotReviews = ({ spot }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spot.id))
    }, [dispatch, spot.id])
    // console.log('1', reviews)
    // console.log('2', reviews.reviews)
    // console.log('3', reviews.reviews.Reviews[0].User.firstName)
    const { reviews: { Reviews } } = reviews
    // console.log('4', Reviews)
    // console.log('5', Reviews[0].User.firstName)

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
        '12': 'December',
    }

    if (!reviews) return null

    if (spot.numReviews === 0 && user && user.id !== spot.OwnerId) {
        return <p>Be the first to post a review!</p>
    }

    return (
        <>
            {Reviews.reverse().map(review => (
                <div key={review.id}>
                    <h3>{review.User.firstName}</h3>
                    <h4>{months[review.createdAt.split('-')[1]]} {review.createdAt.split('-')[0]}</h4>
                    <p>{review.review}</p>
                </div>
            ))}
        </>
    )
}

export default SpotReviews
