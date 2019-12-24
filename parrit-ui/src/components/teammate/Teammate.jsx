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
    const [{ isDragging, string }, drag] = useDrag({
        item: { id: props.teammate.id, type: ItemTypes.TEAMMATE },
        end(item, monitor){
            if(monitor.didDrop()){
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const test = () =>{
        return '';
    };

    return (
        <TeammateContainer ref={drag} isDragging={isDragging}>
            {props.teammate.name}
            <p>{test()}</p>
        </TeammateContainer>
    );
};

export default Teammate;