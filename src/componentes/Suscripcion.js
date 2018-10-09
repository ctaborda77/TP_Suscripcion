import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { CountryDropdown } from 'react-country-region-selector';
import Cards from 'react-credit-cards'
import 'react-credit-cards/lib/styles-compiled.css';
import CreditCardInput from 'react-credit-card-input';
import * as EmailValidator from 'email-validator';
import '../App.css';

class Suscripcion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo: '',
      name: '',
      apellido: '',
      country: '',
      email: '',
      tarjNum: '',
      fExpir: '',
      cvc:'',
    };
  }

  componentDidMount() {
    this.setState({ tipo: this.props.location.state })
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })}

  pagoPremium(){
    if (this.state.tipo === 'premium'){
      return (
      <div><CreditCardInput containerClassName="creditcard" inputClassName="inputCC"
        cardNumberInputProps={{ onChange: e => this.handleChange(e), name: "tarjNum" }}
        cardExpiryInputProps={{ onChange: e => this.handleChange(e), name:"fExpir" }}
        cardCVCInputProps={{ onChange: e => this.handleChange(e), name: "cvc" }}
          />
        <Cards number={this.state.tarjNum}
			name={this.state.name + " " + this.state.apellido}
			expiry={this.state.fExpir}
			cvc={this.state.cvc}
		/>
      </div>  );
    }
  }


verifCampos(){
 let verificacion = false;

 if((this.state.name.length > 0 ) &&
      (this.state.apellido.length > 0) &&
      (this.state.email.length > 0) &&
      (this.state.country.length > 0)){
        verificacion = true;};
  if(this.state.tipo === "premium"){
        if((this.state.tarjNum.length > 0) &&
            (this.state.fExpir.length > 0) &&
            (this.state.cvc.length > 0)){
  }else{
    verificacion = false;
  }
  }
  if (!EmailValidator.validate(this.state.email)){
    verificacion = false;
  }
  return verificacion;
}

 suscribirse() { 
   if (this.verifCampos()){
    this.envioData();
    console.log(this.state);
   }else{
    window.Materialize.toast('Error o faltante de datos en algun campo', 2000);
   }
    
  }
  
  envioData () {
    const url='https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones';

    let datosEnviados = null;
    
    if (this.state.tipo === 'premium') {
        
        datosEnviados = {
            tipo: this.state.tipo,
            name: this.state.name,
            apellido: this.state.apellido,
            pais: this.state.country,
            email: this.state.email,
            tarjNum: this.state.tarjNum,
            fExpir: this.state.fExpir,
            cvc: this.state.cvc,
        };
    } else {
        datosEnviados = {
            tipo: this.state.tipo,
            name: this.state.name,
            apellido: this.state.apellido,
            pais: this.state.country,
            email: this.state.email,
            
        };
    }
    
            console.log(datosEnviados);

        fetch(url,{
            method: 'post',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(datosEnviados)
            
        })
        .then(JSON.stringify(datosEnviados))
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
          window.Materialize.toast('Gracias por suscribirse !!',2000);

        })
        .catch(function (error) {
          console.log('Request failed', error);
          window.Materialize.toast('Request failed', 1000);
        });
    }

  render() {
    const { country } = this.state;

    return (
      <div className="Suscripcion">
        <Row>
          <form>
            <Input id="userName" s={6} label="Nombre" validate name="name" onChange={e => this.handleChange(e)}/>
            <Input s={6} label="Apellido" validate name="apellido"  onChange={e => this.handleChange(e)} />
            <CountryDropdown 
              value={country}
              onChange={(val) => this.selectCountry(val)} className="showBlock" />

            <Input type="email" label="Email" s={6} validate name="email"
            onChange={e => this.handleChange(e)} />
          </form>
        </Row>
        <div className="cvcDiv"> {this.pagoPremium()} </div>
        <Button waves="orange" className="btn btn-warning" textclassname="white" 
        onClick={ () => {this.suscribirse()}} disabled={this.state.boton} >Suscribirse</Button>
      </div>
    );
  }
}

export default Suscripcion;