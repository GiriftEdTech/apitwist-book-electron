import React from "react"
import Category from "./Category"
import { getTranslatedText as t } from "../../_locale"
import { Link, useHistory } from "react-router-dom"
import { utils } from "../../_helpers"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
// import moment from "moment"
// import "moment/locale/tr"
import { Lock, Unlock } from "../icons"
import { classActions } from "../../_actions"

const ClassCover = ({ perClass, index, component }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((state) => state.users)
    const passwordToken = utils.getStore("passwordToken")
    let filtered_sessions =
        perClass.sessions &&
        perClass.sessions
            .filter((t) => Date.now() <= new Date(utils.getDurationAddedTime(t.starts_at, t.duration)))
            .sort((a, b) => {
                return new Date(a.starts_at) - new Date(b.starts_at)
            })

    let startDate = utils.arrayHasLength(filtered_sessions) && new Date(filtered_sessions[0].starts_at)
    let endDate =
        utils.arrayHasLength(filtered_sessions) &&
        new Date(utils.getDurationAddedTime(filtered_sessions[0].starts_at, filtered_sessions[0].duration))

    const showToast = () => {
        if (user && utils.isUserStudent(user)) {
            if (perClass.enrollment_status === "pending") {
                toast.warn(t("classSubsciptionIsPending"))
            } else if (utils.isClassExpired(perClass)) {
                toast.warn(t("classTimeIsExpired"))
            }
        }
    }

    return (
        <>
            <div className="single_class_container " tabIndex="0">
                <a
                    href={
                        user && utils.objectHasLength(user)
                            ? !utils.isUserStudent(user) || (utils.isUserStudent(user) && Boolean(perClass.is_public))
                                ? `https://class.apitwist.com/class/${perClass.code}?token=${passwordToken}`
                                : `${utils.getPath(perClass, passwordToken)}`
                            : `https://class.apitwist.com${utils.getPath(perClass)}?token=${passwordToken}`
                    }
                    onClick={showToast}
                >
                    <div className={`class class-color-${index % 10}`}>
                        <div className="class_details">
                            <span className="live-text text-uppercase">{perClass.code}</span>
                            <h3 className="text-capitalize">{perClass.name} </h3>
                            {component === "private" && (
                                <>
                                    <object type="owo/uwu">
                                        <a
                                            href={`https://class.apitwist.com/teachers/${perClass.teacher.username}`}
                                            className="a"
                                        >
                                            <h4>
                                                {utils.capitalize(perClass.teacher.name) +
                                                    " " +
                                                    utils.capitalize(perClass.teacher.surname)}
                                            </h4>
                                        </a>
                                    </object>
                                    <div className="d-flex  w-100 justify-content-between">
                                        <h6>
                                            {startDate && endDate
                                                ? `${startDate.getDate()} 
                                    ${startDate.toLocaleString(utils.getStore("locale"), {
                                        month: "long"
                                    })}
                                    ${utils.addZero(startDate.getHours())}:${utils.addZero(startDate.getMinutes())} -
                                    ${utils.addZero(endDate.getHours())}:${utils.addZero(endDate.getMinutes())}`
                                                : t("noSession")}
                                        </h6>
                                    </div>
                                    <div className="d-flex w-100 ">
                                        <Category category={perClass.category.name} />
                                    </div>
                                </>
                            )}
                            {startDate < Date.now() && new Date() < endDate && (
                                <div className="live-content d-flex justify-content-around align-items-center px-2 py-1 bg-dark text-white rounded-pill  ml-4">
                                    <span className="live-text mr-2"> {t("live")} </span>
                                    <span
                                        className="spinner-grow text-success"
                                        style={{ width: "10px", height: "10px" }}
                                    />
                                </div>
                            )}

                            {new Date(perClass.ends_at) < new Date() && (
                                <div className="live-content d-flex justify-content-around align-items-center px-2 py-1 bg-dark text-white rounded-pill  ml-4">
                                    <span className="text-indicator bg-white" />
                                    <span className="live-text ml-2"> {t("expired")} </span>
                                </div>
                            )}
                            {new Date(perClass.starts_at) > new Date() && (
                                <div className="live-content d-flex justify-content-around align-items-center px-2 py-1 bg-dark text-white rounded-pill  ml-4">
                                    <span className="text-indicator yellow" />
                                    <span className="live-text ml-2"> {t("soon")} </span>
                                </div>
                            )}
                            {component === "public" && (
                                <>
                                    {/* <div className="d-flex  w-100 justify-content-between">
                                        <h6>{`${moment(perClass.starts_at).format("ll")} - ${moment(
                                            perClass.ends_at
                                        ).format("ll")} `}</h6>
                                    </div> */}
                                    <div>
                                        <h5> {t("students") + ": " + perClass.users_count}</h5>
                                        <h5> {t("sessions") + ": " + perClass.sessions_count}</h5>
                                        <h5> {t("contents") + ": " + perClass.contents_count}</h5>
                                    </div>
                                </>
                            )}

                            <div className="public-icon">
                                {Boolean(perClass.is_public) ? (
                                    <>
                                        <span className="live-text text-uppercase mr-2">{t("public")}</span>
                                        <Unlock width="1.3rem" height="1.3rem" />
                                    </>
                                ) : (
                                    <>
                                        <span className="live-text text-uppercase mr-2">{t("private")}</span>
                                        <Lock width="1.3rem" height="1.3rem" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
}

export default ClassCover
