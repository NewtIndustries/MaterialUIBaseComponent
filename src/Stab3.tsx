import * as React from 'react';
import { Button, withStyles, WithStyles, withTheme, WithTheme, StyledComponentProps, Theme } from '@material-ui/core';

interface IComponentBase {
	classes?: any;
	theme?: any;
	children?: any;
	context?: any;
}

export class ComponentBase<T, S> extends React.Component<T & IComponentBase & StyledComponentProps & WithStyles & WithTheme, S> {
	protected WrappedType = withTheme()(withStyles({})(ComponentBase as any) as any);
	constructor(props: T & IComponentBase & StyledComponentProps & WithStyles & WithTheme, context?: any) {
		super(props, context);
	}
	public render() {
		return <this.WrappedType />;
	}
}


export class Wrapped<T extends React.Component<object, any>> implements React.ComponentSpec<StyledComponentProps & WithStyles & WithTheme, any> {
	
	public render(): React.ReactNode {
		return <Button />
	}

}