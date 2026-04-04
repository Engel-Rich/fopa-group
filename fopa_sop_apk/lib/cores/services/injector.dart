import 'package:dio/dio.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/sing_out_usecase.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fopa_sop_apk/cores/services/api_services.dart';
import 'package:fopa_sop_apk/cores/services/local_storage_service.dart';

// Auth imports
import 'package:fopa_sop_apk/features/feat_auth/datas/services/auth_service.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/repositories_implement/auth_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/repositories/auth_repository.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/login_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/register_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/refresh_token_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/get_current_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/domaines/usecases/logout_usecase.dart';
import 'package:fopa_sop_apk/features/feat_auth/presentation/controllers/auth_provider.dart';

// User imports
import 'package:fopa_sop_apk/features/feat_user/datas/services/user_service.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/repositories_implement/user_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/repositories/user_repository.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/create_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/list_users_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/update_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/usecases/delete_user_usecase.dart';
import 'package:fopa_sop_apk/features/feat_user/presentations/controllers/user_provider.dart';

// Category imports
import 'package:fopa_sop_apk/features/feat_category/datas/services/category_service.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/repositories_implement/category_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/repositories/category_repository.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/usecases/create_category_usecase.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/usecases/list_categories_usecase.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/controllers/category_provider.dart';

// Product imports
import 'package:fopa_sop_apk/features/feat_product/datas/services/product_service.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/repositories_implement/product_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/repositories/product_repository.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/usecases/create_product_usecase.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/usecases/list_products_usecase.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/usecases/list_products_with_config_usecase.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/usecases/update_product_usecase.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/controllers/product_provider.dart';

// Customer imports
import 'package:fopa_sop_apk/features/feat_customer/datas/services/customer_service.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/repositories_implement/customer_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/repositories/customer_repository.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/usecases/create_customer_usecase.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/usecases/list_customers_usecase.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/usecases/update_customer_usecase.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/controllers/customer_provider.dart';

// Order imports
import 'package:fopa_sop_apk/features/feat_order/datas/services/order_service.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/repositories_implement/order_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/repositories/order_repository.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/create_order_usecase.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/get_order_details_usecase.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/add_payment_usecase.dart';
import 'package:fopa_sop_apk/features/feat_order/domaines/usecases/list_orders_usecase.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/controllers/order_provider.dart';

// Stock imports
import 'package:fopa_sop_apk/features/feat_stock/datas/services/stock_service.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/repositories_implement/stock_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/repositories/stock_repository.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/usecases/create_stock_entry_usecase.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/usecases/create_stock_exit_usecase.dart';
import 'package:fopa_sop_apk/features/feat_stock/domaines/usecases/list_stock_movements_usecase.dart';
import 'package:fopa_sop_apk/features/feat_stock/presentations/controllers/stock_provider.dart';

// Report imports
import 'package:fopa_sop_apk/features/feat_report/datas/services/report_service.dart';
import 'package:fopa_sop_apk/features/feat_report/datas/repositories_implement/report_repository_impl.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/repositories/report_repository.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/usecases/get_daily_sales_usecase.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/usecases/get_monthly_sales_usecase.dart';
import 'package:fopa_sop_apk/features/feat_report/domaines/usecases/get_yearly_sales_usecase.dart';
import 'package:fopa_sop_apk/features/feat_report/presentations/controllers/report_provider.dart';

