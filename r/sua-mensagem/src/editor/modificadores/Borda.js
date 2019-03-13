import React, { Component } from 'react';
import './Borda.css';
import Conf from './Conf';

class Borda extends Component {
	constructor(props){
	    super(props);
		this.state = {
			value:'borda',
			opcoes:[
				{	nome:'Com Borda',
					value:'borda_com', 
					defaultChecked:true,
					enabled:true,
				},
				{	nome:'Sem Borda',
					value:'borda_sem', 
					defaultChecked:false,
					enabled:true,
				},
			],
			selecionado:null
    	};
    	this.state.selecionado = this.state.opcoes[0];
    	for(let i=0; i < this.state.opcoes.length; i++){
    		if(this.state.opcoes[i].defaultChecked){
				this.state.selecionado = this.state.opcoes[i];
				break;
    		}
    	}
    }

	render(){
		return(
			<Conf 
				modificador={this.state}
				enabled={this.props.enabled}
			/>
		);
	}
}

export default Borda;
