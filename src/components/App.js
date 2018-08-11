import React, { Component } from 'react';
import { Segment,Grid,Button,Container,Popup,Form} from 'semantic-ui-react'
import './App.css';
import ItemList from './ItemList'
//TO DO:
// 1. Implement redux to MATCH promo code
//    user should be able to enter a promo code “DISCOUNT” and on applying it, see a 10% discount reflect in the purchase summary. Use Redux for this



const data = {
  subtotal:102.96,
  pickup_savings:-3.85,
  taxes:8.92,
  zipcode:94587,
  items:[
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
  }]
};

class App extends Component {
  state = {

    items: data.items,
    subtotal:data.subtotal,
    pickup_savings:data.pickup_savings,
    taxes:data.taxes,
    discount:0,
    estimated_total:data.subtotal+data.pickup_savings+data.taxes,
    zipcode:data.zipcode,
    showItemDetails: false,
    showPromoCode: false,
    promo_code:'',
    promo_code_accepted: false,
    
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

  onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log("onFormSubmit")

    // check for discount
    if(this.state.promo_code==="DISCOUNT"){

      const discount=this.state.estimated_total*0.1
      const estimated_total=+((data.subtotal+data.pickup_savings+data.taxes-discount).toFixed(2))
      this.setState({
        estimated_total:estimated_total,
        discount:discount,
        promo_code_accepted:true,
        showPromoCode: false
      })

    }else{
      this.setState({
        estimated_total:data.subtotal+data.pickup_savings+data.taxes,
        promo_code_accepted:false,
      })
    }
 
  }

  onInputChange = (evt) => {
    const newCode =  evt.target.value
    
    this.setState({
      promo_code: newCode
    })
    console.log(this.state.promo_code)
  }

  render() {
    const itemDetailsSign=!this.state.showItemDetails?'icon add':'icon minus'
    const promoCodeSign=!this.state.showPromoCode?'icon add':'icon minus'
    let {subtotal,pickup_savings,taxes,zipcode,estimated_total,promo_code_accepted}=this.state;
    const hasSaving=pickup_savings<0;
   // console.log(subtotal);
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
                      <strong>${subtotal}</strong>
                </Grid.Column>
                <Grid.Column textAlign='left' >

                    <Popup
                        trigger={  <a> Pickup savings</a>}
                        content="Picking up your order in the store helps cut costs, and we pass the savings on to you."
                       
                        position='bottom left'
                      />

                
                </Grid.Column>
                <Grid.Column  textAlign='right'  >
                  {hasSaving && 
                      <div style={{color:'red'}}> <strong >{pickup_savings}</strong></div>
                  }
                  {!hasSaving && 
                      <div > <strong >{pickup_savings}</strong></div>
                  }
                </Grid.Column>
                <Grid.Column>
                  <p> 
                    Est. Taxes and Fees<br/>
                  (Based on {zipcode})</p>
                </Grid.Column>
                <Grid.Column  textAlign='right'  >
                      <strong>{taxes}</strong>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2} >
                <Grid.Column>
                    <div className="ui header"> 
                    Est. total</div>
                  </Grid.Column>
                  <Grid.Column  textAlign='right'  >
                  <div className="ui header"> 
                   {estimated_total}</div>
                   {promo_code_accepted&& <div className="ui">(10% discount)</div>}
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
                    <div className="ui sub header">Promo Code </div>
                    <Form onSubmit={this.onFormSubmit}>
                      <Form.Field>

                        <input name='promo_code' onChange={this.onInputChange} value={this.state.promo_code} />
                      </Form.Field>
                      <Button basic color='black' type="submit">Apply</Button>
                    </Form>
                   
                    
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
