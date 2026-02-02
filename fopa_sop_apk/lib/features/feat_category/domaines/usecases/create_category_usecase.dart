import 'package:fopa_sop_apk/cores/app_state.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/dtos/create_category_dto.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:fopa_sop_apk/features/feat_category/domaines/repositories/category_repository.dart';

class CreateCategoryUseCase {
  final CategoryRepository categoryRepository;

  CreateCategoryUseCase(this.categoryRepository);

  Future<AppState<CategoryResponseModel>> call(CreateCategoryDto dto) async {
    try {
      final response = await categoryRepository.createCategory(dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}

class UpdateCategoryUseCase {
  final CategoryRepository categoryRepository;

  UpdateCategoryUseCase(this.categoryRepository);

  Future<AppState<CategoryResponseModel>> call(
    String id,
    UpdateCategoryDto dto,
  ) async {
    try {
      final response = await categoryRepository.updateCategory(id, dto);
      return AppState.completed(response);
    } catch (e) {
      return AppState.trash(e);
    }
  }
}
