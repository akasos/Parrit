import React from 'react';
import {useDrag} from "react-dnd";
import styled from 'styled-components'
import ItemTypes from "../../constants/ItemTypes";

const TeammateContainer = styled.div`
display: inline-block;
border-radius: 5px;
margin: 20px;
padding: 10px;
background-color: aqua;
border: 1px solid red;
opacity: ${props => props.isDragging ? 0.5: 1.0};
`;

const Teammate = (props) => {
    const [{ isDragging }, drag] = useDrag({
        item: { id: props.teammate.id, type: ItemTypes.TEAMMATE },
        end(item, monitor){
            if(monitor.didDrop()){
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <TeammateContainer ref={drag} isDragging={isDragging}>
            {props.teammate.name}
        </TeammateContainer>
    );
};

export default Teammate;