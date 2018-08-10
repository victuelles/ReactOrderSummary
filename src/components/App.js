import React, { Component } from 'react';
import { Segment,Grid, Image,Input,Label,Button,Container} from 'semantic-ui-react'
import './App.css';

class App extends Component {
  state = {
    showItemDetails: false,
    showPromoCode: false
  }
  showItemDetailsToggle = () => {
    this.setState(prevState => ({
      showItemDetails: !prevState.showItemDetails
    }))
  }
  showPromoCodeToggle = () => {
    this.setState(prevState => ({
      showPromoCode: !prevState.showPromoCode
    }))
  }
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Container className="main">
          <Segment >
            <Grid divided='vertically' >
              
              <Grid.Row columns={2}>
                <Grid.Column>
                  <p> Subtotal</p>
                </Grid.Column>
                <Grid.Column  textAlign='right'  >
                      <strong>$102.96</strong>
                </Grid.Column>
                <Grid.Column>
                  <a> Pickup savings</a>
                </Grid.Column>
                <Grid.Column  textAlign='right'  >
                    <div style={{color:'red'}}> <strong >-$3.85</strong></div>
                </Grid.Column>
                <Grid.Column>
                  <p> 
                    Estimated Taxes and Fees<br/>
                  (Based on 94587)</p>
                </Grid.Column>
                <Grid.Column  textAlign='right'  >
                      <strong>$8.92</strong>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
              <Grid.Column>
                  <div className="ui header"> 
                  Est. total</div>
                </Grid.Column>
                <Grid.Column  textAlign='right'  >
                <div className="ui header"> 
                  $108.03</div>
                </Grid.Column>
                <Grid.Column>
                    <a onClick={this.showItemDetailsToggle}> 
                    See item details <i className=" add icon" /></a> 
              </Grid.Column>
              </Grid.Row>


            <Grid.Row columns={1}>
              <Grid.Column>
                    <a onClick={this.showPromoCodeToggle}>
                    Apply promo code <i className=" add icon" /></a> 
              </Grid.Column>
              {this.state.showPromoCode &&
                  <Grid.Column>
                    <div className="ui sub header">Promo Code
                    </div>
                    <Input focus/>
                    <Button basic color='black'>Apply</Button>
                  </Grid.Column>
              }
     
              </Grid.Row>


            </Grid>
          </Segment>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
