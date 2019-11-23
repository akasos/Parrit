package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.PersonController;
import io.github.akasos.parrit.dao.PersonRepository;
import io.github.akasos.parrit.model.Person;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
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

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@WebMvcTest(value = PersonController.class)
public class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    PersonRepository personRepository;

    @Test
    public void getAllPeople() throws Exception{
        Person person1 = new Person(1L,"Austin");
        List<Person> listOfPeople = Arrays.asList(person1);

        Mockito.when(personRepository.findAll()).thenReturn(listOfPeople);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/people")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();
        String expected = "[{id: 1, name: Austin}]";

        JSONAssert.assertEquals(expected, resultResponse.getResponse().getContentAsString(), false);
    }

    @Test
    public void addPerson() throws Exception {
     Person person = new Person(1L,"Skyler");
     Mockito.when(personRepository.save(Mockito.any())).thenReturn(person);

     String examplePersonJson ="{\"id\": 1, \"name\": \"Skyler\"}";
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/api/add")
                .accept(MediaType.APPLICATION_JSON).content(examplePersonJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        System.out.println(response);

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        assertEquals("/api/add/1", response.getHeader(HttpHeaders.LOCATION));
    }
}