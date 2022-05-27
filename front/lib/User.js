import  Send  from './Send';


export const follow = (userSeq, seller) => {
  let data = {
    "userSeq": userSeq,
    "seller": seller,
  }
  Send.post('/follow', data)
    .then((data) =>{
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

export const unfollow = (userSeq, seller) => {
  let data = {
    "userSeq": userSeq,
    "seller": seller,
  }
  Send.delete('/follow', data)
    .then((data) =>{
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
}