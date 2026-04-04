import 'dart:convert';

import 'package:get_it/get_it.dart';
import 'package:fopa_sop_apk/cores/utils.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_token.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';

import 'package:shared_preferences/shared_preferences.dart';

class LocalStorageService {
  final SharedPreferences preferences;
  LocalStorageService(this.preferences);

  static late LocalStorageService _instance;

  static LocalStorageService instance = _instance;

  static void getInstance() {
    _instance = GetIt.instance<LocalStorageService>();
  }

  Future<bool> storeUserToken(UserToken userToken) async {
    return await preferences.setString(
      userTokenStorageKey,
      jsonEncode(userToken.toJson()),
    );
  }

  UserToken? getUserToken() {
    final userToken = preferences.getString(userTokenStorageKey);
    final token = userToken != null
        ? UserToken.fromJson(jsonDecode(userToken))
        : null;
    Utils.printLog('Token $token');
    return token;
  }

  void logoutUser() {
    preferences.remove(userStorageKey);
    preferences.remove(userTokenStorageKey);
    preferences.remove(productsStorageKey);
    preferences.remove(customersStorageKey);
    preferences.remove(categoriesStorageKey);
  }

  Future<bool> storeFirstOpenTime(bool status) async {
    return await preferences.setBool(firstTimeKey, status);
  }

  bool isfirstOpenTime() {
    return preferences.getBool(firstTimeKey) ?? true;
  }

  Future<bool> storeBiometricStatus(bool status) async {
    return await preferences.setBool(biometricTypeStorageKey, status);
  }

  bool getBiometricStatus() {
    return preferences.getBool(biometricTypeStorageKey) ?? false;
  }

  Future<bool> storeAppTheme(String status) async {
    return await preferences.setString(appThemeStorageKey, status);
  }

  String getAppTheme() {
    return preferences.getString(appThemeStorageKey) ?? "light";
  }

  Future<bool> storeCurrentLocal(String status) async {
    return await preferences.setString(currentLocalStorageKey, status);
  }

  String? getCurrentLocal() {
    return preferences.getString(currentLocalStorageKey);
  }

  Future<bool> storeUser(UserModel user) async {
    return await preferences.setString(
      userStorageKey,
      jsonEncode(user.toJson()),
    );
  }

  UserModel? getUser() {
    final user = preferences.getString(userStorageKey);
    return user != null ? UserModel.fromJson(jsonDecode(user)) : null;
  }

  Future<bool> storeProducts(List<ProductResponseModel> products) async {
    final jsonList = products.map((p) => p.toJson()).toList();
    return await preferences.setString(
      productsStorageKey,
      jsonEncode(jsonList),
    );
  }

  List<ProductResponseModel>? getProducts() {
    final productsJson = preferences.getString(productsStorageKey);
    if (productsJson == null) return null;
    final List<dynamic> jsonList = jsonDecode(productsJson);
    return jsonList
        .map(
          (json) => ProductResponseModel.fromJson(json as Map<String, dynamic>),
        )
        .toList();
  }

  Future<bool> storeCustomers(List<CustomerResponseModel> customers) async {
    final jsonList = customers.map((c) => c.toJson()).toList();
    return await preferences.setString(
      customersStorageKey,
      jsonEncode(jsonList),
    );
  }

  List<CustomerResponseModel>? getCustomers() {
    final customersJson = preferences.getString(customersStorageKey);
    if (customersJson == null) return null;
    final List<dynamic> jsonList = jsonDecode(customersJson);
    return jsonList
        .map(
          (json) =>
              CustomerResponseModel.fromJson(json as Map<String, dynamic>),
        )
        .toList();
  }

  Future<bool> storeCategories(List<CategoryResponseModel> categories) async {
    final jsonList = categories.map((c) => c.toJson()).toList();
    return await preferences.setString(
      categoriesStorageKey,
      jsonEncode(jsonList),
    );
  }

  List<CategoryResponseModel>? getCategories() {
    final categoriesJson = preferences.getString(categoriesStorageKey);
    if (categoriesJson == null) return null;
    final List<dynamic> jsonList = jsonDecode(categoriesJson);
    return jsonList
        .map(
          (json) =>
              CategoryResponseModel.fromJson(json as Map<String, dynamic>),
        )
        .toList();
  }
}

const String appIsLockedKey = "APP_IS_LOCKED_KEY";
const String pauseTimeKey = "PAUSE_TIME_KEY";
const String appThemeStorageKey = "APP_THEME_STORAGE_KEY";
const String userStorageKey = "USER_STORAGE_KEY";
const String biometricTypeStorageKey = "BIOMETRIC_TYPE_STORAGE_KEY";
const String firstTimeKey = "USER_FIRST_TIME_KEY";
const String countriesStorageList = "Countries_Storage_List";
const String orderList = "Order_List";
const String providersStorageKey = "PROVIDERS_STORAGE_KEY";
const String servicesStorageKey = "SERVICES_STORAGE_KEY";
const String serviceProvidersStorageKey = "SERVICE_PROVIDERS_STORAGE_KEY";
const String userTokenStorageKey = "USER_TOKEN_STORAGE_KEY";
const String currentAttachmentStorageKey = "CURRENT_ATTACHMENT_STORAGE_KEY";
const String currentLocalStorageKey = "CURRENT_LOCAL_STORAGE_KEY";
const String productsStorageKey = "PRODUCTS_STORAGE_KEY";
const String customersStorageKey = "CUSTOMERS_STORAGE_KEY";
const String categoriesStorageKey = "CATEGORIES_STORAGE_KEY";
