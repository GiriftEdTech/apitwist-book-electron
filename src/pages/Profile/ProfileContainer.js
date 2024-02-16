import React from "react"
import Header from "../../components/partials/Header"
import Footer from "../../components/partials/Footer"
import { Card, Col, Container, Row } from "react-bootstrap"

const ProfileContainer = (props) => {
    return (
        <Container className="my-5 shadow">
            <Row>
                <Col>
                    <Card className="profile-card">
                        <Card.Body>{props.children}</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileContainer
