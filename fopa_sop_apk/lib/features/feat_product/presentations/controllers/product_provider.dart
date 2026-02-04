import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/cores/services/local_storage_service.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/create_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/update_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/usecases/create_product_usecase.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/usecases/list_products_usecase.dart';
import 'package:fopa_sop_apk/features/feat_product/domaines/usecases/update_product_usecase.dart';

class ProductProvider extends ChangeNotifier {
  final CreateProductUseCase createProductUseCase;
  final ListProductsUseCase listProductsUseCase;
  final UpdateProductUseCase updateProductUseCase;
  final LocalStorageService localStorageService;

  List<ProductResponseModel> localProducts = [];
  CategoryResponseModel? selectedCategory;
  AppState<ProductResponseModel> createProductState = AppState();
  AppState<List<ProductResponseModel>> listProductsState = AppState();
  AppState<ProductResponseModel> updateProductState = AppState();

  ProductProvider({
    required this.createProductUseCase,
    required this.listProductsUseCase,
    required this.updateProductUseCase,
    required this.localStorageService,
  });

  void changeSelectedCategory(CategoryResponseModel? category) {
    selectedCategory = category;
    notifyListeners();
  }

  Future<void> createProduct(CreateProductDto dto) async {
    createProductState = AppState.loading();
    notifyListeners();

    createProductState = await createProductUseCase.call(dto);
    notifyListeners();
  }

  Future<void> listProducts({bool? activeOnly}) async {
    listProductsState = AppState.loading();
    notifyListeners();

    listProductsState = await listProductsUseCase.call(activeOnly: activeOnly);
    if (listProductsState.hasNotNullData && listProductsState.data != null) {
      await localStorageService.storeProducts(listProductsState.data!);
      localProducts = listProductsState.data!;
    }
    notifyListeners();
  }

  Future<void> updateProduct(String id, UpdateProductDto dto) async {
    updateProductState = AppState.loading();
    notifyListeners();

    updateProductState = await updateProductUseCase.call(id, dto);
    notifyListeners();
  }

  Future<void> getSilences() async {
    try {
      // 1. Récupérer depuis le storage local
      final storedProducts = localStorageService.getProducts();
      if (storedProducts != null) {
        localProducts = storedProducts;
        notifyListeners();
      }

      // 2. Faire un appel remote sans filtre
      final state = await listProductsUseCase.call(activeOnly: null);

      if (state.hasNotNullData && state.data != null) {
        // 3. Si succès, mettre à jour le storage et la liste locale
        await localStorageService.storeProducts(state.data!);
        localProducts = state.data!;
        notifyListeners();
      }
    } catch (e) {
      // Erreur silencieuse - on garde les données locales
    }
  }
}
