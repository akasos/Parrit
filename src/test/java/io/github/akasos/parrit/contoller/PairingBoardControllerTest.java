package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.PairingBoardController;
import io.github.akasos.parrit.dao.ProjectRepository;
import io.github.akasos.parrit.model.PairingBoard;
import io.github.akasos.parrit.model.Person;
import io.github.akasos.parrit.model.Project;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@WebMvcTest(value = PairingBoardController.class)
public class PairingBoardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ProjectRepository projectRepository;

    @Test
    public void createPairingBoard() throws Exception {

        List<PairingBoard> pairingBoardList = new ArrayList<>();
        List<Person> personList = new ArrayList<>();
        Project project = new Project("Minerva", "12345", pairingBoardList, personList);
        project.setId(1L);

        Mockito.when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        Mockito.when(projectRepository.save(project)).thenReturn(project);

        String expected = "{" +
                "\"id\": 1,\"name\": \"Minerva\"," +
                "\"pairingBoards\": [{\"id\": 1, \"name\": \"Area51\", \"personList\": []}]," +
                "\"people\": []" +
                "}";

        String examplePairingBoardJSON = "{\"id\": 1, \"title\": \"Area51\", \"personList\": []}";

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/project/1/pairingboard")
                .accept(MediaType.APPLICATION_JSON).content(examplePairingBoardJSON)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        JSONAssert.assertEquals(expected, response.getContentAsString(), false);

    }

//    @Test
//    public void updatePairingBoard() throws Exception {
//        PairingBoard pairingBoard = new PairingBoard("The Salt Mines");
//        pairingBoard.setId(1L);
//
//        Mockito.when(pairingBoardRepository.findById(pairingBoard.getId())).thenReturn(Optional.of(pairingBoard));
//        Mockito.when(pairingBoardRepository.save(pairingBoard)).thenReturn(pairingBoard);
//
//        String examplePairingBoardJSON = "{\"title\": \"The Moon Base\", \"teammates\": []}";
//        String expected = "{\"id\":1,\"title\":\"The Moon Base\",\"teammates\":[]}";
//
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//                .put("/api/pairingboards/{pairingBoardId}", "1")
//                .accept(MediaType.APPLICATION_JSON).content(examplePairingBoardJSON)
//                .contentType(MediaType.APPLICATION_JSON);
//
//        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();
//
//        MockHttpServletResponse response = resultResponse.getResponse();
//
//        assertEquals(HttpStatus.OK.value(), response.getStatus());
//
//        assertEquals(response.getContentAsString(), expected);
//
//    }
//
//    @Test
//    public void deletePairingBoard() throws Exception {
//        PairingBoard pairingBoard = new PairingBoard("The Salt Mines");
//        pairingBoard.setId(1L);
//
//        Mockito.when(pairingBoardRepository.findById(pairingBoard.getId())).thenReturn(Optional.of(pairingBoard));
//        Mockito.doNothing().when(pairingBoardRepository).delete(pairingBoard);
//
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//                .delete("/api/pairingboards/{pairingBoardId}", "1")
//                .accept(MediaType.APPLICATION_JSON)
//                .contentType(MediaType.APPLICATION_JSON);
//
//        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();
//
//        MockHttpServletResponse response = resultResponse.getResponse();
//
//        assertEquals(HttpStatus.OK.value(), response.getStatus());
//    }
}
