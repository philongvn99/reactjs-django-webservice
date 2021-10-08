import React, {useRef, useState, useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import WOW from 'wowjs'
import firebase from "firebase/app";
import './home-page.scss'

const HomePage = (props) => {

    const [thumbnailSrcDict, setThumbnailSrcDict] = useState(null);

    const fireDatabase = firebase.database()

    useEffect(()=>{
        async function getThumbnailSrcDict() {
            fireDatabase.ref(`/home`)
            .on('value', snapshot => {
                setThumbnailSrcDict(snapshot.val());
            }, (errorObject) => {
                console.log('The read failed: ' + errorObject.name);
            })
        };
        getThumbnailSrcDict()},
        []
    )

    document.getElementById('home_link').classList='nav-link active'

    let articleRef1 = useRef(null);
    let articleRef2 = useRef(null);
    let articleRef3 = useRef(null);
    let articleRef4 = useRef(null);

    const executeScroll = (ref) => {
        console.log(ref)
        if (!ref.current) return;
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    new WOW.WOW({
        live: false
    }).init();


    return (
        <Container>
            <Row className="wow fadeInDown"> 
                <Col>
                    <h1 className="text-dark font-weight-bold mb-3 title">Manchester United</h1>
                    <div className="border-top border-danger w-100 mx-auto my-0"></div>
                </Col>
            </Row>
            <Row className="jump-section-1">
                <Col sm="3" className="wow fadeInUp jump-col"><button className="jump-button" onClick={() => executeScroll(articleRef1)}><img src={thumbnailSrcDict["jump-1"]["article-1"]["mini-thumbnail"]} alt="jump-1-1" ></img></button></Col>
                <Col sm="3" className="wow fadeInDown jump-col"><button className="jump-button" onClick={() => executeScroll(articleRef2)}><img src={thumbnailSrcDict["jump-1"]["article-2"]["mini-thumbnail"]} alt="jump-1-2" ></img></button></Col>
                <Col sm="3" className="wow fadeInDown jump-col"><button className="jump-button" onClick={() => executeScroll(articleRef3)}><img src={thumbnailSrcDict["jump-1"]["article-3"]["mini-thumbnail"]} alt="jump-1-2" ></img></button></Col>
                <Col sm="3" className="wow fadeInUp jump-col"><button className="jump-button" onClick={() => executeScroll(articleRef4)}><img src={thumbnailSrcDict["jump-1"]["article-4"]["mini-thumbnail"]} alt="jump-1-1" ></img></button></Col>
            </Row>
            <Row className="basic-article-group"> 
                <Col sm="2"></Col>
                <Col sm="8">
                    <div className="border-top border-danger w-100 mx-auto my-0" ref={articleRef1}></div>
                    <Row className="wow fadeInRight center-row" id="intro-section-1" >
                        <Col sm="5">
                            <h1 className="text-dark font-weight-bold mb-3">Who are we?</h1>
                            <div className="border-top border-danger w-100 mx-auto my-3"></div>
                            <p className="mb-4">
                                Manchester United Football Club is a professional football 
                                club based in Old Trafford, Greater Manchester, England, 
                                that competes in the Premier League, the top flight of 
                                English football. Nicknamed "the Red Devils", 
                                the club was founded as Newton Heath LYR Football Club 
                                in 1878, changed its name to Manchester United in 1902 
                                and moved to its current stadium, Old Trafford, in 1910.
                            </p>
                        </Col>
                        <Col sm="7">
                            <img src={thumbnailSrcDict["jump-1"]["article-1"]["thumbnail"]}  alt="United" className="article-thumbnail w-100"/>
                        </Col>
                    </Row>
                    <div className="border-top border-danger w-100 mx-auto my-0" ref={articleRef2}></div>
                    <Row className="wow fadeInLeft center-row" id="intro-section-2" >
                        <Col sm="7">
                            <img src={thumbnailSrcDict["jump-1"]["article-2"]["mini-thumbnail"]}  alt="Old Trafford" className="article-thumbnail w-100"/>
                        </Col>
                        <Col sm="5">
                            <h1 className="text-dark font-weight-bold mb-3">Old Trafford</h1>
                            <div className="border-top border-danger w-100 mx-auto my-3"></div>
                            <p className="mb-4">
                                Nicknamed "The Theatre of Dreams" by Bobby Charlton, 
                                Old Trafford has been United's home ground since 1910, 
                                although from 1941 to 1949 the club shared Maine Road with 
                                local rivals Manchester City as a result of Second World War 
                                bomb damage. Old Trafford underwent several expansions in 
                                the 1990s and 2000s, including the addition of extra tiers to
                                the North, West and East Stands, almost returning the stadium 
                                to its original capacity of 80,000.
                            </p>
                        </Col>
                    </Row>
                    <div className="border-top border-danger w-100 mx-auto my-0" ref={articleRef3}></div>
                    <Row className="wow fadeInRight center-row" id="intro-section-3" >
                        <Col sm="5">
                            <h1 className="text-dark font-weight-bold mb-3">Sir Alex Ferguson</h1>
                            <div className="border-top border-danger w-100 mx-auto my-3"></div>
                            <p className="mb-4">
                                Ferguson was appointed manager of Manchester United in November 1986. 
                                During his 26 years with Manchester United he won 38 trophies, 
                                including 13 Premier League titles, five FA Cups, and two UEFA Champions League titles. 
                                He was knighted in the 1999 Queen's Birthday Honours list for his services to the game. 
                                Ferguson is the longest-serving manager of Manchester United, having overtaken 
                                Sir Matt Busby's record on 19 December 2010. He retired from management at 
                                the end of the 2012–13 season, having won the Premier League in his final season.</p>
                        </Col>
                        <Col sm="7">
                            <img src={thumbnailSrcDict["jump-1"]["article-3"]["mini-thumbnail"]}  alt="Sir Alex" className="article-thumbnail w-100"/>
                        </Col>
                    </Row>
                    <div className="border-top border-danger w-100 mx-auto my-0" ref={articleRef4}></div>
                    <Row className="wow fadeInLeft center-row" id="intro-section-4" >
                        <Col sm="7">
                            <img src={thumbnailSrcDict["jump-1"]["article-4"]["mini-thumbnail"]}  alt="ManUtd No7" className="article-thumbnail w-100" ref={articleRef4}/>
                        </Col>
                        <Col sm="5">
                            <h1 className="text-dark font-weight-bold mb-3">Number 7</h1>
                            <div className="border-top border-danger w-100 mx-auto my-3"></div>
                            <p className="mb-4">
                                Manchester United has had great players come and go. Sir Bobby Charlton, Mark Hughes, 
                                and Roy Keane just to name a few. However, none of those players wore the No. 7 shirt, 
                                a special one in the history of United. Ever since the 1960s, it has previously been 
                                worn by club icons like George Best, Bryan Robson, Eric Cantona and David Beckham. 
                                Now, it returns to the man who succeeded Beckham in it, Ronaldo.
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col sm="2"></Col>
            </Row>
        </Container>
    )
}
export default HomePage;