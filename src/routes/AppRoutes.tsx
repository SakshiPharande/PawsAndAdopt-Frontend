import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import { RouteOptions, routes } from "./RoutesConfig";
import AuthLayout from "@/Layout/AuthLayout";


const getBrowserRouter = (routes: RouteOptions[]) => {
  const routerObjects: RouteObject[] = routes.map((route: RouteOptions) => {

    let element = route.element;

    // Apply AuthLayout only if includeLayout is true
    if (route.includeLayout) {
      element = <AuthLayout>{element}</AuthLayout>;
    }
    
    const routerObject: RouteObject = {
      id: route.key,
      path: route.path,
      element: element,
    };

    if (route.isProtected) {
      // eslint-disable-next-line no-self-assign
      routerObject.element = routerObject.element; // but wrapped
    }

    return routerObject;
  });

  const router = createBrowserRouter(routerObjects);
  return router;
};

const Router = () => {
  const router = getBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;