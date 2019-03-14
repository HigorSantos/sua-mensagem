import React from 'react';

function Opcao(props) {

	const opc = props.value;
	const modificador = props.modificador;

	return (
		<span class="nowrap selecao">
			<input key={opc.value}
				type="radio" 
				name={modificador} 
				id={opc.value} 
				value={opc.value} 
				defaultChecked={opc.defaultChecked} 
				onClick={()=> props.onClick()}/>
			<label htmlFor={opc.value} class={opc.value}>{opc.nome}</label>
		</span>
	);
}
export default Opcao;