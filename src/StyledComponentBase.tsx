/* tslint:disable */
/* eslint:disable */
import * as React from 'react';
import { Button, StyledComponentProps, WithStyles, withStyles, WithTheme, withTheme, Theme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export interface IStyledComponentBasePropBase<T> {
	classes?: ClassNameMap<any>;
	theme?: Theme;
}

export interface IStyledComponentBaseStateBase<S> {
	value: S;
	Context: React.Context<S>;
	WrappedClassType: React.ComponentClass<StyledComponentProps<never>>;
	setContext: (state: S) => void;
}


export type StyledComponentBaseMixin = StyledComponentProps & WithStyles & WithTheme;

export class StyledComponentBase<T, S, SS> extends React.Component<T & IStyledComponentBasePropBase<T>, IStyledComponentBaseStateBase<S>, SS> implements React.Component<IStyledComponentBasePropBase<T>, IStyledComponentBaseStateBase<S>> {
	constructor(props: T & IStyledComponentBasePropBase<T>, context: S) {
		super(props);
		this.state = {
			Context: React.createContext<S>(context!),
			value: context,
			WrappedClassType: this.getWrappedClassType(),
			setContext: this.setContext
		}
	}
	public render(): React.ReactNode | null {
		const { classes, theme, ...rest } = this.props as any;
		const { Context, value, WrappedClassType } = this.state;
		const WrappedClassInstance = <WrappedClassType getContent={this.getContent} wrappingComponent={this} {...rest} />;
		return (
			<Context.Provider value={value}>
				{WrappedClassInstance}
			</Context.Provider>
		)
	}
	protected getStyles(): object {
		return {};
	}
	protected getContent(classes: any): React.ReactNode {
		console.log('In Base Get Content');
		return null;
	}
	private getWrappedClassType():  React.ComponentClass<StyledComponentProps<never>> {
		return withTheme()(withStyles(this.getStyles() || {})(WrappedStyledComponent));
	}
	private setContext = (state: S) => {
		this.setState({
			value: state
		});
	}
}

// export default StyledComponentBase;

export interface IWrappedStyledComponentProps<T> {
	getContent?: (classes: any) => React.ReactNode;
	wrappingComponent: any;
}

export interface IWrappedStyledComponentState {
	getContent?: (classes: any) => React.ReactNode;
	wrappingComponent: any;
}

export class WrappedStyledComponent<T> extends StyledComponentBase<StyledComponentBaseMixin & IWrappedStyledComponentProps<T>, IWrappedStyledComponentState, any> implements React.ComponentSpec<any, any> {
	constructor(props: StyledComponentBaseMixin & IWrappedStyledComponentProps<T>, context: IWrappedStyledComponentState) {
		super(props, context);
		this.state = {
			...this.state,
			value: {
				getContent: props.getContent,
				wrappingComponent: props.wrappingComponent
			}
		};
	}
	public render(): React.ReactNode | null {
		const { value, Context } = this.state;
		const { getContent, wrappingComponent } = value;

		if (getContent && Context) {
			return (
			<Context.Consumer>
				{getContent.bind(wrappingComponent, this.props.classes)}
			</Context.Consumer>
			);
		}
		return null;
	}
}

// interface ITestProps {
// 	someProp: string;
// }

// interface ITestState {
// 	someState: string;
// }

// interface ITestStyles {
// 	buttonSize: string;
// }

// export class StyledComponentTest extends StyledComponentBase<ITestProps, ITestState, ITestStyles> {
// 	public getContent(classes: ITestStyles): React.ReactNode {
// 		const { someProp } = this.props;
// 		const { value } = this.state;
// 		return (
// 			<div>
// 				<Button className={classes.buttonSize} color={'secondary'} onClick={this.handler} style={{zIndex: 12000}}>
// 					{value.someState || someProp}
// 				</Button>
// 			</div>
// 		);
// 	}
// 	private handler = () => {
// 		const { setContext } = this.state;
// 		setContext({
// 			someState: 'New value!'
// 		});
// 	}
// 	protected getStyles() {
// 		return {
// 			buttonSize: {
// 				width: '300px',
// 				height: '300px'
// 			}
// 		};
// 	}
// }