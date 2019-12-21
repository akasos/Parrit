import React, {Component} from 'react';
import style from "styled-components";
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
    }

    state = {
        title: ''
    };

    onInputChange = event => {
        this.setState({title: event.target.value});
    };

    addPairingBoard = () => {

    };

    render() {
        const {cancel} = this.props;
        return (
            <ModalContainer data-testid="test" className="ui dimmer modals visible active modal-container" onClick={cancel}>
                <AddPairingBoardContainer onClick={(event) => event.stopPropagation()}
                                      className="ui standard modal visible active">
                    <TitleWrapper><Title>Add Pairing Board</Title></TitleWrapper>
                    <AddPairingBoardInput className="add-teammate-input" type="text" onChange={this.onInputChange}
                                      value={this.state.name}/>
                    <div className="actions">
                        <Button onClick={() => this.addTeammate()}
                                className="ui primary button add-teammate-button">Ok</Button>
                        <Button onClick={cancel} className="ui button cancel-adding-teammate-button">Cancel</Button>
                    </div>
                </AddPairingBoardContainer>
            </ModalContainer>

        );
    }
}

export default AddPairingBoard;