function useIndexedDb() {
    const dbName = "apitwist-book"
    const dbVersion = 1
    let storeNames = ["bookpageAnnotations", "whiteBoardAnnotations", "blackBoardAnnotations"]

    const openDatabase = () => {
        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

        if (!indexedDB) {
            return
        }

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, dbVersion)

            request.onerror = (event) => {
                reject("Error opening database")
            }

            request.onsuccess = (event) => {
                const db = request.result
                resolve(db)
            }

            request.onupgradeneeded = (event) => {
                const db = event.target.result

                storeNames.forEach((storeName) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true })
                    }
                })
            }
        })
    }

    const addAnnotation = async (storeName, ...args) => {
        const db = await openDatabase()

        const transaction = db.transaction([storeName], "readwrite")
        const store = transaction.objectStore(storeName)
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

        if (!isSafari) {
            let isIndexedDbAvailable = async () => {
                if (!navigator.storage) return

                const estimate = await navigator.storage.estimate(),
                    // calculate remaining storage in MB
                    available = Math.floor((estimate.quota - estimate.usage) / 1024 / 1024)
                let minimumAvailable = 1

                return available > minimumAvailable
            }

            if (!isIndexedDbAvailable()) {
                return
            }
        }

        let id
        let data

        const [bookId, pageId, annotationJSON] = args
        if (bookId && pageId) {
            id = `${bookId}_${pageId}`
            data = { id, annotationJSON }
        } else {
            const [annotationJSON] = args
            // If bookId and pageId are not provided, assing id as annotation type
            id = storeName
            data = { id, annotationJSON }
        }

        store.put(data)

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                resolve("Annotation added/updated successfully")
            }

            transaction.onerror = (event) => {
                reject("Error adding/updating annotation")
            }
        })
    }

    const deleteAnnotation = async (storeName, bookId, pageId) => {
        const db = await openDatabase()

        const transaction = db.transaction([storeName], "readwrite")
        const store = transaction.objectStore(storeName)

        const id = bookId && pageId && `${bookId}_${pageId}`

        const request = store.delete(id ?? storeName)

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve("Annotation deleted successfully")
            }

            request.onerror = () => {
                reject("Error deleting annotation")
            }
        })
    }

    const getAnnotations = async (storeName, bookId, pageId) => {
        const db = await openDatabase()

        const transaction = db.transaction([storeName], "readonly")
        const store = transaction.objectStore(storeName)

        const id = bookId && pageId && `${bookId}_${pageId}`
        const request = store.get(id ?? storeName)

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result.annotationJSON)
                } else {
                    resolve(request.result)
                }
            }
            request.onerror = () => {
                reject("Error getting annotation")
            }
        })
    }

    return {
        openDatabase,
        addAnnotation,
        deleteAnnotation,
        getAnnotations
    }
}

export default useIndexedDb
