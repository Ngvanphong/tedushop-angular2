import{Routes} from '@angular/router';
import{MainComponent} from './main.component'
export const mainRoutes:Routes=[
  {path:'', component:MainComponent, children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home',loadChildren:'./home/home.module#HomeModule'},
    {path:'user', loadChildren:'./user/user.module#UserModule'},
    {path:'role',loadChildren:'./role/role.module#RoleModule'},
    {path:'function',loadChildren:'./function/function.module#FunctionModule'},
    {path:'product-category',loadChildren:'./product-category/product-category.module#ProductCategoryModule'},
    {path:'product',loadChildren:'./product/product.module#ProductModule'},
    {path:'order',loadChildren:'./order/order.module#OrderModule'},
    {path:'size',loadChildren:'./size/size.module#SizeModule'},
    {path:'tag',loadChildren:'./tag/tag.module#TagModule'},
    {path:'footer',loadChildren:'./footer/footer.module#FooterModule'},
    {path:'post',loadChildren:'./post/post.module#PostModule'},
    {path:'post-category',loadChildren:'./post-category/post-category.module#PostCategoryModule'},
    {path:'post-add',loadChildren:'./post-add/post-add.module#PostAddModule'},
    {path:'post-update',loadChildren:'./post-update/post-update.module#PostUpdateModule'},
    {path:'contact',loadChildren:'./contact/contact.module#ContactModule'},
    {path:'slide',loadChildren:'./slide/slide.module#SlideModule'},
    {path:'systemconfig',loadChildren:'./systemconfig/systemconfig.module#SystemconfigModule'},
  ]}
]
