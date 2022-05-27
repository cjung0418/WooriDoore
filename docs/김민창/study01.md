> 처음 세팅을 하고나면 신경쓰지 않아도 되는 부분이기 때문에 익숙하지 않았다
이번에 세팅 A부터 Z까지 알아본다

### start.spring.io
* 스프링 부트 프로젝트를 자동으로 만들어주는 [start.spring.io](https://start.spring.io/)에 들어가서 프로젝트를 다운받는다

* `maven`과 `gradle`, 사용언어 및 버전, 이름 등을 입력한다

![](https://images.velog.io/images/pang_e/post/af066e82-e85d-413a-ba0f-c66c5397e52a/image.png)

* 사용할 `Dependencies`들을 아래 `ADD...` 를 선택하여 추가한다
(여기서 추가 안하더라도 프로젝트 만들면서 추가할 수 있음)


* `Generate`를 눌러 다운로드를 받는다

* `zip`파일이 설치되는데 압축을 풀어 사용하는 IDE에서 연다.

---

### mybatis 연동
* `Dependencies`는 다음과 같다

    - `Spring Web`
    - `Mybatis Framework`
    - `MySQL Driver`
    - `Spring Data JDBC`

* `application.properties`를 설정한다
```
# 사용할 포트 번호
server.port=9999

# 연결할 데이터베이스 서버 및 스키마
spring.datasource.url=jdbc:mysql://(서버주소)/(스키마 명)?serverTimezone=UTC&characterEncoding=UTF-8

# 해당 데이터베이스 계정
spring.datasource.username=pang

# 해당 데이터베이스 비밀번호
spring.datasource.password=1234

#mapper.xml 파일 경로
mybatis.mapper-locations=classpath:mappers/**/*.xml

```

* resource 하위에 `mappers` 폴더를 만들어 주고 `xml`파일을 만든다


* `xml`파일의 작성 규칙은 다음과 같다

* `SQL Mapper` 파일은 `XML`이기 때문에 가장 먼저 `XML`선언을 한다

```
<?xml version="1.0" encoding="UTF-8" ?>
```
* 태그 규칙을 정의한 `DTD`선언을 한다
```
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
```

* `SQL Mapper`파일은 루트 엘리먼트 `<mapper>`의 작성으로 시작하며
`namespace`는 연결되는 `Mapper`경로를 지정해준다
```
<mapper namespace="com.pang.practice.Mapper">

</mapper>
```

* `<mapper>`에는 `mybatis` 문법을 사용하고, 전체 코드는 다음과 같다
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.pang.practice.Mapper">
    <select id="test" resultType="String">
        select email
        from user
        where uid=#{uid}
    </select>

</mapper>
```

---

### 테스트
* 테스트를 위해 간단하게 `Controller`, `Service`, `Mapper`를 만들어 보았다

---

* `UserController.java`
```
package com.pang.practice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/hi")
    public void test(String uid){
        System.out.println(userService.test(uid));
    }
}

```

---

* `UserServiceImpl.java`
```
package com.pang.practice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public String test(String uid) {
        return userMapper.test(uid);
    }
}

```

---

* `UserMapper.java`
```
package com.pang.practice;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String test(String uid);
}

```
---


* 데이터베이스
![](https://images.velog.io/images/pang_e/post/dcd14235-9dbd-42f5-b4e9-d4b7499f7fca/image.png)



* 요청하기
![](https://images.velog.io/images/pang_e/post/067f9b23-57df-4511-af33-919c3ddcaef9/image.png)



* 콘솔창 결과 확인
![](https://images.velog.io/images/pang_e/post/9ba8fdf3-95cb-4618-a6f8-bb0ecbd2291f/image.png)

---
굿
