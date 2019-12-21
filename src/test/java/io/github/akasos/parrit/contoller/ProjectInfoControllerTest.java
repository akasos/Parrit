package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.ProjectInfoController;
import io.github.akasos.parrit.dao.PairingBoardRepository;
import io.github.akasos.parrit.dao.PersonRepository;
import io.github.akasos.parrit.model.PairingBoard;
import io.github.akasos.parrit.model.Person;
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

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@WebMvcTest(ProjectInfoController.class)
public class ProjectInfoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    PairingBoardRepository pairingBoardRepository;

    @MockBean
    PersonRepository personRepository;

    @Test
    public void getProjectInfo() throws Exception {
        PairingBoard pairingBoard = new PairingBoard(1L, "The Salt Mines");
        Person person = new Person(1L, "Austin", null, 1L);
        pairingBoard.addTeammate(person);
        List<PairingBoard> listOfPairingBoards = Arrays.asList(pairingBoard);
        List<Person> listOfTeammates = Arrays.asList(person);

        String expected = "{\"pairingBoardList\":[{\"id\":1,\"title\":\"The Salt Mines\",\"teammates\":[{\"id\": 1,\"name\":\"Austin\",\"pairing_board_fk\":1}]}],\"teammateList\":[{\"id\":1,\"name\":\"Austin\",\"pairing_board_fk\":1}]}";

        Mockito.when(pairingBoardRepository.findAll()).thenReturn(listOfPairingBoards);
        Mockito.when(personRepository.findAll()).thenReturn(listOfTeammates);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/api/projectinfo")
                .accept(MediaType.APPLICATION_JSON);

        MvcResult resultResponse = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = resultResponse.getResponse();

        //System.out.println(response.getContentAsString());

        JSONAssert.assertEquals(expected, response.getContentAsString(), false);



    }

}
