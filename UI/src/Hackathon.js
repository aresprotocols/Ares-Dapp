import React from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button, Grid, } from '@material-ui/core';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '0 auto',
    flexGrow: 1,
  },
  topItem: {
    height: 135,
    borderRadius: 8,
    color: '#fff',
    background: '#04bacb',
    boxShadow: 'rgb(0 186 203 / 40%) 0px 8px 15px 0px',
    border: '1px solid rgb(0, 172, 195)'
  },
  topItemOrange: {
    background: 'rgb(255, 164, 0)',
    boxShadow: 'rgb(247 181 0 / 50%) 0px 8px 15px 0px',
    border: '1px solid rgb(247, 181, 0)',
  },
  topItemGreen: {
    background: 'rgb(37, 161, 124)',
  },
  topBox: {
    height: 45,
    borderRadius: 8,
    fontSize: 18,
    lineHeight: '45px',
    textAlign: 'center',
    background: '#00acc3',
  },
  topBoxOrange: {
    background: '#ff8f00'
  },
  topBoxGreen: {
    background: 'rgb(47, 133, 90)'
  },
  valueBox: {
    height: 90,
    fontSize: 36,
    textAlign: 'center',
    lineHeight: '90px'
  },
  valueUnit: {
    fontSize: 18
  },
  nextBox: {
    height: 183,
    marginTop: 20,
    padding: 10,
    background: 'rgb(255, 255, 255)',
    boxShadow: 'rgb(171 180 208 / 50%) 0px 0px 10px 0px',
    borderRadius: 8
  },
  nextTitle: {
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 24,
    marginBottom: 17
  },
  nextInfo: {
    textAlign: 'center',
    borderRight: '1px solid rgb(225, 233, 255)',
  },
  nextRate: {
    fontSize: 25,
    lineHeight: '60px',
    fontWeight: 600,
  },
  nextUni: {
    fontSize: 16,
    fontWeight: 500,
  },
  lastTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 800,
    marginBottom: 13,
    paddingTop: 10,
  },
  lastTitle2: {
    padding: '0 20px',
    textAlign: 'center',
    fontSize: 12,
  },

}));
const myTheme = createTheme({
  palette: {
    primary: green,
  },
});

const Hackathon = () => {
  const classes = useStyles();

  const { api } = useSubstrate();

  console.log(api)

  // const accountPair =
  // accountAddress &&
  // keyringState === 'READY' &&
  // keyring.getPair(accountAddress);

  // api.query.aresModule.oracleResults(accountPair.address, data => {
  //   console.log(data)
  // }).then(unsub => {
  //   unsubscribe = unsub;
  // })
  //   .catch(console.error);



  return (
    <div className={classes.root}>
      {/* <iframe 
                style={{width:'100%', height:'600px', overflow:'visible'}}
                ref="iframe" 
                src="http://sdapps.aresprotocol.com" 
                width="100%" 
                height={this.state.iFrameHeight} 
                scrolling="auto" 
                frameBorder="0"
            /> */}
      <Grid container spacing={2} >
        <Grid item xs>
          <div className={classes.topItem}>
            <div className={classes.topBox}>Total Issuers</div>
            <div className={classes.valueBox}>4</div>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.topItem}>
            <div className={classes.topBox}>Total Collateral</div>
            <div className={classes.valueBox}>64.0<span className={classes.valueUnit}>DOT</span></div>
          </div>
        </Grid>
        <Grid item xs >
          <div className={classes.topItem}>
            <div className={classes.topBox}>Total Issuance</div>
            <div className={classes.valueBox}>12<span className={classes.valueUnit}>DAI</span></div>
          </div>
        </Grid>
        <Grid item xs>
          <div className={`${classes.topItem} ${classes.topItemOrange}`}>
            <div className={`${classes.topBox} ${classes.topBoxOrange}`}>Average Collateral Ratio</div>
            <div className={classes.valueBox}>25<span className={classes.valueUnit}>%</span></div>
          </div>
        </Grid>
        <Grid item xs>
          <div className={`${classes.topItem} ${classes.topItemGreen}`}>
            <div className={`${classes.topBox} ${classes.topBoxGreen}`}>My Balance</div>
            <div className={classes.valueBox}>0.0<span className={classes.valueUnit}>DAI</span></div>
          </div>
        </Grid>
      </Grid>


      <div className={classes.nextBox}>
        <Grid container spacing={2} >
          <Grid item xs>
            <div className={classes.nextTitle}>Min Collateral Ratio</div>
            <div className={classes.nextInfo}>
              <div className={classes.nextRate}>150%</div>
              <div className={classes.nextUni}>(MCR)</div>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classes.nextTitle}>Min Collateral Ratio</div>
            <div className={classes.nextInfo}>
              <div className={classes.nextRate}>150%</div>
              <div className={classes.nextUni}>(MCR)</div>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classes.nextTitle}>Min Collateral Ratio</div>
            <div className={classes.nextInfo}>
              <div className={classes.nextRate}>150%</div>
              <div className={classes.nextUni}>(MCR)</div>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classes.nextTitle}>Min Collateral Ratio</div>
            <div className={classes.nextInfo}>
              <div className={classes.nextRate}>150%</div>
              <div className={classes.nextUni}>(MCR)</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <h3 className={classes.lastTitle}>At current price and ratios, 100 DOT can issue 2333 DAI at max.</h3>
            <p className={classes.lastTitle2}>You can under take up to 27% price drop. Otherwise, you need to increase collateral, or you can be liquidated by anyone and lose 5%.</p>
            <div className={classes.nextInfo}>
              <ThemeProvider theme={myTheme}>
                <Button variant="contained" color="primary" style={{ color: '#fff' }} startIcon={<AddCircleOutlineOutlined />}>Issue DAI</Button>
              </ThemeProvider>
            </div>
          </Grid>
        </Grid>
      </div>

    </div>

  );
}

export default Hackathon;
