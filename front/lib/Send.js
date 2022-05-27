import  axios  from  'axios'

const  instance = axios.create({
	baseURL:  "https://j6a305.p.ssafy.io/api",
		headers:{
			"Content-Type":  "application/json",
	}
})

instance.interceptors.request.use(
	function (config){
		//code 200 일때
		return  config;
	},
	function (error){
		//code error
		return  Promise.reject(error);
	}
)

export  default  instance;