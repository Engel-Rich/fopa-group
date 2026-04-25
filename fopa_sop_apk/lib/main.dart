import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/services/injector.dart';
import 'package:fopa_sop_apk/features/feat_auth/feat_auth.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/controllers/customer_provider.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/controllers/product_provider.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/controllers/order_provider.dart';
import 'package:fopa_sop_apk/features/feat_report/presentations/controllers/report_provider.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/controllers/stock_provider.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/controllers/category_provider.dart';
import 'package:fopa_sop_apk/features/feat_user/presentations/controllers/user_provider.dart';
import 'package:fopa_sop_apk/features/feat_package/presentations/controllers/package_provider.dart';
import 'package:get_it/get_it.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  initInjectorApp(preferences: prefs);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<AuthProvider>(
          create: (context) => GetIt.instance<AuthProvider>(),
        ),
        ChangeNotifierProvider<ProductProvider>(
          create: (context) => GetIt.instance<ProductProvider>(),
        ),
        ChangeNotifierProvider<UserProvider>(
          create: (context) => GetIt.instance<UserProvider>(),
        ),

        /// Orders Provider
        ChangeNotifierProvider<OrderProvider>(
          create: (context) => GetIt.instance<OrderProvider>(),
        ),

        /// Report Provider
        ChangeNotifierProvider<ReportProvider>(
          create: (context) => GetIt.instance<ReportProvider>(),
        ),

        /// Stock Provider
        ChangeNotifierProvider<StockProvider>(
          create: (context) => GetIt.instance<StockProvider>(),
        ),

        /// Category Provider
        ChangeNotifierProvider<CategoryProvider>(
          create: (context) => GetIt.instance<CategoryProvider>(),
        ),

        /// Product Provider
        ChangeNotifierProvider<ProductProvider>.value(
          value: GetIt.instance<ProductProvider>(),
        ),
        // customer provider
        ChangeNotifierProvider<CustomerProvider>(
          create: (context) => GetIt.instance<CustomerProvider>(),
        ),
        // package provider
        ChangeNotifierProvider<PackageProvider>(
          create: (context) => GetIt.instance<PackageProvider>(),
        ),
      ],
      child: UnfocusWrapper(
        child: MaterialApp.router(
          title: 'Fopa Sop',
          theme: AppThemes.lightTheme,
          themeMode: ThemeMode.light,
          darkTheme: AppThemes.darkTheme,
          routerConfig: AppRoutes.router,
          debugShowCheckedModeBanner: false,
        ),
      ),
    );
  }
}

class UnfocusWrapper extends StatelessWidget {
  final Widget child;
  const UnfocusWrapper({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: child,
    );
  }
}
