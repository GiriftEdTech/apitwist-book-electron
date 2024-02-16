export function openAiAuthHeader() {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY
    }
}
