package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.PersonController;
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

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@WebMvcTest(value = PersonController.class)
public class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ProjectRepository projectRepository;

    @Test
    public void createPerson() throws Exception {

        List<PairingBoard> pairingBoardList = new ArrayList<>();
        List<Person> personList = new ArrayList<>();
        Project project = new Project("Minerva", "12345", pairingBoardList, personList);
        project.setId(1L);

        Mockito.when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        Mockito.when(projectRepository.save(project)).thenReturn(project);

        String expected = "{" +
                "\"id\": 1,\"name\": \"Minerva\"," +
                "\"pairingBoards\": []," +
                "\"people\": [{\"id\": 1,\"name\":\"Austin\"}]" +
                "}";

        String examplePersonJson ="{\"id\": 1, \"name\": \"Austin\"}";

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/project/1/person")
                .accept(MediaType.APPLICATION_JSON).content(examplePersonJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        JSONAssert.assertEquals(expected, resultResponse.getResponse().getContentAsString(), false);
//        assertEquals("/api/add/1", response.getHeader(HttpHeaders.LOCATION));
    }

//    @Test
//    public void deleteTeammate() throws Exception {
//        Person person = new Person("Austin");
//        person.setId(1L);
//
//        Mockito.when(personRepository.findById(person.getId())).thenReturn(Optional.of(person));
//        Mockito.doNothing().when(personRepository).delete(Mockito.any());
//
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//                .delete("/api/teammates/{teammateId}", "1")
//                .accept(MediaType.APPLICATION_JSON)
//                .contentType(MediaType.APPLICATION_JSON);
//
//            MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();
//
//            MockHttpServletResponse response = resultResponse.getResponse();
//
//            assertEquals(HttpStatus.OK.value(), response.getStatus());
//    }
}