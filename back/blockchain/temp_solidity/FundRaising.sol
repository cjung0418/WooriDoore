// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract FundRaising {
    uint public startDate; // 펀딩 시작 시점
    uint public endDate; // 펀딩 완료 시점
    address payable public beneficiary; // 모금자
    uint[] public optionPrices; // 옵션 가격들 모음
    uint public overall; // 현재까지 모금액 모음
    uint[] public overallList; // 현재까지 해당 옵션을 얼마나 구매했는지
    uint public targetAmount; // 모금 목표액
    
    mapping(address => uint256) public funderToAmount; // 각 사람들이 얼마나 펀딩했는지 저장
    mapping(address => uint256[]) public funderToList; // 각 사람들이 각 옵션을 얼마나 펀딩했는지 저장
    address[] public funders; // 펀딩한 사람들의 목록

    
    constructor (uint _startDate, uint _endDate, uint _targetAmount, uint[] memory _optionPrices) {
        // _endDate: 만기, _beneficiary: 펀딩 모금자, _targetAmount: 목표 모금액, _optionPrices: 옵션 가격 배열
        startDate = _startDate;
        endDate = _endDate;
        beneficiary = payable(msg.sender);
        optionPrices = _optionPrices;
        for (uint i = 0; i < _optionPrices.length; i++) {
            overallList.push(0);
        }

        targetAmount = _targetAmount;
    }
    
    function fund(uint[] memory _howMany) public payable 
    onlyAfterFundOpens
    onlyBeforeFundCloses{
        // uint _option_number: 옵션 숫자, uint _amout: 개수
        uint amount;
        for (uint i = 0; i < _howMany.length; i++) {
            amount += _howMany[i] * optionPrices[i];
            overallList[i] += _howMany[i];
        }

        require(msg.value >= amount, "NOT ENOUGH PAYMENT");

        overall += msg.value;
        if (funderToAmount[msg.sender] == 0) {
            funderToList[msg.sender] = _howMany;
            funders.push(msg.sender); // 펀딩한 사람을 목록에 추가

        } else {
            for (uint i = 0; i < _howMany.length; i++) {
            funderToList[msg.sender][i] += _howMany[i];
        }
        }
        funderToAmount[msg.sender] += amount;
    }

    function getFunderToList(address _funder) public view returns (uint[] memory) {
        return funderToList[_funder];
    } // 해당 모금자가 어떤 옵션을 얼마나 구매했는지 알려주는 리스트 반환

    function getOverall() public view returns(uint256) {
        return overall;      
    } // 현재까지 모금액 알려줌

    function getTargetAmount() public view returns(uint256) {
        return targetAmount;      
    } // 목표 모금액 알려줌

    function getBalance() public view returns(uint256) {
        return address(this).balance;      
    } // 목표 모금액 알려줌

    function getOverallList() public view returns(uint[] memory) {
        return overallList;      
    } // 현재까지 어떤 옵션이 얼마나 팔렸는지 알려줌

    
    modifier onlyBeneficiary() {
        require(msg.sender == beneficiary, "NOT BENEFICIARY ADDRESS");
        _;
    } // 모금자가 아니면 정산을 못 받게

    modifier onlyAfterFundOpens {
        require(block.timestamp > startDate, "FUND NOT OPEN YET");
        _;
    } // 펀딩 시작 이후에만 펀딩 받을 수 있도록

    modifier onlyBeforeFundCloses {
        require(block.timestamp < endDate, "FUND ALREADY ClOSED");
        _;
    } // 펀딩 마감 이전에만 펀딩 받을 수 있도록

    modifier onlyAfterFundCloses {
        require(block.timestamp > endDate, "FUND NOT CLOSE YET");
        _;
    } // 펀딩 기간이 끝나야 정산을 받을 수 있도록

    modifier onlyLargerThanTarget {
        require(overall > targetAmount, "FUND FAILED");
        _;
    } // 목표금액보다 모금액이 더 많아야 펀딩 성공

    modifier onlyPlatform {
    require(msg.sender == 0x064cff27ae4399A5D0DEb05F1fdf69A3b71F6978, "NOT ALLOWED");
    _;
    } // 플랫폼만 접근 가능하도록


    function withdraw(address _funder) public
    onlyPlatform
    onlyAfterFundCloses
    onlyLargerThanTarget {
      require(funderToAmount[_funder] > 0, "ALREADY WITHDRAWN");
    //   require(block.timestamp > endDate);
    // beneficiary.transfer(address(this).balance);
    if (address(this).balance >= funderToAmount[_funder]) {
        beneficiary.transfer(funderToAmount[_funder]);
    } else {
        beneficiary.transfer(address(this).balance);
    }
    funderToAmount[_funder] = 0;
    }


    function terminate() public 
    onlyAfterFundCloses {
        require(overall < targetAmount, "CANNOT TERMINATE");
        for (uint i = 0; i < funders.length; i++) {
            payable(funders[i]).transfer(funderToAmount[funders[i]]);
            funderToAmount[funders[i]] = 0;
        }
    }
}