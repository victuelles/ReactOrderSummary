import React, { Component } from 'react';
import { Segment,Grid, Image,Input,Label,Button,Container,Item} from 'semantic-ui-react'
import './App.css';

class App extends Component {
  state = {
    showItemDetails: false,
    showPromoCode: false,
    itemPhotoURL:'https://i5.walmartimages.com/asr/e73e1252-642c-4473-93ea-fd3b564a7027_1.3e81ea58fa3042452fe185129a4a865f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
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
    const itemDetailsSign=!this.state.showItemDetails?'icon add':'icon minus'
    const promoCodeSign=!this.state.showPromoCode?'icon add':'icon minus'
    console.log(itemDetailsSign);
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
                    Est. Taxes and Fees<br/>
                  (Based on 94587)</p>
                </Grid.Column>
                <Grid.Column  textAlign='right'  >
                      <strong>$8.92</strong>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2} >
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
                      See item details <i className={itemDetailsSign} /></a> 
                </Grid.Column>
                <Grid.Column>
                   
                </Grid.Column>
                </Grid.Row>

           {this.state.showItemDetails &&
              <Grid.Row  >
                <Grid.Column width={4}>
                  <Item>
                    <Item.Image size="tiny"  src={this.state.itemPhotoURL} />
                  </Item>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Item>
                    <Item.Content>
                      <Item.Header >Essentials by OFM</Item.Header>
                      <Item.Description>
                      ESS-3085 Racing Style Leather Gaming Chair, Red
                      </Item.Description>
                      $99.11 Qty:1

                    </Item.Content>
                  </Item>
                </Grid.Column>
              </Grid.Row>
           }

            <Grid.Row columns={1}>
              <Grid.Column>
                    <a onClick={this.showPromoCodeToggle}>
                    Apply promo code <i className={promoCodeSign} /></a> 
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
