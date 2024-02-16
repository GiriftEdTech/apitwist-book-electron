import { useState, useEffect, useCallback } from "react"
import { useParams, useHistory } from "react-router-dom"
import { editorSettings, updateContent, updateContentId } from "./services"
import { ContextlessEditor as Editor } from "@escolalms/h5p-react"
import { utils } from "../../_helpers"

const H5pEditor = () => {
    const { contentId, h5pId } = useParams()
    const history = useHistory()
    const [settings, setEditorSettings] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (h5pId) {
            setLoading(true)
            editorSettings(h5pId === "new" ? undefined : h5pId, utils.getStore("locale"))
                .then((res) => res.json())
                .then((data) => {
                    setEditorSettings(data.data)
                    setLoading(false)
                })
        }
    }, [h5pId])

    const onSubmit = useCallback((data) => {
        setLoading(true)
        updateContent(data, h5pId === "new" ? undefined : h5pId)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    setLoading(false)
                    updateContentId(contentId, data.data.id).then((r) => history.goBack())
                }
            })
    }, [])

    if (!settings) {
        return <p>loading...</p>
    }

    return (
        settings && (
            <Editor
                lang={utils.getStore("locale")}
                onError={(err) => console.error(err)}
                allowSameOrigin={true}
                state={settings}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    )
}

export default H5pEditor
