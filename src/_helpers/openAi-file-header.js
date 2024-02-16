export function openAiFileHeader() {
    return {
        Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY
    }
}
