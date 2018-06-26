import * as React from 'react';
import { Button, Theme, withTheme, withStyles, WithTheme, WithStyles, StyledComponentProps } from '@material-ui/core';
import { compose } from 'recompose';

const styles = {
  root: {
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'orange'
  }
};

interface IBaseProps {
  classes?: any;
  theme?: any;
}
interface IBaseState<T, S> {
  WrappedComponentType?: React.ComponentClass<T & IInnerProps>;
}

export class BaseComponent<T,S> extends React.Component<T & IBaseProps, S & IBaseState<T, S>> {
  constructor(props: T & IBaseProps, context?: S & IBaseState<T, S>) {
    super(props, context);
    this.state = {
      ...context as any,
      WrappedComponentType: this.getWrappedComponent()
    }
    
  }

  private getWrappedComponent(): React.ComponentClass<StyledComponentProps<never>>  {
    const enhancer = compose<T & IBaseProps & IInnerProps & StyledComponentProps, S & IBaseProps & IInnerState>(
      withTheme(),
      withStyles(styles)
    );
    const result = enhancer(InnerComponent);
    return result;
  }

  public render() : React.ReactNode {
    const { WrappedComponentType } = this.state;
    return <WrappedComponentType {...this.props as any} wrappingComponent={this as any}/>;
  }

  public getContent(classes: any, theme: any): React.ReactNode {
    return null;
  }
}

interface IInnerProps {
  wrappingComponent: BaseComponent<any, any>;
}
interface IInnerState {
  
}
export class InnerComponent<T, S> extends React.Component<T & IBaseProps & IInnerProps & StyledComponentProps, S & IInnerState> {
  constructor(props: T & IInnerProps, context?: S & IInnerState) {
    super(props, context);
  }
  public render() {
    const { wrappingComponent, classes, theme } = this.props;
    return wrappingComponent.getContent.call(wrappingComponent, classes, theme);
  }
}

interface ITestProps {
  name: string;
}
interface ITestState {
  date: Date;
}

export class TestComponent extends BaseComponent<ITestProps, ITestState> {
  constructor(props: ITestProps, context?: any) {
    super(props, context);
    this.state = {
      ...this.state,
      ...context as any,
      date: new Date()
    };
  }
  public getContent(classes: any, theme: any): React.ReactNode {
    const { name } = this.props;
    const { date } = this.state;
    return (
      <div className={classes.root} onClick={this.onClick.bind(this)}>
        <p>The name is {name}.</p>
        <p>The date is {date.toString()}.</p>
        <Button variant={'raised'} color={'primary'}><span className={classes.buttonText}>Hello Button</span></Button>
      </div>
    )
  }
  private onClick() {
    console.dir(this);
    this.setState({
      date: new Date()
    })
  }
}