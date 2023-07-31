import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { categorys } from "../../assets/dummydata";
import { AiOutlineMessage } from "react-icons/ai";
import { CiPaperplane } from "react-icons/ci";
import ChatInput from "../ChatInput/ChatInput";
import "./Aichat.css";
import ConversationBody from "../ConversationBody/ConversationBody";


const AISection = (props) => {
  const mainCategories = categorys.map((category) => category.mainCategory);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [subCategories, setSubCategories] = useState([]);
  const [prompts, setPrompts] = useState([]);
  // const [promptText, setPromptText] = useState("");
  const [showDefaultText, setShowDefaultText] = useState(true);
  const [submittedPrompts, setSubmittedPrompts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex(
        (prevIndex) => (prevIndex + 1) % mainCategories.length
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [mainCategories.length]);

  useEffect(() => {
    const fetchSubCategoriesAndPrompts = async () => {
      const subCategoriesData = categorys[currentCategoryIndex].subCategory;
      const promptsData = categorys[currentCategoryIndex].prompt;
      //   console.log("promptsData",promptsData);

      setSubCategories(subCategoriesData);
      setPrompts(promptsData);
    };

    fetchSubCategoriesAndPrompts();
  }, [currentCategoryIndex]);

  const handleCategoryChange = (direction) => {
    if (direction === "left") {
      setCurrentCategoryIndex((prevIndex) =>
        prevIndex === 0 ? mainCategories.length - 1 : prevIndex - 1
      );
    } else if (direction === "right") {
      setCurrentCategoryIndex(
        (prevIndex) => (prevIndex + 1) % mainCategories.length
      );
    }
  };

  // const handlePromptSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     const trimmedPrompt = promptText.trim();
  //     console.log("Button clicked!");
  //     if (promptText.trim() !== "") {
  //       setShowDefaultText(false);
  //       setSubmittedPrompts((prevPrompts) => [...prevPrompts, trimmedPrompt]);
  //     }
  //     setPromptText("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      className="ai-section"
      style={{ width: props.width, left: props.section2 }}
    >
      {showDefaultText ? (
        <>
          <div className="ai-section-header">
            <h1 className="ai-section-header-title">
              AI Assist Capabilities :{" "}
            </h1>
            <div className="category-buttons">
              <button onClick={() => handleCategoryChange("left")}>
                <AiOutlineArrowLeft />
              </button>
              <button onClick={() => handleCategoryChange("right")}>
                <AiOutlineArrowRight />
              </button>
            </div>
          </div>

          <section className="main-category">
            <div className="main-categories">
              {mainCategories.map((category, index) => (
                <div
                  key={index}
                  className={`main-category-text ${
                    index === currentCategoryIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentCategoryIndex(index)}
                >
                  <div className="main-category-icon">
                    <CiPaperplane color="white" size={15} />
                  </div>
                  {category}
                </div>
              ))}
            </div>
          </section>

          <div className="ai-section-header">
            <h1 className="ai-section-header-title">
              Some of the Capabilities :{" "}
            </h1>
          </div>
          <section className="subcategories">
            {subCategories?.map((subcategory) => (
              <div key={subcategory.subCategoryId} className="subcategory">
                <div className="subcategory-icon">
                  <AiOutlineMessage color="red" />
                </div>
                <div className="subcategory-text">{subcategory.type}</div>
              </div>
            ))}
          </section>

          <div className="ai-section-header">
            <h1 className="ai-section-header-title">prompts are : </h1>
          </div>
          <section className="prompts">
            {prompts?.map((prompt) => (
              <div key={prompt.promptId} className="prompt">
                <div className="prompt-icon">
                  <CiPaperplane color="white" size={15} />
                </div>
                <div className="prompt-text">
                  {prompt.prompt.slice(0, 100)}
                  {"...."}
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <section className="prompts">
          {/* <div className="prompt"> */}
          {/* <div className="prompt-icon">
              <CiPaperplane color="white" size={15} />
            </div>
            <div className="prompt-text">{promptText}</div> */}

          {/* {submittedPrompts.map((prompt, index) => (
            <div className="prompt" key={index}>
              <div className="prompt-icon float">
                <CiPaperplane color="white" size={15} />
              </div>
              <div className="prompt-text">{prompt}</div>
            </div>
          ))} */}
          {/* </div> */}
          <ConversationBody/>
        </section>
      )}
      {/* <div className="default-text">Type and enter your problem</div> */}


      <ChatInput 
      // value = {promptText} handleSubmit = {handlePromptSubmit} onChange = {setPromptText}
      />
    </div>
  );
};

export default AISection;
