package io.github.akasos.parrit.contoller;

import io.github.akasos.parrit.controller.PersonController;
import io.github.akasos.parrit.dao.PersonRepository;
import io.github.akasos.parrit.model.Person;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PersonControllerTest {

    @InjectMocks
    PersonController personController;

    @Mock
    PersonRepository personRepository;

    @Test
    public void getAllPeople(){
        Person person1 = new Person("Austin");
        Person person2 = new Person("Skyler");
        Person person3 = new Person("Zach");
        List<Person> listOfPeople = Arrays.asList(person1, person2, person3);

        when(personRepository.findAll()).thenReturn(listOfPeople);

        List<Person> results = personController.getAllPeople();

        assertThat(results.size()).isEqualTo(3);
        assertThat(results.get(0).getName()).isEqualTo("Austin");
        assertThat(results.get(1).getName()).isEqualTo("Skyler");
        assertThat(results.get(2).getName()).isEqualTo("Zach");

    }


}
