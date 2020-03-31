import {RouterModule, Routes} from "@angular/router";
import {DestinationsComponent} from "./components/destinations/destinations.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: DestinationsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DestinationsRoutingModule { }
