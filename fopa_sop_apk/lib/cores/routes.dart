import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/widget/images_widget_teste.dart';
import 'package:fopa_sop_apk/features/feat_auth/presentation/screens/login_screen.dart';
import 'package:fopa_sop_apk/features/feat_auth/presentation/screens/splash_screen.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/screens/categorie_screen.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/screens/create_categorie_screen.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/screens/create_customer_screen.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/screens/customers_screen.dart';
import 'package:fopa_sop_apk/features/feat_home/presentation/home.veiw.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/screens/create_product_screen.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/screens/create_order_screen.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/screens/order_summary_print_screen.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/screens/order_historique_screen.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/screens/products_screen.dart';
import 'package:fopa_sop_apk/features/feat_report/presentations/screens/report_screen.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/screens/manage_stock_screen.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:fopa_sop_apk/features/feat_user/presentations/screens/create_user_screen.dart';
import 'package:fopa_sop_apk/features/feat_user/presentations/screens/users_screen.dart';
import 'package:go_router/go_router.dart';

class AppRoutes {
  static const splashRoute = "/";

  static const onboardingRoute = "/onboarding";
  static const loginRoute = "/login";
  static const registerRoute = "/register";
  static const forgotPasswordRoute = "/forgot-password";
  static const resetPasswordRoute = "/reset-password";
  static const otpRoute = "/otp";
  static const verifyEmailRoute = "/verify-email";
  static const homeRoute = "/home";
  static const categorieRoute = "/categorie";
  static const productsRoute = "/products";
  static const customersRoute = "/customers";
  static const usersRoute = "/users";
  static const createProductRoute = "/create-product";
  static const createCustomerRoute = "/create-customer";
  static const createCategorieRoute = "/create-categorie";
  static const createUserRoute = "/create-user";
  static const manageStockRoute = "/manage-stock";
  static const reportRoute = "/report";
  static const createOrderRoute = "/create-order";
  static const orderSummaryRoute = "/order-summary";
  static const orderHistoriqueRoute = "/order-historique";
  static const imagesWidgetTesteRoute = "/images-widget-teste";
  static final GlobalKey<NavigatorState> globalNavigatorKey =
      GlobalKey<NavigatorState>(debugLabel: "root");

  static GoRouter router = GoRouter(
    navigatorKey: globalNavigatorKey,
    initialLocation: splashRoute,

    routes: [
      GoRoute(
        path: splashRoute,
        name: splashRoute,
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: loginRoute,
        name: loginRoute,
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: homeRoute,
        name: homeRoute,
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: categorieRoute,
        name: categorieRoute,
        builder: (context, state) => const CategorieScreen(),
      ),
      GoRoute(
        path: productsRoute,
        name: productsRoute,
        builder: (context, state) => const ProductsScreen(),
      ),
      GoRoute(
        path: customersRoute,
        name: customersRoute,
        builder: (context, state) => const CustomersScreen(),
      ),
      GoRoute(
        path: usersRoute,
        name: usersRoute,
        builder: (context, state) => const UsersScreen(),
      ),
      GoRoute(
        path: createProductRoute,
        name: createProductRoute,
        builder: (context, state) {
          final product = state.extra as ProductResponseModel?;
          return CreateProductScreen(product: product);
        },
      ),
      GoRoute(
        path: createCustomerRoute,
        name: createCustomerRoute,
        builder: (context, state) {
          final customer = state.extra as CustomerResponseModel?;
          return CreateCustomerScreen(customer: customer);
        },
      ),
      GoRoute(
        path: createCategorieRoute,
        name: createCategorieRoute,
        builder: (context, state) {
          final category = state.extra as CategoryResponseModel?;
          return CreateCategorieScreen(category: category);
        },
      ),
      GoRoute(
        path: createUserRoute,
        name: createUserRoute,
        builder: (context, state) {
          final user = state.extra as UserResponseModel?;
          return CreateUserScreen(user: user);
        },
      ),
      GoRoute(
        path: manageStockRoute,
        name: manageStockRoute,
        builder: (context, state) {
          final product = state.extra as dynamic;
          return ManageStockScreen(product: product);
        },
      ),
      GoRoute(
        path: reportRoute,
        name: reportRoute,
        builder: (context, state) => const ReportScreen(),
      ),
      GoRoute(
        path: createOrderRoute,
        name: createOrderRoute,
        builder: (context, state) => const CreateOrderScreen(),
      ),
      GoRoute(
        path: orderSummaryRoute,
        name: orderSummaryRoute,
        builder: (context, state) {
          final order = state.extra as OrderResponseModel;
          return OrderSummaryPrintScreen(order: order);
        },
      ),
      GoRoute(
        path: orderHistoriqueRoute,
        name: orderHistoriqueRoute,
        builder: (context, state) {
          final customer = state.extra != null
              ? state.extra as CustomerResponseModel
              : null;
          return OrderHistoriqueScreen(customer: customer);
        },
      ),
      GoRoute(
        path: imagesWidgetTesteRoute,
        name: imagesWidgetTesteRoute,
        builder: (context, state) {
          final image = state.extra as dynamic;
          return ImagesWidgetTeste(image: image);
        },
      ),
    ],
  );
}
