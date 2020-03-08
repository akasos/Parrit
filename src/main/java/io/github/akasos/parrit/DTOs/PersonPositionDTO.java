package io.github.akasos.parrit.DTOs;

public class PersonPositionDTO {

    private boolean floating;

    private Long PairingBoardId;

    public boolean isFloating() {
        return floating;
    }

    public void setFloating(boolean floating) {
        this.floating = floating;
    }

    public Long getPairingBoardId() {
        return PairingBoardId;
    }

    public void setPairingBoardId(Long pairingBoardId) {
        PairingBoardId = pairingBoardId;
    }

}
