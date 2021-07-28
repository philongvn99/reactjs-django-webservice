import React from 'react'
import { Container, Row, Col } from 'reactstrap';
const HomePage = (props) => {
    document.getElementById('home_link').classList='nav-link active'
    return (
        <Container>
            <Row style={style.row}>
                <Col>
                    <h1 className="text-dark font-weight-bold mb-3" style={{justifyContent: "center", display: "flex"}}>Manchester United</h1>
                    <div className="border-top border-primary w-50 mx-auto my-0"></div>
                </Col>
            </Row>
            <Row>
                <Col sm="2"></Col>
                <Col sm="8">
                    <Row style={style.row}>
                        <Col sm="5">
                            <h1 className="text-dark font-weight-bold mb-3">Our Destiny</h1>
                            <div className="border-top border-danger w-100 mx-auto my-3"></div>
                            <p className="mb-4">Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England, that competes in the Premier League, the top flight of English football. Nicknamed "the Red Devils", the club was founded as Newton Heath LYR Football Club in 1878, changed its name to Manchester United in 1902 and moved to its current stadium, Old Trafford, in 1910.</p>
                        </Col>
                        <Col sm="7">
                            <div className=""><img src="https://i.pinimg.com/564x/01/63/e3/0163e38a89faf34aef0b98161e1f18fb.jpg" alt="Sir Alex" className="w-100"/></div>
                        </Col>
                    </Row>
                    <Row style={style.row}>
                        <Col sm="7">
                            <img src="https://i.pinimg.com/564x/a2/33/8c/a2338c3a62379b050ed9e5df9d399129.jpg" alt="Old Trafford" className="w-100"/>
                        </Col>
                        <Col sm="5">
                            <h1 className="text-dark font-weight-bold mb-3">Our Destiny</h1>
                            <div className="border-top border-danger w-100 mx-auto my-3"></div>
                            <p className="mb-4">Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England, that competes in the Premier League, the top flight of English football. Nicknamed "the Red Devils", the club was founded as Newton Heath LYR Football Club in 1878, changed its name to Manchester United in 1902 and moved to its current stadium, Old Trafford, in 1910.</p>
                        </Col>
                    </Row>
                </Col>
                <Col sm="2"></Col>
            </Row>
        </Container>
    )
}
export default HomePage;

const style = {
    row: {
        marginTop: "20px",
        alignItems: "center"
    }
}