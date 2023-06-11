import { useEffect, useState } from "react"

const StarRating = ({ stars, onChange, disabled }) => {
    const [activeStars, setActiveStars] = useState(stars)

    useEffect(() => {
        setActiveStars(stars)
    }, [stars])

    return (
        <div className="stars-container">
            <div
                className={activeStars >= 1 ? 'filled' : 'empty'}
                onMouseEnter={() => {
                    if (!disabled) setActiveStars(1);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveStars(stars);
                }}
                onClick={() => {
                    if (!disabled) onChange(1);
                }}
            >
                <i className="fa fa-star" />
            </div>
            <div
                className={activeStars >= 2 ? 'filled' : 'empty'}
                onMouseEnter={() => {
                    if (!disabled) setActiveStars(2);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveStars(stars);
                }}
                onClick={() => {
                    if (!disabled) onChange(2);
                }}
            >
                <i className="fa fa-star" />
            </div>
            <div
                className={activeStars >= 3 ? 'filled' : 'empty'}
                onMouseEnter={() => {
                    if (!disabled) setActiveStars(3);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveStars(stars);
                }}
                onClick={() => {
                    if (!disabled) onChange(3);
                }}
            >
                <i className="fa fa-star" />
            </div>
            <div
                className={activeStars >= 4 ? 'filled' : 'empty'}
                onMouseEnter={() => {
                    if (!disabled) setActiveStars(4);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveStars(stars);
                }}
                onClick={() => {
                    if (!disabled) onChange(4);
                }}
            >
                <i className="fa fa-star" />
            </div>
            <div
                className={activeStars >= 5 ? 'filled' : 'empty'}
                onMouseEnter={() => {
                    if (!disabled) setActiveStars(5);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveStars(stars);
                }}
                onClick={() => {
                    if (!disabled) onChange(5);
                }}
            >
                <i className="fa fa-star" />
            </div>
        </div>
    )
}

export default StarRating;
