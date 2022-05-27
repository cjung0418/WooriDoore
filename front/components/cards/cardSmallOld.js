import style from "./card.module.css"
import Grid from '@mui/material/Grid'

export default function CardSmall(props) {

  return (
    <Grid container className={props.style}>
      <Grid item>
        <b style={{ fontSize: "20px", padding: "0 10px"}}>1</b>
      </Grid>
      <Grid item xs={3}>
        <img src="/donlee.jpg" alt="" style={{height: "50px"}}/>
      </Grid>
      <Grid item style={{padding: "0 10px"}}>
        <div style={{fontWeight: "600"}}>{props.info.fundingTitle}</div>
        <div className={style.flexJustifyBetween}>
          <span>90%</span>
          <span>~2022.4.8</span>
        </div>
      </Grid>
    </Grid>
  )
}