import 'package:flutter/foundation.dart';
import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/cores/services/local_storage_service.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/dtos/create_category_dto.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/usecases/create_category_usecase.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/usecases/list_categories_usecase.dart';

class CategoryProvider extends ChangeNotifier {
  final CreateCategoryUseCase createCategoryUseCase;
  final UpdateCategoryUseCase updateCategoryUseCase;
  final ListCategoriesUseCase listCategoriesUseCase;
  final LocalStorageService localStorageService;

  List<CategoryResponseModel> localCategories = [];
  AppState<CategoryResponseModel> createCategoryState = AppState();
  AppState<CategoryResponseModel> updateCategoryState = AppState();
  AppState<List<CategoryResponseModel>> listCategoriesState = AppState();

  CategoryProvider({
    required this.createCategoryUseCase,
    required this.updateCategoryUseCase,
    required this.listCategoriesUseCase,
    required this.localStorageService,
  });

  Future<void> createCategory(CreateCategoryDto dto) async {
    createCategoryState = AppState.loading();
    notifyListeners();

    createCategoryState = await createCategoryUseCase.call(dto);
    listCategories();
    notifyListeners();
  }

  Future<void> updateCategory(String id, UpdateCategoryDto dto) async {
    updateCategoryState = AppState.loading();
    notifyListeners();

    updateCategoryState = await updateCategoryUseCase.call(id, dto);
    listCategories();
    notifyListeners();
  }

  Future<void> listCategories() async {
    listCategoriesState = AppState.loading();
    notifyListeners();

    listCategoriesState = await listCategoriesUseCase.call();
    if (listCategoriesState.hasNotNullData &&
        listCategoriesState.data != null) {
      await localStorageService.storeCategories(listCategoriesState.data!);
      localCategories = listCategoriesState.data!;
    }
    notifyListeners();
  }

  Future<void> getSilences() async {
    try {
      // 1. Récupérer depuis le storage local
      final storedCategories = localStorageService.getCategories();
      if (storedCategories != null) {
        localCategories = storedCategories;
        notifyListeners();
      }

      // 2. Faire un appel remote sans filtre
      final state = await listCategoriesUseCase.call();

      if (state.hasNotNullData && state.data != null) {
        // 3. Si succès, mettre à jour le storage et la liste locale
        await localStorageService.storeCategories(state.data!);
        localCategories = state.data!;
        notifyListeners();
      }
    } catch (e) {
      // Erreur silencieuse - on garde les données locales
    }
  }
}
