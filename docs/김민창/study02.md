> 클라이언트는 스네이크 표기법인데 서버는 카멜케이스다...

### 언제 쓰는걸까

* 예시가 편할것같다. `request`로 들어오는 `json`과 내가 정의한 `entity` 그리고 컨트롤러는 다음과 같다.


```
# json

{
  "user_id": "pang",
  "user_age": 20
}




# entity
public class User {

  private String userId;
  private int userAge;
}




# controller
@RestController
public class UserController {
  
  @PostMapping
  public void getUser(User user) {
    System.out.println("yes!!");
  }
}

```

* `getUser` 파라미터는 `json`데이터는 스네이크 표기법으로 넘어오지만 `entity`는 카멜 케이스로 선언되어 있다

* 이러한 경우 `Key`가 맞지않아 제대로 값이 맵핑되지 않는다

---
### 어떻게 사용할까

* `JsonProperty` 어노테이션을 `entity`에 사용하며 해결할 수 있다

```
# entity
public class User {

  @JsonProperty("user_id")
  private String userId;
  
  @JsonProperty("user_age")
  private int userAge;
}

```
* `JsonProperty` 어노테이션을 붙인다면 `user_id`라고 정의된 값을 나는 `userId`라고 정의하여 사용하겠다 라는 뜻이 된다

---

### 추가로

* `entity`에 `JsonProperty` 어노테이션을 붙여주는것으로 해결할 수 있지만, `field`값이 많아진다면 번거롭다는 단점이 있다

* 이러한 경우, `JsonNaming`를 사용하여 일괄적으로 변경할 수 있다

* `entity`의 `class`에 `JsonNaming` 어노테이션을 붙여주면 사용할 수 있는데, 상단 `entity`는 다음과 같이 변경하여 사용할 수 있다

```
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class User {
  
  private String userId;
  private int userAge;
}
```

* `filed`가 두개밖에 없지만 값이 많아진다면 훨씬 편리할 것 같다
