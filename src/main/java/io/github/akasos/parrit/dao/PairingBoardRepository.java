package io.github.akasos.parrit.dao;

import io.github.akasos.parrit.model.PairingBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PairingBoardRepository extends JpaRepository<PairingBoard, Long> {
    List<PairingBoard> findAll();
}
