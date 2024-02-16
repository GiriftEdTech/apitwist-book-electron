import { getTranslatedText as t } from "../../_locale"

export const tutoringFormData = {
    subject: [
        { value: "history", label: t("history") },
        { value: "math", label: t("math") },
        { value: "chemistry", label: t("chemistry") },
        { value: "ict", label: t("ict") },
        { value: "biology", label: t("biology") }
    ],
    schoolYear: [
        { value: "elementary", label: t("elementary") },
        { value: "middle", label: t("middle") },
        { value: "highSchool", label: t("highSchool") }
    ],
    typeOfResource: [
        { value: "reflection", label: t("reflection") },
        { value: "summary", label: t("summary") },
        { value: "assesmentSheet", label: t("assesmentSheet") },
        { value: "lessonPlan", label: t("lessonPlan") },
        { value: "presentationIdeas", label: t("ideasForPresentation") },
        { value: "projectIdeas", label: t("projectIdeas") }
    ],
    lang: [{ value: "en", label: t("english") }]
}
