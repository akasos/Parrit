package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.PairingBoardController;
import io.github.akasos.parrit.dao.PairingBoardRepository;
import io.github.akasos.parrit.model.PairingBoard;
import io.github.akasos.parrit.model.Person;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@WebMvcTest(value = PairingBoardController.class)
public class PairingBoardDTOControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    PairingBoardRepository pairingBoardRepository;

    @Test
    public void getAllPairingBoards() throws Exception {
        PairingBoard pairingBoard = new PairingBoard("The Salt Mines");
        pairingBoard.setId(1L);

        Person person = new Person("Austin");
        person.setId(1L);

        pairingBoard.addTeammate(person);

        List<PairingBoard> listOfPairingBoards = Arrays.asList(pairingBoard);

        Mockito.when(pairingBoardRepository.findAll()).thenReturn(listOfPairingBoards);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/pairingboards")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        String expected = "[{\"id\": 1, \"title\": \"The Salt Mines\", \"teammates\": [{\"id\": 1, \"name\": \"Austin\", \"pairingBoard\": 1}]}]";

        JSONAssert.assertEquals(expected, resultResponse.getResponse().getContentAsString(), false);

    }

    @Test
    public void createPairingBoard() throws Exception {
        PairingBoard pairingBoard = new PairingBoard("The Salt Mines");
        pairingBoard.setId(1L);

        Mockito.when(pairingBoardRepository.save(pairingBoard)).thenReturn(pairingBoard);

        String examplePairingBoardJson =
                "{\"id\": \"1\", \"title\": \"The Salt Mines\"}";

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/pairingboards")
                .accept(MediaType.APPLICATION_JSON).content(examplePairingBoardJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());

    }

    @Test
    public void updatePairingBoard() throws Exception {
        PairingBoard pairingBoard = new PairingBoard("The Salt Mines");
        pairingBoard.setId(1L);

        Mockito.when(pairingBoardRepository.findById(pairingBoard.getId())).thenReturn(Optional.of(pairingBoard));
        Mockito.when(pairingBoardRepository.save(pairingBoard)).thenReturn(pairingBoard);

        String examplePairingBoardJSON = "{\"title\": \"The Moon Base\", \"teammates\": []}";
        String expected = "{\"id\":1,\"title\":\"The Moon Base\",\"teammates\":[]}";

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/api/pairingboards/{pairingBoardId}", "1")
                .accept(MediaType.APPLICATION_JSON).content(examplePairingBoardJSON)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());

        assertEquals(response.getContentAsString(), expected);

    }

    @Test
    public void deletePairingBoard() throws Exception {
        PairingBoard pairingBoard = new PairingBoard("The Salt Mines");
        pairingBoard.setId(1L);

        Mockito.when(pairingBoardRepository.findById(pairingBoard.getId())).thenReturn(Optional.of(pairingBoard));
        Mockito.doNothing().when(pairingBoardRepository).delete(pairingBoard);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/api/pairingboards/{pairingBoardId}", "1")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}
