import React, { useEffect, useState } from "react"
import Heart from "../../icons/Heart"
import { useSelector } from "react-redux"

const Favorite = ({ width, height, book, position, loading, toggleFavorite }) => {
    const [spinnerLoading, setSpinnerLoading] = useState(false)
    const { favorited } = useSelector((state) => state.favorite)

    useEffect(() => {
        setSpinnerLoading(false)
    }, [favorited])

    return (
        <div
            className={`favorite ${position ? position : ""} ${
                book &&
                !book.loading &&
                favorited &&
                favorited.length > 0 &&
                (favorited.includes(book.id) ? "favorited" : "")
            }`}
            onClick={() => {
                toggleFavorite && toggleFavorite()
                setSpinnerLoading(true)
            }}
        >
            {loading || spinnerLoading ? (
                <div
                    className="spinner-border"
                    style={{ width: "1rem", height: "1rem", color: "var(--c-heart-primary)" }}
                    role="status"
                />
            ) : (
                <Heart width={width && width} height={height && height} />
            )}
        </div>
    )
}

export default React.memo(Favorite)
