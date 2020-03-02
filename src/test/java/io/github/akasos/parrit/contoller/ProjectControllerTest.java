package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.ProjectController;
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
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@WebMvcTest(ProjectController.class)
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ProjectRepository projectRepository;

    @Test
    public void getProject() throws Exception {

        PairingBoard pairingBoard = new PairingBoard("Area51");
        pairingBoard.setId(1L);
        Person person = new Person("Austin");
        person.setId(1L);
        person.setPairingBoard(pairingBoard);

        List<PairingBoard> pairingBoardList = Collections.singletonList(pairingBoard);
        List<Person> personList = Collections.singletonList(person);

        Project project = new Project("Minerva", "12345", pairingBoardList, personList);
        project.setId(1L);

        String expected = "{" +
                "\"id\": 1,\"name\": \"Minerva\"," +
                "\"pairingBoards\": [{\"id\":1,\"name\":\"Area51\",\"personList\":[]}]," +
                "\"people\": [{\"id\": 1,\"name\":\"Austin\"}]" +
                "}";

        Mockito.when(projectRepository.findByName("Minerva")).thenReturn(Optional.of(project));


        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/project/Minerva")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        JSONAssert.assertEquals(expected, response.getContentAsString(), false);

    }

    //TODO: Write this Test
//    @Test
//    public void reset() throws Exception {
//        PairingBoard pairingBoard = new PairingBoard("The Salt Mines");
//        pairingBoard.setId(1L);
//
//        Person person1 = new Person("Austin");
//        person1.setId(1L);
//        person1.setPairingBoard(pairingBoard);
//
//        Person person2 = new Person("Skyler");
//        person2.setId(2L);
//        person2.setPairingBoard(pairingBoard);
//
//        pairingBoard.addTeammate(person1);
//        pairingBoard.addTeammate(person2);
//
//        List<PairingBoard> listOfPairingBoards = Collections.singletonList(pairingBoard);
//        List<Person> listOfTeammates = Arrays.asList(person1, person2);
//
//        String expected = "{" +
//                "\"pairingBoardList\":" +
//                "[" +
//                "{\"id\":1,\"title\":\"The Salt Mines\",\"teammates\":[]}" +
//                "]," +
//                "\"teammateList\":" +
//                "[" +
//                "{\"id\":1,\"name\":\"Austin\",\"pairingBoard\":null}," +
//                "{\"id\":2,\"name\":\"Skyler\",\"pairingBoard\":null}" +
//                "]" +
//                "}";
//
//        Mockito.when(pairingBoardRepository.findAll()).thenReturn(listOfPairingBoards);
//        Mockito.when(personRepository.findAll()).thenReturn(listOfTeammates);
//
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//                .put("/api/projectinfo/reset")
//                .accept(MediaType.APPLICATION_JSON)
//                .contentType(MediaType.APPLICATION_JSON);
//
//
//        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();
//
//        MockHttpServletResponse response = resultResponse.getResponse();
//
//        JSONAssert.assertEquals(expected, response.getContentAsString(), false);
//
//
//    }

}
