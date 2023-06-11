import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetSpotReviews } from "../../../store/reviews"
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem"
import CreateReviewModal from "../CreateReviewModal"
import DeleteReviewModal from "../DeleteReviewModal"
import './SpotReviews.css'

const SpotReviews = ({ spot }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews.allReviews)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetSpotReviews(spot.id))
    }, [dispatch, spot.id])

    if (!reviews || !reviews.Reviews) return null
    // console.log('1', reviews)
    // console.log('2', reviews.reviews)
    // console.log('3', reviews.Reviews[0].User.firstName)
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
    let firstReview
    if (spot.numReviews === 0 && user && user.id !== spot.ownerId) {
        firstReview = <p>Be the first to post a review!</p>
    }
    // const { reviews: { Reviews } } = reviews
    // console.log('4', Reviews)

    // const userCheck = () => {
    //     if (user && user.id !== spot.ownerId && (!Reviews.find(review => user.id === review.userId))) {
    //         <button>
    //             <OpenModalMenuItem
    //                 modalComponent={<CreateReviewModal spot={spot} user={user} />}
    //                 itemText='Post Your Review'
    //             />
    //         </button>
    //     }
    // }

    return (
        <>
            <div>
                {firstReview}
                {(user && user.id !== spot.ownerId && !Object.values(reviews.Reviews).find(review => user.id === review.userId)
                    && <button className="post-review-btn">
                        <OpenModalMenuItem
                            modalComponent={<CreateReviewModal spot={spot} user={user} />}
                            itemText='Post Your Review'
                        />
                    </button>)
                }
            </div>
            {Object.values(reviews.Reviews).reverse().map(review => (
                <div key={review.id}>
                    <h3 className="name">{review.User.firstName}</h3>
                    <h4 className="date">{months[review.createdAt.split('-')[1]]} {review.createdAt.split('-')[0]}</h4>
                    <p className="review">{review.review}</p>
                    {(user && user.id === review.userId
                        && <button className="delete-review-btn">
                            <OpenModalMenuItem
                                modalComponent={<DeleteReviewModal spot={spot} review={review} />}
                                itemText='Delete'
                            />
                        </button>)}
                </div>
            ))}
        </>
    )
}

export default SpotReviews;
