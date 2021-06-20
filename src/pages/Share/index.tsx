import React, { useEffect } from "react";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  TelegramShareButton,
  ViberShareButton,
} from "react-share";

import styles from "./styles.module.scss";

import gmail from "../../assets/gmail.svg";
import whatsapp from "../../assets/whatsapp.svg";
import viber from "../../assets/viber.svg";
import telegram from "../../assets/telegram.svg";
import messenger from "../../assets/messenger.svg";
import linkedin from "../../assets/linkedin.svg";
import twitter from "../../assets/twitter.svg";
import facebook from "../../assets/facebook.svg";

const Share = () => {
  return (
    <div className={styles.share}>
      <h2>Share 😉</h2>
      <div className={styles.share__wrapper}>
        <div className={styles.share__icons}>
          <FacebookShareButton
            url={"www.econommi-app.com"}
            quote="A platform where you can manage and keep track of your
                income and outcome to have you!"
            hashtag="#econommi #finances"
          >
            <img src={facebook} alt="facebook" />
          </FacebookShareButton>

          <EmailShareButton
            url="www.econommi-app.com"
            subject="hello"
            body="leandrodaluz97@gmail.com"
          >
            <img src={gmail} alt="gmail" />
          </EmailShareButton>

          <LinkedinShareButton
            url="https://www.linkedin.com/in/leandro-luz/"
            title="Econommi App"
            summary="A platform where you can manage and keep track of your
                income and outcome to have you!"
            source="https://www.linkedin.com/in/leandro-luz/"
          >
            <img src={linkedin} alt="linkedin" />
          </LinkedinShareButton>

          <TwitterShareButton
            url="www.econommi-app.com"
            title="Econommi App"
            hashtags={["#econommi", "#finances"]}
          >
            <img src={twitter} alt="twitter" />
          </TwitterShareButton>

          <WhatsappShareButton url="www.econommi-app.com" title="Econommi App">
            <img src={whatsapp} alt="whatsapp" />
          </WhatsappShareButton>

          <FacebookMessengerShareButton
            appId="fndbdcb"
            url="www.econommi-app.com"
            title="Econommi App"
          >
            <img src={messenger} alt="messenger" />
          </FacebookMessengerShareButton>

          <TelegramShareButton url="www.econommi-app.com" title="Econommi App">
            <img src={telegram} alt="telegram" />
          </TelegramShareButton>
          <ViberShareButton url="www.econommi-app.com" title="Econommi App">
            <img src={viber} alt="viber" />
          </ViberShareButton>
        </div>
      </div>
    </div>
  );
};

export default Share;
