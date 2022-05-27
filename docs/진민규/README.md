# Woori Doore





- 펀딩 구매 페이지

![buy](README.assets/buy.jpg)

### 자기 소개

블록체인 파트와 프론트 일부를 맡은 진민규라고 합니다. 주로 스마트컨트랙트 배포, 프론트엔드와 블록체인과의 연동을 맡았습니다.



## 블록체인 코드 소개



들어가기에 앞서, 간단히 생각해보자면... ‘블록’체인이니 어딘가엔 블록이 있을 것입니다. 결국 그 블록은 노드(각지의 서버...?라고 생각하시면 될 듯합니다)에서 조회를 해야 하는데 우리는 (당연하게도)노드를 유지하고 있진 않습니다. 따라서 다른 노드에게서 이것을 조회해야 하는데 그런 조회를 시켜주는 걸 보통 provider라고 부른답니다. 저희가 쓰게 된 `ethers` 라는 라이브러리에서는 다양한 provider를 지원하는데, 저는 여기서 우리가 계약을 작성할 떄는 metamask, 단순 조회만 할 때는 Alchemy를 사용하였습니다. metamask가 없어도 펀딩 정보 정도는 볼 수 있어야 할 테니까요. 



### 단순 조회용 contract 생성

 event로 로그를 찍어서 조회하는 방법도 있지만 저희는 view function을 이용했습니다. view function은 그냥 단순 조회용 함수로서, 굳이 사용자가 가스비(일종의 수수료)를 부담하지 않고도 해당 계약의 내용을 쉽게 조회할 수 있게 해줍니다.

```tsx
const provider = new ethers.providers.AlchemyProvider("maticmum", 
[Alcemy API Key])
```

provider 객체를 생성하는 코드는 이렇습니다. Alchemy를 사용하되 “maticmum”, 즉 뭄바이 테스트넷을 이용한다는 뜻이고 두 번째 인자는 API 키입니다.



그렇게 생성한 provider 객체로부터 우리는 조회용 contract 객체를 생성할 수 있습니다. 해당 객체는 `lib` 폴더에 `contractGetter.js` 파일로 모듈화 해놨습니다. 구체적인 구조는 이렇습니다.

```jsx
// lib/contractGetter.js

import { ethers } from 'ethers'
import ABI from './ABI.json'

const provider = new ethers.providers.AlchemyProvider("maticmum", "uuZ1M18wKF7wrp9SSrHJ2IpznLixKBRb")

const contractGetter = (address) => {
  return new ethers.Contract(address, ABI, provider)
}

export default contractGetter
```

여기서 ABI는 일종의 인터페이스라고 보시면 됩니다. 사용할 인터페이스가 정리된 JSON 파일인데, 그 단어만큼이나 API와 유사한 역할을 합니다. 마찬가지로 별도 파일로 분리해서 import 하여 사용합니다.



### 정보 getter 코드

그러한 contract 객체로부터 여러 정보를 얻을 수 있습니다. 구체적으로 웹 로딩시에

```jsx
  useEffect(async () => {
    const contract = await contractGetter(fundInfo.fundingContract)
    const _overall = await contract.getOverall() // 전체 모금액 조회
    const _target = await contract.getTargetAmount() // 목표 모금액 조회
    const endDate = await contract.endDate() // 펀딩 마감 시간 조회
  }, [])
```

이러한 정보를 얻어올 수 있게 되는 것이지요. 저기서 `getOverall()`과 같은 함수는 제가 컨트랙트에 정의한 것이기 때문에 get이 붙었고, 마지막의 `endDate()`는 제가 변수만 정의했지만 자동으로 만들어진 조회용 함수입니다.



### 함수 호출용 코드(for 펀딩 모금)

모금과 같은 서명이 필요한(가스비가 드는) 함수 호출에는 signer가 필요합니다.

```jsx
import { ethers, ContractFactory } from "ethers";

async () => {
	const factory = new ContractFactory(ABI, Bytecode, signer)    
    await contract.fund([1, 0, 0], {value: ethers.utils.parseEther("0.01")})
}
```

다음과 같이 진행이 됩니다. 여기서 fund 함수의 첫 번째 인자로 [1, 0, 0]이 들어가는 것은 해당 옵션을 몇 개 사는지를 인자를  넘겨야 하기 때문입니다. 두 번째 인자로 value, 즉 지불할 가격을 객체 형태로 넘겨줍니다.



### 컨트랙트 배포용 코드

```jsx
async () => {
    const factory = new ContractFactory(ABI, Bytecode, signer)
    try {
      const contract = await factory.deploy(111, 1649126845, 10000, [10000, 570000, 610000]); // 첫 번째 인자: 펀딩 시작 시간 두 번째: 모금 마감 시간, 세 번째: 목표 모금액, 네 번째: 옵션 가격 배열
      const fullMessage = await contract.deployTransaction.wait()
    } catch (error) {
      return
    }
}
```

컨트랙트가 성공적으로 배포되면 fullMessage에 트랜잭션 번호 등 성공한 결과가 나옵니다.



## 막힌 부분 & 힘들었던 점

네트워크 구성이 가장 힘들었습니다. 이더리움 메인넷을 쓰자니 너무 느리고 비쌌으며, 테스트넷을 쓰자니 테스트 이더를 얻기도 힘들고 마찬가지로 느렸습니다. 따라서 처음에는 프라이빗 네트워크를 구성하려 하였습니다. 그러던 중 운 좋게 전문가 면담 과정에서 폴리곤 테스트넷을 써보라는 제안을 받았고, 속도도 괜찮고 테스트 코인도 많이 주는 관계로 폴리곤 뭄바이 테스트넷 사용을 채택하였습니다.

