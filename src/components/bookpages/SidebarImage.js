import React, {useState} from "react"
import {Card} from "react-bootstrap";
import SidebarLoader from "./partials/SidebarLoader";

const SidebarImage = ({book_name, page_url, ...props}) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <Card.Img
        width="100%"
        src={process.env.REACT_APP_IMAGES_URL + "s-" + page_url}
        alt={book_name}
        loading="lazy"
        onLoad={() => {
          setLoaded(true)
        }}
      />

      {!loaded && <SidebarLoader/>}
    </>
  )
}

export default SidebarImage
