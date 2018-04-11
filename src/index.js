import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { GameLoop } from 'react-native-game-engine';

const { width : WIDTH, height : HEIGHT } = Dimensions.get('window');
const RADIUS = 25;

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			x : WIDTH / 2 - RADIUS,
			y : HEIGHT / 2 - RADIUS
		};
	}

	shouldComponentUpdate = ({}, { x, y }) => {
		const lastState = this.state;

		return (
			x !== lastState.x ||
			y !== lastState.y
		);
	}

	updateHandler = ({ touches }) => {
		const { x, y } = this.state;
		const move = touches.find(x => x.type === 'move');

		if (move) {
			this.setState({
				x : x + move.delta.pageX,
				y : y + move.delta.pageY,
			});
		}
	}

	render() {
		const { x : left, y : top } = this.state;

		return (
			<GameLoop
				style={ styles.container }
				onUpdate={ this.updateHandler }
			>
				<View
					style={ [
						styles.player, {
							left,
							top,
						}
					] }
				/>
			</GameLoop>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : 'pink'
	},
	player : {
		position        : 'absolute',
		backgroundColor : 'blue',
		width           : RADIUS * 2,
		height          : RADIUS * 2,
		borderRadius    : RADIUS * 2
	}
});
