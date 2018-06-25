import { StyledComponentProps, Theme, WithStyles, WithTheme } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { IWrappedStyledComponentState } from './WrappedComponentBaseModels';

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
