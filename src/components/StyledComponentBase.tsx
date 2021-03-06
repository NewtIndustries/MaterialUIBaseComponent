import * as React from 'react';
import { StyledComponentProps, withStyles, withTheme } from '@material-ui/core';
import { StyledComponentBaseMixin, IStyledComponentBasePropBase, IStyledComponentBaseStateBase } from '../models/StyledComponentBaseModels';
import { IWrappedStyledComponentProps, IWrappedStyledComponentState } from '../models/WrappedComponentBaseModels';



export class StyledComponentBase<T, S, SS> extends React.Component<T & IStyledComponentBasePropBase<T>, IStyledComponentBaseStateBase<S>, SS> implements React.Component<IStyledComponentBasePropBase<T>, IStyledComponentBaseStateBase<S>> {
	constructor(props: T & IStyledComponentBasePropBase<T>, context: S) {
		super(props);
		this.state = {
			Context: React.createContext<S>(context!),
			value: {
				...context as any,
				getContent: this.getContent,
				wrappingComponent: this
			},
			WrappedClassType: this.getWrappedClassType(),
			setContext: this.setContext
		}
	}
	public render(): React.ReactNode {
		const { classes, theme, ...rest } = this.props as any;
		const { Context, value, WrappedClassType } = this.state;
		const WrappedClassInstance = <WrappedClassType classes={classes} theme={theme} {...rest} />;
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
		return withTheme()(withStyles(this.getStyles() || {})(WrappedStyledComponentBase));
	}
	private setContext = (state: S) => {
		this.setState({
			value: state
		});
	}
}


export class WrappedStyledComponentBase<T> extends StyledComponentBase<StyledComponentBaseMixin & IWrappedStyledComponentProps<T>, IWrappedStyledComponentState, any> implements React.ComponentSpec<any, any> {
	constructor(props: StyledComponentBaseMixin & IWrappedStyledComponentProps<T>, context: IWrappedStyledComponentState) {
		super(props, context);
		this.state = {
			...this.state,
			value: {
				getContent: context.getContent,
				wrappingComponent: context.wrappingComponent
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