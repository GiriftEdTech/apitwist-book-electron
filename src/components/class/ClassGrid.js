import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { utils } from "../../_helpers"
import ClassCover from "./ClassCover"
import ClassLoader from "./ClassLoader"
import { getTranslatedText as t } from "../../_locale"
import { useParams } from "react-router-dom"
import ClassLoaderGrid from "./ClassLoaderGrid"
import ClassType from "./ClassType"
import ClassContainer from "./ClassContainer"

const ClassGrid = ({ component }) => {
    const { username } = useParams()
    const { loading, classes, error } = useSelector((state) => state.classes)
    const { user } = useSelector((state) => state.users)

    const activeClasses = useMemo(
        () =>
            classes && utils.arrayHasLength(classes) && utils.isUserStudent(user)
                ? classes.filter((cls) => cls.enrollment_status === "active")
                : classes,
        [classes]
    )
    const pendingClasses = useMemo(
        () =>
            classes &&
            utils.arrayHasLength(classes) &&
            utils.isUserStudent(user) &&
            classes.filter((cls) => cls.enrollment_status === "pending"),
        [classes]
    )

    return (
        <div className="class_carousel">
            {utils.arrayHasLength(pendingClasses) && (
                <div className="mb-5">
                    <ClassType title={t("waitingApproval")} />
                    {loading && <ClassLoaderGrid />}
                    <ClassContainer classes={pendingClasses} component={component} />
                </div>
            )}
            {((utils.arrayHasLength(pendingClasses) && utils.arrayHasLength(activeClasses)) ||
                (!utils.arrayHasLength(pendingClasses) && !utils.arrayHasLength(activeClasses)) ||
                utils.arrayHasLength(activeClasses)) && <ClassType title={t("classes")} />}

            {loading && <ClassLoaderGrid />}
            <ClassContainer classes={activeClasses} component={component} />

            {error && <h4 className="text-danger">{`${error.code} - ${error.message}`}</h4>}
            {(!classes || classes.length === 0) && !loading ? (
                user && !utils.isUserStudent(user) ? (
                    <h4>{t("noClassCreated")}</h4>
                ) : username ? (
                    <h4>{t("noPublicClasses")}</h4>
                ) : (
                    <h4>{t("noClasses")}</h4>
                )
            ) : (
                ""
            )}
        </div>
    )
}

export default React.memo(ClassGrid)