void initInjectorApp({required SharedPreferences preferences}) {
  final getItInstance = GetIt.instance;

  // Core services
  getItInstance.registerLazySingleton<Dio>(() => API().dio);
  getItInstance.registerLazySingleton<LocalStorageService>(
    () => LocalStorageService(preferences),
  );

  // ========== AUTH ==========
  getItInstance.registerLazySingleton<AuthService>(
    () => AuthService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(getItInstance<AuthService>()),
  );
  getItInstance.registerLazySingleton<LoginUseCase>(
    () => LoginUseCase(getItInstance<AuthRepository>()),
  );
  getItInstance.registerLazySingleton<RegisterUserUseCase>(
    () => RegisterUserUseCase(getItInstance<AuthRepository>()),
  );
  getItInstance.registerLazySingleton<RefreshTokenUseCase>(
    () => RefreshTokenUseCase(getItInstance<AuthRepository>()),
  );
  getItInstance.registerLazySingleton<GetCurrentUserUseCase>(
    () => GetCurrentUserUseCase(getItInstance<AuthRepository>()),
  );
  getItInstance.registerLazySingleton<LogoutUseCase>(
    () => LogoutUseCase(getItInstance<AuthRepository>()),
  );
  getItInstance.registerLazySingleton<AuthProvider>(
    () => AuthProvider(
      loginUseCase: getItInstance<LoginUseCase>(),
      registerUserUseCase: getItInstance<RegisterUserUseCase>(),
      refreshTokenUseCase: getItInstance<RefreshTokenUseCase>(),
      getCurrentUserUseCase: getItInstance<GetCurrentUserUseCase>(),
      logoutUseCase: getItInstance<LogoutUseCase>(),
      localStorageService: getItInstance<LocalStorageService>(),
    ),
  );

  // ========== USER ==========
  getItInstance.registerLazySingleton<UserService>(
    () => UserService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(getItInstance<UserService>()),
  );
  getItInstance.registerLazySingleton<CreateUserUseCase>(
    () => CreateUserUseCase(getItInstance<UserRepository>()),
  );
  getItInstance.registerLazySingleton<ListUsersUseCase>(
    () => ListUsersUseCase(getItInstance<UserRepository>()),
  );
  getItInstance.registerLazySingleton<UpdateUserUseCase>(
    () => UpdateUserUseCase(getItInstance<UserRepository>()),
  );
  getItInstance.registerLazySingleton<DeleteUserUseCase>(
    () => DeleteUserUseCase(getItInstance<UserRepository>()),
  );

  // getItInstance.registerLazySingleton<SingOutUsecase>(
  //   () => SingOutUsecase(getItInstance<UserRepository>()),
  // );
  getItInstance.registerLazySingleton<UserProvider>(
    () => UserProvider(
      createUserUseCase: getItInstance<CreateUserUseCase>(),
      listUsersUseCase: getItInstance<ListUsersUseCase>(),
      updateUserUseCase: getItInstance<UpdateUserUseCase>(),
      deleteUserUseCase: getItInstance<DeleteUserUseCase>(),
      // singOutUsecase: getItInstance<SingOutUsecase>(),
    ),
  );

  // ========== CATEGORY ==========
  getItInstance.registerLazySingleton<CategoryService>(
    () => CategoryService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<CategoryRepository>(
    () => CategoryRepositoryImpl(getItInstance<CategoryService>()),
  );
  getItInstance.registerLazySingleton<CreateCategoryUseCase>(
    () => CreateCategoryUseCase(getItInstance<CategoryRepository>()),
  );
  getItInstance.registerLazySingleton<ListCategoriesUseCase>(
    () => ListCategoriesUseCase(getItInstance<CategoryRepository>()),
  );
  getItInstance.registerLazySingleton<UpdateCategoryUseCase>(
    () => UpdateCategoryUseCase(getItInstance<CategoryRepository>()),
  );
  getItInstance.registerLazySingleton<CategoryProvider>(
    () => CategoryProvider(
      createCategoryUseCase: getItInstance<CreateCategoryUseCase>(),
      listCategoriesUseCase: getItInstance<ListCategoriesUseCase>(),
      updateCategoryUseCase: getItInstance<UpdateCategoryUseCase>(),
      localStorageService: getItInstance<LocalStorageService>(),
    ),
  );

  // ========== PRODUCT ==========
  getItInstance.registerLazySingleton<ProductService>(
    () => ProductService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<ProductRepository>(
    () => ProductRepositoryImpl(getItInstance<ProductService>()),
  );
  getItInstance.registerLazySingleton<CreateProductUseCase>(
    () => CreateProductUseCase(getItInstance<ProductRepository>()),
  );
  getItInstance.registerLazySingleton<ListProductsUseCase>(
    () => ListProductsUseCase(getItInstance<ProductRepository>()),
  );
  getItInstance.registerLazySingleton<ListProductsWithConfigUseCase>(
    () => ListProductsWithConfigUseCase(getItInstance<ProductRepository>()),
  );
  getItInstance.registerLazySingleton<UpdateProductUseCase>(
    () => UpdateProductUseCase(getItInstance<ProductRepository>()),
  );
  getItInstance.registerLazySingleton<ProductProvider>(
    () => ProductProvider(
      createProductUseCase: getItInstance<CreateProductUseCase>(),
      listProductsUseCase: getItInstance<ListProductsUseCase>(),
      listProductsWithConfigUseCase:
          getItInstance<ListProductsWithConfigUseCase>(),
      updateProductUseCase: getItInstance<UpdateProductUseCase>(),
      localStorageService: getItInstance<LocalStorageService>(),
    ),
  );

  // ========== CUSTOMER ==========
  getItInstance.registerLazySingleton<CustomerService>(
    () => CustomerService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<CustomerRepository>(
    () => CustomerRepositoryImpl(getItInstance<CustomerService>()),
  );
  getItInstance.registerLazySingleton<CreateCustomerUseCase>(
    () => CreateCustomerUseCase(getItInstance<CustomerRepository>()),
  );
  getItInstance.registerLazySingleton<ListCustomersUseCase>(
    () => ListCustomersUseCase(getItInstance<CustomerRepository>()),
  );
  getItInstance.registerLazySingleton<UpdateCustomerUseCase>(
    () => UpdateCustomerUseCase(getItInstance<CustomerRepository>()),
  );
  getItInstance.registerLazySingleton<CustomerProvider>(
    () => CustomerProvider(
      createCustomerUseCase: getItInstance<CreateCustomerUseCase>(),
      listCustomersUseCase: getItInstance<ListCustomersUseCase>(),
      updateCustomerUseCase: getItInstance<UpdateCustomerUseCase>(),
      localStorageService: getItInstance<LocalStorageService>(),
    ),
  );

  // ========== ORDER ==========
  getItInstance.registerLazySingleton<OrderService>(
    () => OrderService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<OrderRepository>(
    () => OrderRepositoryImpl(getItInstance<OrderService>()),
  );
  getItInstance.registerLazySingleton<CreateOrderUseCase>(
    () => CreateOrderUseCase(getItInstance<OrderRepository>()),
  );
  getItInstance.registerLazySingleton<GetOrderDetailsUseCase>(
    () => GetOrderDetailsUseCase(getItInstance<OrderRepository>()),
  );
  getItInstance.registerLazySingleton<AddPaymentUseCase>(
    () => AddPaymentUseCase(getItInstance<OrderRepository>()),
  );
  getItInstance.registerLazySingleton<ListOrdersUseCase>(
    () => ListOrdersUseCase(getItInstance<OrderRepository>()),
  );
  getItInstance.registerLazySingleton<OrderProvider>(
    () => OrderProvider(
      createOrderUseCase: getItInstance<CreateOrderUseCase>(),
      getOrderDetailsUseCase: getItInstance<GetOrderDetailsUseCase>(),
      addPaymentUseCase: getItInstance<AddPaymentUseCase>(),
      listOrdersUseCase: getItInstance<ListOrdersUseCase>(),
    ),
  );

  // ========== STOCK ==========
  getItInstance.registerLazySingleton<StockService>(
    () => StockService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<StockRepository>(
    () => StockRepositoryImpl(getItInstance<StockService>()),
  );
  getItInstance.registerLazySingleton<CreateStockEntryUseCase>(
    () => CreateStockEntryUseCase(getItInstance<StockRepository>()),
  );
  getItInstance.registerLazySingleton<CreateStockExitUseCase>(
    () => CreateStockExitUseCase(getItInstance<StockRepository>()),
  );
  getItInstance.registerLazySingleton<ListStockMovementsUseCase>(
    () => ListStockMovementsUseCase(getItInstance<StockRepository>()),
  );
  getItInstance.registerLazySingleton<StockProvider>(
    () => StockProvider(
      createStockEntryUseCase: getItInstance<CreateStockEntryUseCase>(),
      createStockExitUseCase: getItInstance<CreateStockExitUseCase>(),
      listStockMovementsUseCase: getItInstance<ListStockMovementsUseCase>(),
    ),
  );

  // ========== REPORT ==========
  getItInstance.registerLazySingleton<ReportService>(
    () => ReportService(getItInstance<Dio>()),
  );
  getItInstance.registerLazySingleton<ReportRepository>(
    () => ReportRepositoryImpl(getItInstance<ReportService>()),
  );
  getItInstance.registerLazySingleton<GetDailySalesUseCase>(
    () => GetDailySalesUseCase(getItInstance<ReportRepository>()),
  );
  getItInstance.registerLazySingleton<GetMonthlySalesUseCase>(
    () => GetMonthlySalesUseCase(getItInstance<ReportRepository>()),
  );
  getItInstance.registerLazySingleton<GetYearlySalesUseCase>(
    () => GetYearlySalesUseCase(getItInstance<ReportRepository>()),
  );
  getItInstance.registerLazySingleton<ReportProvider>(
    () => ReportProvider(
      getDailySalesUseCase: getItInstance<GetDailySalesUseCase>(),
      getMonthlySalesUseCase: getItInstance<GetMonthlySalesUseCase>(),
      getYearlySalesUseCase: getItInstance<GetYearlySalesUseCase>(),
    ),
  );
}
