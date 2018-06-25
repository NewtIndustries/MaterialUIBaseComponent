
import * as React from 'react';
import { StyledComponentBase } from './StyledComponentBase';
import { StyledComponentBaseMixin } from '../models/StyledComponentBaseModels';
import { IWrappedStyledComponentProps, IWrappedStyledComponentState } from '../models/WrappedComponentBaseModels';

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
	public render(): React.ReactNode {
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