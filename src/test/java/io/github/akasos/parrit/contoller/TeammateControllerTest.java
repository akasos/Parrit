package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.TeammateController;
import io.github.akasos.parrit.dao.PersonRepository;
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

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@WebMvcTest(value = TeammateController.class)
public class TeammateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    PersonRepository personRepository;

    @Test
    public void getAllTeammates() throws Exception{
        Person person1 = new Person(1L,"Austin", null, null);
        List<Person> listOfTeammates = Arrays.asList(person1);

        Mockito.when(personRepository.findAll()).thenReturn(listOfTeammates);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/teammates")
                .accept(MediaType.APPLICATION_JSON);

    MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();
        String expected = "[{id: 1, name: Austin, pairing_board_fk: null}]";

       JSONAssert.assertEquals(expected, resultResponse.getResponse().getContentAsString(), false);
    }

    @Test
    public void addTeammate() throws Exception {
     Person person = new Person(1L,"Skyler", null, null);
     Mockito.when(personRepository.save(person)).thenReturn(person);

     String examplePersonJson ="{\"id\": 1, \"name\": \"Skyler\"}";
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/teammates")
                .accept(MediaType.APPLICATION_JSON).content(examplePersonJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());
//        assertEquals("/api/add/1", response.getHeader(HttpHeaders.LOCATION));
    }

    @Test
    public void deleteTeammate() throws Exception {
        Person person = new Person(1L, "Austin", null, null);
        Mockito.when(personRepository.findById(person.getId())).thenReturn(Optional.of(person));
        Mockito.doNothing().when(personRepository).deleteById(Mockito.any());

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/api/teammates/{teammateId}", "1")
                .accept(MediaType.APPLICATION_JSON);

            MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

            MockHttpServletResponse response = resultResponse.getResponse();

            assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}