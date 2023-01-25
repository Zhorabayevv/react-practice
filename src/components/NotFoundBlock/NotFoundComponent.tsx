import React from 'react'
import classes from './NotFoundComponent.module.scss'

export const NotFoundComponent: React.FC = () => {
  return (
    <h1 className={classes.root}>
      <div>🤔</div>
      Страница не найдена
    </h1>
  )
}

export default NotFoundComponent
