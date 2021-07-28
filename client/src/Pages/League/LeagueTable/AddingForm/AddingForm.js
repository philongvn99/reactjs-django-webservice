import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

// fake data generator
const getObjects = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        team_name: null,
        logo_link: null
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


//-------------------------------------------STYLE---------------------------------------------------//
//----------------------------------------------------------------------------------------------------/
const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `5px`,
    height: '70px',

    // change background colour if dragging
    background: isDragging ? 'deeppink' : "#fff",
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver, boardtype) => ({
    background: boardtype === 'teams' ? '#e90052' : (boardtype === 'home' ? '#00ff85' : '#04f5ff'),
    padding: grid,
    width: '100%',
    minHeight: `820px`,
});

const renderScoreBoard = (num) => ( 
    Array.from({ length: num }, (v, k) => k).map(k => (
        <div style={style.scoreboardStyle}>
            <input type='number' id={`home-score-${k}`} style={style.scoreStyle}></input>
             - 
            <input type='number' id={`away-score-${k}`} style={style.scoreStyle}></input>
        </div>
    ))
);

const style = {
    imgStyle: {
        height: '30px',
        width: '30px',
        margin: '0px 10px'
    },
    hStyle: {
        color: "#303",
        fontFamily: "'Hanalei Fill', cursive"
    },
    rankStyle: {
        float: 'right', 
        margin: '0 0 0 20px', 
        fontSize: '20px', 
        fontFamily: "'Hanalei Fill', cursive"
    },
    scoreStyle: {
        height: '50px',
        width: '50px'
    },
    scoreboardStyle: {
        height: '70px',
        margin: '5px 5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#303'
    },
    boardStyle: {
        padding: '10px',
    },
};

const AddingForm = () => {
    const [teams, setTeams] = useState([]);
    const [home, setHome] = useState([]);
    const [away, setAway] = useState([]);
    const [id2List, setId2List] = useState({allteams: 'teams', hometeams: 'home', awayteams: 'away'})


    useEffect(() => {
      async function fetchMyAPI() {
        await axios.get('/UnitedHome/league/table')
        .then(res => {
          setTeams(res.data);
        })
        .catch(err => {
          alert(err);
        });
      }
      fetchMyAPI()
    }, [])

    const getList = (id) => id2List[id]==="teams" ? teams : (id2List[id]==="home"? home: away);

    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            switch(source.droppableId) {
                case 'allteams':
                    setTeams(items);
                  break;
                case 'hometeams':
                    setHome(items);
                  break;
                case 'awayteams':
                    setAway(items);
                    break;
                default:
                    return;
              }
              
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            if(result.allteams !== undefined) setTeams(result.allteams);
            if(result.awayteams !== undefined) setAway(result.awayteams);
            if(result.hometeams !== undefined) setHome(result.hometeams);
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
      <Container><Row>
        <DragDropContext onDragEnd={onDragEnd}>
            <Col style={{width: "30%"}}>
                <Droppable droppableId="allteams">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver, 'teams')}>
                            <h1 style={style.hStyle}>TEAMS</h1>
                            {teams.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={`team-${item.id}`}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            <img src={item.logo_link} alt={item.team_name + 'logo'} style={style.imgStyle}/>
                                            <span>{item.team_name}</span>
                                            <span style={style.rankStyle}>{item.id}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Col>
            <Col style={{width: "30%"}}>                        
                <Droppable droppableId="hometeams">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver, "home")}>
                            <h1 style={style.hStyle}>HOME SIDE</h1>
                            {home.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={`team-${item.id}`}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            <img src={item.logo_link} alt={item.team_name + 'logo'} style={style.imgStyle}/>
                                            <span>{item.team_name}</span>
                                            <span style={style.rankStyle}>{item.id}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Col>
            <Col style={{width: "10%"}}>
                <div style={style.boardStyle}>
                    <h1 style={style.hStyle}>Result</h1>
                    {renderScoreBoard(10)}
                </div>
            </Col>
            <Col style={{width: "30%"}}>                        
                <Droppable droppableId="awayteams">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver, "away")}>
                            <h1 style={style.hStyle}>AWAY SIDE</h1>
                            {away.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={`team-${item.id}`}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style                                            )}>
                                            <img src={item.logo_link} alt={item.team_name + 'logo'} style={style.imgStyle}/>
                                            <span>{item.team_name}</span>
                                            <span style={style.rankStyle}>{item.id}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Col>
        </DragDropContext>
      </Row></Container>
    );
}

export default AddingForm;