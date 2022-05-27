> `Spring Boot`와 `JPA`인프라 세팅의 A 부터 Z 까지

### start.spring.io
* 스프링 부트 프로젝트를 자동으로 만들어주는 [start.spring.io](https://start.spring.io/)에 들어가서 프로젝트를 다운받는다

* `maven`과 `gradle`, 사용언어 및 버전, 이름 등을 입력한다

![](https://images.velog.io/images/pang_e/post/af066e82-e85d-413a-ba0f-c66c5397e52a/image.png)

* 사용할 `Dependencies`들을 아래 `ADD...` 를 선택하여 추가한다
(여기서 추가 안하더라도 프로젝트 만들면서 추가할 수 있음)


* `Generate`를 눌러 다운로드를 받는다

* `zip`파일이 설치되는데 압축을 풀어 사용하는 `IDE`에서 연다.

---



### jpa 연동
* `Dependencies`는 다음과 같다

    - `Spring Web`
    - `Spring Data JPA`
    - `Lombok`
    

* `application.properties`를 설정한다
```
# 사용할 포트 번호
server.port=9999

# 콘솔에 JPA 실행 쿼리 출력 여부
spring.jpa.show-sql=true

# Entity 어노테이션이 명시된 클래스를 찾아서 ddl를 생성후 실행할것인지 여부
spring.jpa.generate-ddl=true

# 어떤 데이터베이스를 사용하는지
spring.jpa.database=mysql

# 연결할 데이터베이스 서버 및 스키마
spring.datasource.url=jdbc:mysql://(서버주소)/(스키마 명)?serverTimezone=UTC&characterEncoding=UTF-8

# 해당 데이터베이스 계정
spring.datasource.username=pang

# 해당 데이터베이스 비밀번호
spring.datasource.password=1234

# JPA 데이터베이스 플랫폼 지정 (현재 MYSQL InnoDB를 사용중)
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect



```

---




### jpa 데이터 입력

* `JPA`는 내가 `SQL`을 내가 짜지않고 자동으로 맵핑하여 만들어주기 때문에 맵핑할 간단한 데이터를 추가한다

* `entity` 패키지를 만들어 `People`를 만들어준다

```
// People.java

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data		// @Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode를 한번에 만듬
@Entity		// 데이터베이스의 테이블과 일대일 매칭되는 객체
public class People {
    @Id		// PK 설정
    @GeneratedValue		// auto increment와 같은 기능
    private int id;
    private String name;
}

```

---

* `DAO` 패키지도 만들어 `People` 인터페이스를 만들어준다

* `CrudRepository`를 상속받아 기본적인 CRUD 관련 기능을 사용할 수 있도록 한다
```
// PeopleRepository.java

import com.pang.test.entity.People;
import org.springframework.data.repository.CrudRepository;

public interface PeopleRepository extends CrudRepository<People, Integer> {
}

```

---

* `PeopleController`를 만들어 `API`를 받게 한다

```
// PeopleController.java

import com.pang.test.dao.PeopleRepository;
import com.pang.test.entity.People;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PeopleController {
    private PeopleRepository repository;

    public PeopleController(PeopleRepository repository){
        super();
        this.repository = repository;
    }

    @PostMapping("/people")
    public People addPeople(People people) { return (repository.save(people));}
}


```


---

### 테스트전 만난 에러
```
Failed to load driver class com.mysql.cj.jdbc.Driver
```
* 위와 같은 에러를 만나서 한참을 고생했다

* 에러 해석부터 하자면`mysql-connector-java` `dependency`가 없어서 발생하는 에러

* 확인하는 방법1
    - `pom.xml`파일에 해당 `dependency`가 존재하는지 확인 
 
* 확인하는 방법2
    - `pom.xml` 우클릭
    - `maven` - `Effective POM 표시`에 해당 `dependency`가 존재하는지 확인
    

* 하지만 나는 확인했을때 **분명히** 들어가있는데 발생했다

* 해결하지못하고 다음날 확인하니깐 정상작동한다... 처음부터 다시 진행해봐도 같은 부분에서 에러가 발생하는데 `IDE`를 껐다가 천천히 하니깐 정상작동한다

* **[여기](https://velog.io/@pang_e/%EC%8B%A4%ED%96%89%EC%9D%B4-%EC%95%88%EB%90%A0%EB%95%8C-%ED%98%B9%EC%8B%9C)**를 다시한번보고 마음을 추스렸다

---

### 테스트

* 테스트를 진행해보았다

* 서버를 실행시키자 마자 `mysql`에 테이블이 생성되었다
![](https://images.velog.io/images/pang_e/post/a51f7e01-8a5c-4aff-a8fe-e4001c65b61e/image.png)

* `POSTMAN`으로 미리 만들어둔 `API`를 호출해보았다
![](https://images.velog.io/images/pang_e/post/1923ae97-7a11-46eb-836c-cdd53a5674fd/image.png)

* 아까 테스트한번 해본다고 `auto increment`해놓은 `id`가 2가 되어있다
![](https://images.velog.io/images/pang_e/post/e91a15bb-ac41-452b-b6ad-5165d0b29aa3/image.png)

* 몇가지 추가를 더해보고 `mysql`에서도 제대로 값이 나오는걸 확인했다
![](https://images.velog.io/images/pang_e/post/bfa4df7c-66c1-4791-b1ae-5f946ef160da/image.png)

* `IDE`에서 콘솔로 어떤 `SQL`이 실행되었는지 알수있다
![](https://images.velog.io/images/pang_e/post/fc055a02-f2d2-4aa6-9cab-e51f53c61c61/image.png)
---
굿
