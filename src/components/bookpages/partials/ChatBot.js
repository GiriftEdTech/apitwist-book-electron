import { useSelector } from "react-redux"
import { utils } from "../../../_helpers"
import TooltipContainer from "./TooltipContainer"
import { getTranslatedText as t } from "../../../_locale"
import AssistantModal from "./AssistantModal"
import { forwardRef } from "react"

const ChatBot = forwardRef((props, ref) => {
    const { isAssistantOpen, setAssistantOpen, setShownContent, pageId, pageWidth, pageHeight } = props
    const { topBarRef } = ref
    const { user } = useSelector((state) => state.users)
    return (
        <>
            {utils.userIsNotStudent(user) && (
                <TooltipContainer placement={"top"} name={t("assistantHelpText")}>
                    <div
                        className="position-fixed rounded-circle cursor-pointer assistant-icon"
                        onClick={() => setAssistantOpen(true)}
                        data-tut="chatbot"
                    >
                        <div>
                            <img
                                className="rounded-circle"
                                src={`/assets/img/chatbot_icon.png`}
                                alt="chat robot"
                                width="100"
                            />
                        </div>
                    </div>
                </TooltipContainer>
            )}
            {isAssistantOpen && (
                <AssistantModal
                    show={isAssistantOpen}
                    onHide={setAssistantOpen}
                    setShownContent={setShownContent}
                    pageId={pageId}
                    pageWidth={pageWidth}
                    pageHeight={pageHeight}
                    topBarRef={topBarRef}
                />
            )}
        </>
    )
})

export default ChatBot
