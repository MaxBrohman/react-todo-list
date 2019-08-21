import React from 'react';
import { connect } from 'react-redux';
import { IAppHeaderProps } from '../../typings/app-header';
import { IState } from '../../typings/reducer';

import './app-header.sass';

const AppHeader = ({ activeCount, unactiveCount }: IAppHeaderProps): JSX.Element => (
  <div className="app-header d-flex">
    <h1>Todo List</h1>
    <h2>
      { activeCount }
      {' '}
more to do,
      {' '}
      { unactiveCount }
      {' '}
done
    </h2>
  </div>
);

const mapStateToProps = (state: IState): IAppHeaderProps => ({
  activeCount: state.tasksFields.activeTasksCount,
  unactiveCount: state.tasksFields.unactiveTasksCount,
});

export default connect(mapStateToProps)(AppHeader);
