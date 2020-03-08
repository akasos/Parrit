import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import style from "styled-components";
import {createPairingBoard} from "../actions";

const ModalContainer = style.div``;
const AddPairingBoardContainer = style.div``;
const TitleWrapper = style.div``;
const Title = style.h2``;
const AddPairingBoardInput = style.input``;
const Button = style.button``;


export class AddPairingBoard extends Component {
    constructor(props) {
        super(props);
        this.addPairingBoard = this.addPairingBoard.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }
    escFunction(event){
        const {cancel} = this.props;
        if(event.keyCode === 27) {
            cancel();
        }
    }
    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    state = {
        title: ''
    };

    onInputChange = event => {
        this.setState({title: event.target.value});
    };

    addPairingBoard() {
        if (this.state.title !== '') {
            this.props.createPairingBoard(this.props.projectId, this.state);
            this.props.cancel();
        }
    };


    render() {
        const {cancel} = this.props;
        return (
            <ModalContainer data-testid="test" className="ui dimmer modals visible active modal-container"
                            onClick={cancel} onKeyPress={event => {
                                if(event.key === "Esc"){
                                    cancel();
                                }
            }}>
                <AddPairingBoardContainer onClick={(event) => event.stopPropagation()}
                                          className="ui standard modal visible active">
                    <TitleWrapper><Title>Add Pairing Board</Title></TitleWrapper>
                    <AddPairingBoardInput autoFocus className="add-pairing-board-input" type="text"
                                          onChange={this.onInputChange}
                                          onKeyPress={event => {
                                              if (event.key === "Enter") {
                                                  this.onInputChange(event);
                                                  this.addPairingBoard();
                                              }
                                          }}
                                          value={this.state.name}/>
                    <div className="actions">
                        <Button onClick={this.addPairingBoard}
                                className="ui primary button add-pairing-board-button">Ok</Button>
                        <Button onClick={cancel}
                                className="ui button cancel-adding-pairing-board-button">Cancel</Button>
                    </div>
                </AddPairingBoardContainer>
            </ModalContainer>

        );
    }
}

AddPairingBoard.propTypes = {
    cancel: PropTypes.func.isRequired,
    addPairingBoard: PropTypes.func.isRequired,
    projectId: PropTypes.number.isRequired
};

const mapStateToProps = state => {
    return {
        projectId: state.project['id']
    }
};

export default connect(mapStateToProps, {createPairingBoard})(AddPairingBoard);