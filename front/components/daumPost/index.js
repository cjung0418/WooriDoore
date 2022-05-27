import DaumPostCode from 'react-daum-postcode';
import { motion } from 'framer-motion';

const DaumPost = ({handleClose, setAddress}) => {

    const popUp = {
        initial: {
          y: "-30vh",
          opacity: 0,
        },
        visible: {
          y: "0",
          opacity: 1,
          transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
          }
        },
        exit: {
          y: "-30vh",
          opacity: 0,
          transition: {
            duration: 0.2,
          }
        }
      }

    // https://keeper.tistory.com/23 참고
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setAddress(fullAddress);
        handleClose();
    }

    return (
    <motion.div
        onClick={(e) => e.stopPropagation()}  // 부모 컴포넌트로 이벤트 전달을 막아줌 : 모달컴포넌트는 클릭해도 화며에 유지해줌
        variants={popUp}
        initial="initial"
        animate="visible"
        exit="exit"
        className="modal"
        >
        <DaumPostCode onComplete={handleComplete} className="post-code" />
    </motion.div>
    )
}

export default DaumPost;


