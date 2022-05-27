import style from "./card.module.css"
import Grid from '@mui/material/Grid'

export default function Card(props) {
  // console.log(props)
  return (
    <Grid item xs={3} className={props.style}>
      <img src={"/donlee.jpg"} alt="" />
      <h2>{props.info.fundingTitle}</h2>
      <div className={style.flexJustifyBetween}>
        <span>78%</span>
        <span>~2022.4.8</span>
      </div>
    </Grid>
  )
}