import style from "./card.module.css"
import Grid from '@mui/material/Grid'

export default function CardFav(props) {

  return (
    <Grid item xs={4} className={props.style}>
      <div style={{marginBottom: "3%"}}>
        <img src="/donlee.jpg" alt="" />
      </div>
      <h2 style={{fontWeight: "600"}}>{props.info.fundingTitle}</h2>
      <div className={style.flexJustifyBetween}>
        <span>78%</span>
        <span>~2022.4.8</span>
      </div>
    </Grid>
  )
}