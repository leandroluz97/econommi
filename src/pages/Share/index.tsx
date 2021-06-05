import React, { useEffect } from "react"
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount
} from "react-share";
import {
  EmailShareButton,
  FacebookShareButton,
  
} from "react-share";
import {
 
  FacebookIcon,
  
} from "react-share";

const Share = () => {
  useEffect(() => {
    console.log("partilar")
  }, [])
  return <div>

   
    <FacebookShareButton url={'www.econommi-app.com'} quote="A platform where you can manage and keep track of your
                income and outcome to have you" hashtag="#econommi #finances" >
      <FacebookIcon></FacebookIcon>
      </FacebookShareButton>


  </div>
}

export default Share
