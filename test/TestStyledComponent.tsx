import * as React from 'react';
import { Button } from '@material-ui/core';
import { StyledComponentBase } from '../src/components/StyledComponentBase';

export interface ITestProps {
	someProp: string;
}

export interface ITestState {
	someState: string;
}

export interface ITestStyles {
	buttonSize: string;
}

export class StyledComponentTest extends StyledComponentBase<ITestProps, ITestState, ITestStyles> {
	public getContent(classes: ITestStyles): React.ReactNode {
		const { someProp } = this.props;
		const { value } = this.state;
		return (
			<div>
				<Button className={classes.buttonSize} color={'secondary'} onClick={this.handler} style={{zIndex: 12000}}>
					{value.someState || someProp}
				</Button>
			</div>
		);
	}
	private handler = () => {
		const { setContext } = this.state;
		setContext({
			someState: 'New value!'
		});
	}
	protected getStyles() {
		return {
			buttonSize: {
				width: '300px',
				height: '300px'
			}
		};
	}
}