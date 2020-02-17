package io.github.akasos.parrit.exceptions;


public class ProjectNameAlreadyExistsException extends RuntimeException {
    public ProjectNameAlreadyExistsException(String message){
        super(message);
    }
}
