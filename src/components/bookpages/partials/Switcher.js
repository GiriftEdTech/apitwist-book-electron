import { Form } from "react-bootstrap"

const Switcher = ({ checked, label, handleSwitch, creator }) => {
    return (
        <>
            <Form className="d-flex w-100 justify-content-between">
                <Form.Label
                    htmlFor={creator ?? "switcher"}
                    className="mb-0 d-flex align-items-center cursor-pointer switch-label mr-2"
                >
                    {label}
                </Form.Label>
                <div className="item-right">
                    <Form.Check type="switch" id={creator ?? "switcher"} checked={checked} onChange={handleSwitch} />
                </div>
            </Form>
        </>
    )
}

export default Switcher
