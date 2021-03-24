import React from 'react'
import { Container, Row, Col } from 'reactstrap';
const HomePage = (props) => {
    document.getElementById('home_link').classList='nav-link active'
    return (
        <Container>
            <Row>
                <div className="row body-content">
                    <div className="col-12 text-center mt-5">
                        <h1 className="text-dark font-weight-bold mb-3">Manchester United</h1>
                        <div className="border-top border-primary w-25 mx-auto my-3"></div>
                    </div>
                    <div className="container my-5">
                        <div className="row py-4">
                            <div className="col-lg-4 mb-4 my-lg-auto">
                                <h1 className="text-dark font-weight-bold mb-3">Our Destiny</h1>
                                <div className="border-top border-danger w-100 mx-auto my-3"></div>
                                <p className="mb-4">Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England, that competes in the Premier League, the top flight of English football. Nicknamed "the Red Devils", the club was founded as Newton Heath LYR Football Club in 1878, changed its name to Manchester United in 1902 and moved to its current stadium, Old Trafford, in 1910.</p>
                            </div>
                            <div className="col-lg-8"><img src="https://i.pinimg.com/564x/01/63/e3/0163e38a89faf34aef0b98161e1f18fb.jpg" alt="image" className="w-100"/></div>
                        </div>
                    </div>
                    <div className="container my-5">
                        <div className="row py-4">
                            <div className="col-lg-8">
                                <img src="https://i.pinimg.com/564x/a2/33/8c/a2338c3a62379b050ed9e5df9d399129.jpg" alt="image" className="w-100"/>
                            </div>
                            <div className="col-lg-4 mb-4 my-lg-auto">
                                <h1 className="text-dark font-weight-bold mb-3">Our Vision</h1>
                                <div className="border-top border-danger w-100 mx-auto my-3"></div>
                                <p className="mb-4">Manchester United is one of the most popular football clubs in the world, with one of the highest average home attendances in Europe. The club states that its worldwide fan base includes more than 200 officially recognised branches of the Manchester United Supporters Club (MUSC), in at least 24 countries. The club takes advantage of this support through its worldwide summer tours. Accountancy firm and sports industry consultants Deloitte estimate that Manchester United has 75 million fans worldwide. The club has the third highest social media following in the world among sports teams (after Barcelona and Real Madrid), with over 72 million Facebook followers as of July 2020. A 2014 study showed that Manchester United had the loudest fans in the Premier League.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    )
}
export default HomePage;