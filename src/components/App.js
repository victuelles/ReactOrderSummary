import React, { Component } from 'react';
import { Segment,Grid, Input,Button,Container,Popup} from 'semantic-ui-react'
import './App.css';
import ItemList from './ItemList'
//TO DO:
// 1. create a json file to use as data for state
// 2. move item details to a new component for reuse
// 3. Implement redux to MATCH promo code
//    user should be able to enter a promo code “DISCOUNT” and on applying it, see a 10% discount reflect in the purchase summary. Use Redux for this
// 4. List item details can have multiple items


const items = [
  {
    id: '1',
    title: 'Essentials by OFM',
    description:
      'ESS-3085 Racing Style Leather Gaming Chair, Red',
    selling_price: '99.11',
    retail_price: '102.96',
    quantity:'1',
    photoURL: 'https://i5.walmartimages.com/asr/e73e1252-642c-4473-93ea-fd3b564a7027_1.3e81ea58fa3042452fe185129a4a865f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
  },
  {
    id: '2',
    title: 'Basics by Rom',
    description:
      'Big Joe Milano Bean Bag Chair, Multiple Colors - 32" x 28" x 25"',
    selling_price: '29.98',
    retail_price: '29.98',
    quantity:'1',
    photoURL: 'https://i5.walmartimages.com/asr/7a112091-197a-48d9-9e58-6503ee0041c2_1.ee22dbd743135855c15fa10d50f5ec7a.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
  }
];

class App extends Component {
  state = {
    items: items,
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
                <Grid.Column textAlign='left' >

                    <Popup
                        trigger={  <a> Pickup savings</a>}
                        content="Picking up your order in the store helps cut costs, and we pass the savings on to you."
                       
                        position='bottom left'
                      />

                
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

                <ItemList items={this.state.items}  />
              
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
