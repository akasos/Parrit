package io.github.akasos.parrit.DTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;

public class NewProjectDTO {

    @NotNull(message = "Uh oh. Your project name must be between 1 and 32 characters.")
    @Size(min = 1, max = 32, message = "Uh oh. Your project name must be between 1 and 32 characters.")
    private String name;

    @NotNull(message = "Keeaa!? Protect yourself with a password!")
    @Size(min = 1, message = "Keeaa!? Protect yourself with a password!")
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NewProjectDTO that = (NewProjectDTO) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(password, that.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, password);
    }
}
