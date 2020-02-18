package com.franconnect.api.service;

import com.franconnect.api.model.User;
import com.franconnect.api.repository.HelloRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HelloServiceTest {

  @Mock
  private HelloRepository repository;

  @InjectMocks
  private HelloService service;



  @Test
  public void getUser_WhenRepoReturnNul_ShouldReturnNull() {
    when(repository.getUser()).thenReturn(null);
    assertThat(service.getUser(), nullValue());
  }

  @Test
  public void getUser_WhenRepoReturnUser_ShouldReturnSameUser() {
    User user = new User("test", "test@mail.com");
    when(repository.getUser()).thenReturn(user);

    assertThat(service.getUser(), is(user));
  }
}
