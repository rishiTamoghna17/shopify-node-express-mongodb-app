import React, { useState } from "react";
import { Page } from "@shopify/polaris";
import "./default.css";
import Menu from "../../components/MenuDefault/Menu";
import { BiLogoWindows } from "react-icons/bi";
import ConversationScreen from "../../components/ConversationScreen/ConversationScreen";
import { conversations } from "../../assets/dummydata";
import ConversationScreenWithhoutLogIn from "../../components/ConversationScreenWithhoutLogIn/ConversationScreenWithhoutLogIn";
import AISection from "../../components/AiChatWithOutLogin/AiChat";
import LoggedInAiChat from "../../components/AiChat/LoggedInAiChat";

function defaultPAge() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Page>
      <div>
        <section className="section-menu">
          <Menu
            width="10%"
            merchantLogo={<BiLogoWindows color="red" size="30px" />}
          />
        </section>
        <section className="section-conversation">
       { isLogin===true?<ConversationScreen
            width="20%"
            conversations={conversations}
            section1="10%"
          />:<ConversationScreenWithhoutLogIn width="20%"
          section1="10%"/>}
        </section>
        
        <section className="section-aisection">
        {isLogin===true?<LoggedInAiChat width="50%" section2="30%"/>:<AISection width="50%" section2="30%"/>}
        </section>
      </div>
    </Page>
  );
}

export default defaultPAge;
