import {Routes,RouterModule} from '@angular/router';
import {OrderComponent} from '../../main/order/order.component';
import {OrderDetailComponent} from '../../main/order-detail/order-detail.component';
import {OrderAddComponent} from '../../main/order-add/order-add.component';
export const OrderRouter:Routes=[
    {path:'',redirectTo:'index', pathMatch:'full'},
    {path:'index',component:OrderComponent},
    {path:'add', component:OrderAddComponent},
    {path:'detail/:id', component:OrderDetailComponent},
]

