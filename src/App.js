import React, { useEffect } from "react"
import { Provider } from "react-redux"
import AppRouter from "./Router"
import { store, utils } from "./_helpers"
import "./App.css"
import useIndexedDb from "./_hooks/useIndexedDb"

function App() {
    document.addEventListener("contextmenu", (event) => event.preventDefault())
    useEffect(() => {
        const getDataWithPrefix = (prefix) => {
            const keys = Object.entries(localStorage).filter((key) => key[0].startsWith(prefix))
            return keys
        }
        const prefix = "annotation_"
        const keys = getDataWithPrefix(prefix)

        const addAnnotationToIndexedDb = async (annotationType, bookId, pageId, annotation) => {
            await useIndexedDb().addAnnotation(annotationType, bookId, pageId, annotation)
        }
        const handleAnnotations = () => {
            keys.forEach((key) => {
                const annotationKey = key[0].split("_")
                const annotationType = "bookpageAnnotations"
                const bookId = annotationKey[1]
                const pageId = annotationKey[2]
                addAnnotationToIndexedDb(annotationType, bookId, pageId, JSON.parse(key[1]))
                localStorage.removeItem(key[0])
            })
        }
        keys && utils.arrayHasLength(keys) && handleAnnotations()
    }, [])

    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

export default App
