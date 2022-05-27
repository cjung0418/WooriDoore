import { motion } from "framer-motion";
import AnnounceModal from "../announceModal";
import QnaModal from "../qnaModal";
import DaumPost from "../../daumPost";

const Backdrop = ({fundingSeq, addQna, addAnnouncement, label, handleClose, setAddress}) => {
 
  return (
    <motion.div
      onClick={handleClose}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {label === "qna" && <QnaModal addQna={addQna} fundingSeq={fundingSeq} handleClose={handleClose} />}
      {label === "announcement" && <AnnounceModal addAnnouncement={addAnnouncement} fundingSeq={fundingSeq} handleClose={handleClose} />}
      {label === "post" && <DaumPost handleClose={handleClose} setAddress={setAddress} />}
    </motion.div>
  );
};

export default Backdrop;