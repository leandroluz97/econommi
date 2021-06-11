import React, { useEffect } from "react";
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";
import { EmailShareButton, FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";
import styles from "./styles.module.scss";

const Share = () => {
  useEffect(() => {
    console.log("partilar");
  }, []);
  return (
    <div className={styles.share}>
      <div className={styles.share__icons}>
        <FacebookShareButton
          url={"www.econommi-app.com"}
          quote="A platform where you can manage and keep track of your
                income and outcome to have you"
          hashtag="#econommi #finances"
        >
          <FacebookIcon />
        </FacebookShareButton>

        <EmailShareButton
          url="https://www.leandro.com"
          subject="hello"
          body="leandrodaluz97@gmail.com"
        >
          Leadro
        </EmailShareButton>
      </div>
    </div>
  );
};

export default Share;
