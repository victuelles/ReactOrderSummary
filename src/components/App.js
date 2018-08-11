import React, { Component } from 'react';
import { Segment,Grid,Button,Container,Popup,Form} from 'semantic-ui-react'
import './App.css';
import ItemList from './ItemList'
import { connect } from 'react-redux'

//mapStatetoProps 
const mapState = (state) => ({
  promoCode: state.promoCode.data
})

class App extends Component {
  state = {
    discount:0,
    showItemDetails: false,
    showPromoCode: false,
    promo_code:'',
    promo_code_accepted: false
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData=()=>{
    fetch('/data.json')
    .then(rsp => rsp.json())
    .then(data =>{
      this.setState({...data});
      const estimated_total=Number(data.subtotal)+Number(data.pickup_savings)+Number(data.taxes)
      this.setState({estimated_total});

    })
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
  //  console.log("onFormSubmit",this.props.promoCode)
    const {subtotal,pickup_savings,taxes}=this.state;
    // check for 'DISCOUNT' from redux promoCodes
    if(this.state.promo_code===this.props.promoCode){
      const discount=this.state.estimated_total*0.1
       const estimated_total=+(( Number(subtotal)+Number(pickup_savings)+Number(taxes)-discount).toFixed(2))

     this.setState({
        estimated_total:estimated_total,
        discount:discount,
        promo_code_accepted:true,
        showPromoCode: false
      })

    }else{
      const estimated_total=+((  Number(subtotal)+Number(pickup_savings)+Number(taxes)).toFixed(2))
      this.setState({
        estimated_total:estimated_total,
        promo_code_accepted:false,
      })
    }
  }

  onInputChange = (evt) => {
    const newCode =  evt.target.value
    this.setState({
      promo_code: newCode
    })
   
  }

  render() {
    const itemDetailsSign=!this.state.showItemDetails?'icon add':'icon minus'
    const promoCodeSign=!this.state.showPromoCode?'icon add':'icon minus'
    let {subtotal,pickup_savings,taxes,zipcode,estimated_total,promo_code_accepted}=this.state;
    const hasSaving=pickup_savings<0;
   
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
                  (Based on <strong> {zipcode} </strong>)</p>
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

export default connect(mapState)(App);
