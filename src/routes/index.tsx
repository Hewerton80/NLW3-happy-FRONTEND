import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage'
import Orphanage from '../pages/Orphanage'
function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path='/'
                    component={Landing}
                    exact
                />
                <Route
                    path='/app'
                    component={OrphanagesMap}
                    exact
                />
                <Route
                    path='/orphanage/create'
                    component={CreateOrphanage}
                    exact
                />
                <Route
                    path='/orphanage/:id'
                    component={Orphanage}
                    exact
                />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;