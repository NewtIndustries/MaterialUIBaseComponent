import * as React from 'react';

export interface IWrappedStyledComponentProps<T> {
}

export interface IWrappedStyledComponentState {
	getContent?: (classes: any) => React.ReactNode;
	wrappingComponent?: any;
}